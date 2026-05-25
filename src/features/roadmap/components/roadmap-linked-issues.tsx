"use client"

import { AlertCircle } from "lucide-react"

import {
  IssuePriorityBadge,
  IssueStatusBadge,
} from "@/features/issues/components/issue-badges"
import {
  formatRoadmapDate,
  getOwner,
  issueStatusLabels,
} from "@/features/roadmap/utils/roadmap-utils"
import { users } from "@/data/users"
import type { Issue } from "@/types/issue"

type RoadmapLinkedIssuesProps = {
  issues: Issue[]
  onOpenIssue: (issueId: string) => void
}

export function RoadmapLinkedIssues({
  issues,
  onOpenIssue,
}: RoadmapLinkedIssuesProps) {
  if (issues.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
        No linked execution work yet.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {issues.map((issue) => (
        <div
          key={issue.id}
          role="button"
          tabIndex={0}
          className="cursor-pointer rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          onClick={() => onOpenIssue(issue.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              onOpenIssue(issue.id)
            }
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{issue.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {getOwner(users, issue.ownerId)?.name ?? "Unassigned"} /{" "}
                {formatRoadmapDate(issue.dueDate)}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
              <IssueStatusBadge status={issue.status} />
              <IssuePriorityBadge priority={issue.priority} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{issueStatusLabels[issue.status]}</span>
            {issue.blocked ? (
              <span className="flex items-center gap-1 text-warning">
                <AlertCircle className="size-3.5" />
                Blocked
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
