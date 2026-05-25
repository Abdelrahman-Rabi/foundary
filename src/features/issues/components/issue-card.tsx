"use client"

import { CSS } from "@dnd-kit/utilities"
import { useDraggable } from "@dnd-kit/core"
import { GitBranch } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  IssuePriorityBadge,
  IssueRiskBadge,
  IssueTypeBadge,
} from "@/features/issues/components/issue-badges"
import {
  getOwner,
  getRoadmapItem,
  getVenture,
  isIssueOverdue,
} from "@/features/issues/utils/issue-utils"
import { cn } from "@/lib/utils"
import { useUiStore } from "@/stores/ui-store"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type IssueCardProps = {
  issue: Issue
  ventures: Venture[]
  users: User[]
  roadmapItems: RoadmapItem[]
}

export function IssueCard({
  issue,
  ventures,
  users,
  roadmapItems,
}: IssueCardProps) {
  const openDrawer = useUiStore((state) => state.openDrawer)
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: issue.id,
      data: { status: issue.status },
    })
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  const venture = getVenture(ventures, issue.ventureId)
  const owner = getOwner(users, issue.ownerId)
  const roadmap = getRoadmapItem(roadmapItems, issue.roadmapId)
  const overdue = isIssueOverdue(issue)

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "border-border/60 bg-card/60 py-0 shadow-none transition-colors hover:bg-muted/25",
        isDragging && "z-10 opacity-80 ring-1 ring-ring/50"
      )}
      {...attributes}
      {...listeners}
      onClick={() => openDrawer({ type: "issue", id: issue.id })}
    >
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
            {issue.title}
          </h3>
          <span
            className="mt-1 size-2 shrink-0 rounded-full"
            style={{ backgroundColor: venture?.color ?? "var(--muted)" }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <IssuePriorityBadge priority={issue.priority} />
          <IssueTypeBadge type={issue.type} />
          {issue.riskLevel !== "low" || overdue ? (
            <IssueRiskBadge risk={overdue ? "medium" : issue.riskLevel} />
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="truncate">{owner?.name ?? "Unassigned"}</span>
          <span>{venture?.name ?? "Unknown"}</span>
        </div>

        {roadmap ? (
          <div className="mt-3 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
            <GitBranch className="size-3 shrink-0" strokeWidth={1.8} />
            <span className="truncate">{roadmap.title}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
