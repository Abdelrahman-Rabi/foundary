"use client"

import { ArrowRight, GitBranch, MoveRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  IssuePriorityBadge,
  IssueStatusBadge,
  IssueTypeBadge,
} from "@/features/issues/components/issue-badges"
import {
  formatDate,
  getNextStatus,
  getOwner,
  getRoadmapItem,
  getVenture,
  isIssueOverdue,
} from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useUiStore } from "@/stores/ui-store"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type IssueRowProps = {
  issue: Issue
  ventures: Venture[]
  users: User[]
  roadmapItems: RoadmapItem[]
}

export function IssueRow({
  issue,
  ventures,
  users,
  roadmapItems,
}: IssueRowProps) {
  const openDrawer = useUiStore((state) => state.openDrawer)
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus)
  const venture = getVenture(ventures, issue.ventureId)
  const owner = getOwner(users, issue.ownerId)
  const roadmap = getRoadmapItem(roadmapItems, issue.roadmapId)
  const overdue = isIssueOverdue(issue)
  const nextStatus = getNextStatus(issue.status)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openDrawer({ type: "issue", id: issue.id })}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          openDrawer({ type: "issue", id: issue.id })
        }
      }}
      className="group grid cursor-pointer grid-cols-[minmax(280px,1fr)_110px_100px_110px_100px_130px_110px] items-center gap-3 border-b border-border/50 px-3 py-2 text-sm transition-colors hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: venture?.color ?? "var(--muted)" }}
          />
          <span className="truncate font-medium text-foreground">{issue.title}</span>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
          {roadmap ? (
            <>
              <GitBranch className="size-3" strokeWidth={1.8} />
              <span className="truncate">{roadmap.title}</span>
            </>
          ) : (
            <span>No roadmap link</span>
          )}
        </div>
      </div>

      <IssueStatusBadge status={issue.status} />
      <IssuePriorityBadge priority={issue.priority} />
      <IssueTypeBadge type={issue.type} />
      <span className="truncate text-xs text-muted-foreground">
        {owner?.name ?? "Unassigned"}
      </span>
      <span className={overdue ? "text-xs text-warning" : "text-xs text-muted-foreground"}>
        {formatDate(issue.dueDate)}
      </span>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs text-muted-foreground">
          {venture?.name ?? "Unknown"}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation()
            updateIssueStatus(issue.id, nextStatus)
          }}
          aria-label="Move issue forward"
        >
          {nextStatus === issue.status ? (
            <ArrowRight className="size-3" strokeWidth={1.8} />
          ) : (
            <MoveRight className="size-3" strokeWidth={1.8} />
          )}
        </Button>
      </div>
    </div>
  )
}
