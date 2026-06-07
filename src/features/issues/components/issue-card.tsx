"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AlertTriangle, GitBranch, Sparkles } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  IssuePriorityBadge,
  IssueRiskBadge,
  IssueStatusBadge,
  IssueTypeBadge,
} from "@/features/issues/components/issue-badges"
import {
  getOwner,
  getRoadmapItem,
  getVenture,
  hasDecliningRoadmap,
  hasMissingCriteria,
  isIssueOverdue,
  issueStatuses,
  statusLabels,
} from "@/features/issues/utils/issue-utils"
import { cn } from "@/lib/utils"
import { useIssueStore } from "@/stores/issue-store"
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
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: issue.id,
      data: { status: issue.status },
    })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "group border-border/60 bg-card/60 py-0 shadow-none transition-all duration-150 hover:border-border hover:bg-muted/25 motion-reduce:transition-none",
        isDragging && "z-10 opacity-40 ring-1 ring-ring/50"
      )}
      {...attributes}
      {...listeners}
      onClick={() => openDrawer({ type: "issue", id: issue.id })}
    >
      <IssueCardContent
        issue={issue}
        ventures={ventures}
        users={users}
        roadmapItems={roadmapItems}
        onUpdateStatus={(status) => updateIssueStatus(issue.id, status)}
      />
    </Card>
  )
}

export function IssueCardPreview(props: IssueCardProps) {
  return (
    <Card className="w-80 border-border bg-card/95 py-0 shadow-lg ring-1 ring-ring/30">
      <IssueCardContent {...props} />
    </Card>
  )
}

function IssueCardContent({
  issue,
  ventures,
  users,
  roadmapItems,
  onUpdateStatus,
}: IssueCardProps & {
  onUpdateStatus?: (status: Issue["status"]) => void
}) {
  const venture = getVenture(ventures, issue.ventureId)
  const owner = getOwner(users, issue.ownerId)
  const roadmap = getRoadmapItem(roadmapItems, issue.roadmapId)
  const overdue = isIssueOverdue(issue)
  const missingCriteria = hasMissingCriteria(issue)
  const decliningRoadmap = hasDecliningRoadmap(issue, roadmapItems)

  return (
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
        <IssueStatusBadge status={issue.status} />
        <IssuePriorityBadge priority={issue.priority} />
        <IssueTypeBadge type={issue.type} />
        {issue.riskLevel !== "low" || overdue ? (
          <IssueRiskBadge risk={overdue ? "medium" : issue.riskLevel} />
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="truncate">{owner?.name ?? "Unassigned"}</span>
        <span className="truncate">{venture?.name ?? "Unknown"}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-2.5">
        {roadmap ? (
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <GitBranch className="size-3 shrink-0" strokeWidth={1.8} />
            <span className="truncate max-w-[100px]">{roadmap.title}</span>
          </div>
        ) : (
          <span className="text-[10px] text-muted-foreground">No bet link</span>
        )}
        <div className="flex shrink-0 items-center gap-1">
          {issue.evidenceRole && (
            <Badge variant="outline" className={cn("text-[8px] h-3.5 py-0 px-1 uppercase font-mono tracking-wider", 
              issue.evidenceRole === "prove" ? "bg-success/5 text-success border-success/20" :
              issue.evidenceRole === "disprove" ? "bg-destructive/5 text-destructive border-destructive/20" :
              issue.evidenceRole === "unblock" ? "bg-info/5 text-info border-info/20" :
              issue.evidenceRole === "de-risk" ? "bg-warning/5 text-warning border-warning/20" :
              "bg-muted-foreground/5 text-muted-foreground border-muted-foreground/20"
            )}>
              {issue.evidenceRole === "prove" ? "proving" :
               issue.evidenceRole === "disprove" ? "challenging" :
               issue.evidenceRole === "unblock" ? "unblocking" :
               issue.evidenceRole === "de-risk" ? "de-risking" :
               "cost"}
            </Badge>
          )}
          {issue.confidenceImpact && issue.confidenceImpact !== "neutral" && (
            <span className={cn(
              "font-bold text-[9px]",
              issue.confidenceImpact === "increase" ? "text-success" : "text-destructive"
            )}>
              {issue.confidenceImpact === "increase" ? "▲" : "▼"}
            </span>
          )}
          {issue.evidenceRole === "capacity-cost" && (
            <span title="Capacity contention risk">
              <AlertTriangle className="size-3 text-warning shrink-0" strokeWidth={2} />
            </span>
          )}
          {issue.blocked || overdue ? (
            <AlertTriangle className="size-3.5 text-warning" strokeWidth={1.8} />
          ) : null}
          {missingCriteria || decliningRoadmap ? (
            <Sparkles className="size-3.5 text-info" strokeWidth={1.8} />
          ) : null}
        </div>
      </div>

      {onUpdateStatus ? (
        <select
          value={issue.status}
          className="mt-3 h-7 w-full rounded-md border border-border/50 bg-background/50 px-2 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          aria-label="Update issue status"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
          onChange={(event) => {
            event.stopPropagation()
            onUpdateStatus(event.target.value as Issue["status"])
          }}
        >
          {issueStatuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      ) : null}
    </CardContent>
  )
}
