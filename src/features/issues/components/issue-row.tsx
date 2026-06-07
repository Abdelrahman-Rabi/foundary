"use client"

import { AlertTriangle, ArrowRight, GitBranch, MoveRight, Sparkles, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  hasDecliningRoadmap,
  hasMissingCriteria,
  isIssueOverdue,
  issueStatuses,
  statusLabels,
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
  const missingCriteria = hasMissingCriteria(issue)
  const decliningRoadmap = hasDecliningRoadmap(issue, roadmapItems)
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
      className="group grid cursor-pointer grid-cols-[minmax(280px,1fr)_110px_100px_110px_100px_130px_110px] items-center gap-3 border-b border-border/50 px-3 py-2 text-sm transition-colors duration-150 hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none"
    >
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: venture?.color ?? "var(--muted)" }}
          />
          <span className="truncate font-medium text-foreground">{issue.title}</span>
        </div>
        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {roadmap ? (
            <>
              <GitBranch className="size-3" strokeWidth={1.8} />
              <span className="truncate max-w-[150px]">{roadmap.title}</span>
            </>
          ) : (
            <span>No roadmap link</span>
          )}
          {issue.evidenceRole && (
            <>
              <span className="text-muted-foreground/40">•</span>
              <Badge variant="outline" className={cn("text-[9px] h-4 py-0 px-1 uppercase font-mono tracking-wider", 
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
                 "capacity cost"}
              </Badge>
            </>
          )}
          {issue.confidenceImpact && issue.confidenceImpact !== "neutral" && (
            <span className={cn(
              "font-bold text-[10px]",
              issue.confidenceImpact === "increase" ? "text-success" : "text-destructive"
            )} title={`Confidence impact: ${issue.confidenceImpact}`}>
              {issue.confidenceImpact === "increase" ? "▲" : "▼"}
            </span>
          )}
          {issue.evidenceRole === "capacity-cost" && (
            <span title="Capacity contention risk">
              <AlertTriangle className="size-3 text-warning shrink-0" strokeWidth={2} />
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IssueStatusBadge status={issue.status} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              onClick={(event) => event.stopPropagation()}
              aria-label="Update issue status"
            >
              <ChevronDown className="size-3" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36" onClick={(event) => event.stopPropagation()}>
            <DropdownMenuRadioGroup
              value={issue.status}
              onValueChange={(value) => updateIssueStatus(issue.id, value as typeof issue.status)}
            >
              {issueStatuses.map((status) => (
                <DropdownMenuRadioItem key={status} value={status}>
                  {statusLabels[status]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <div className="flex items-center gap-1">
          {issue.blocked || overdue ? (
            <AlertTriangle className="size-3.5 text-warning" strokeWidth={1.8} />
          ) : null}
          {missingCriteria || decliningRoadmap ? (
            <Sparkles className="size-3.5 text-info" strokeWidth={1.8} />
          ) : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
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
