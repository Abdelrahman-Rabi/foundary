"use client"

import { GitBranch } from "lucide-react"

import {
  IssuePriorityBadge,
  IssueRiskBadge,
  IssueStatusBadge,
  IssueTypeBadge,
} from "@/features/issues/components/issue-badges"
import {
  formatDate,
  getOwner,
  getRoadmapItem,
  getVenture,
  isIssueOverdue,
} from "@/features/issues/utils/issue-utils"
import { aiInsights } from "@/data/ai-insights"
import { roadmapItems } from "@/data/roadmap"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { useIssueStore } from "@/stores/issue-store"

type IssueDrawerContentProps = {
  issueId: string
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value}</p>
    </div>
  )
}

export function IssueDrawerContent({ issueId }: IssueDrawerContentProps) {
  const issue = useIssueStore((state) =>
    state.issues.find((item) => item.id === issueId)
  )

  if (!issue) {
    return (
      <div className="p-5 text-sm text-muted-foreground">
        Issue context is no longer available.
      </div>
    )
  }

  const venture = getVenture(ventures, issue.ventureId)
  const owner = getOwner(users, issue.ownerId)
  const roadmap = getRoadmapItem(roadmapItems, issue.roadmapId)
  const issueInsights = aiInsights.filter((insight) =>
    issue.aiInsightIds.includes(insight.id)
  )
  const overdue = isIssueOverdue(issue)
  const missingCriteria =
    !issue.acceptanceCriteria || issue.acceptanceCriteria.length === 0

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-popover/95 px-5 py-4 backdrop-blur-sm">
        <div className="pr-8">
          <p className="text-xs text-muted-foreground">
            {venture?.name ?? "Unknown venture"} / {issue.id}
          </p>
          <h2 className="mt-2 text-base font-semibold leading-6 text-foreground">
            {issue.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <IssueStatusBadge status={issue.status} />
            <IssuePriorityBadge priority={issue.priority} />
            <IssueTypeBadge type={issue.type} />
            <IssueRiskBadge risk={overdue ? "medium" : issue.riskLevel} />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">Description</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {issue.description}
          </p>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">Metadata</h3>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <MetadataItem label="Owner" value={owner?.name ?? "Unassigned"} />
            <MetadataItem label="Due date" value={formatDate(issue.dueDate)} />
            <MetadataItem label="Effort" value={issue.effort} />
            <MetadataItem label="Confidence" value={`${issue.confidence}%`} />
            <MetadataItem label="Blocked" value={issue.blocked ? "Yes" : "No"} />
            <MetadataItem label="Updated" value={formatDate(issue.updatedAt.slice(0, 10))} />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {issue.tags.length > 0 ? (
              issue.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">No tags</span>
            )}
          </div>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Acceptance criteria
          </h3>
          {missingCriteria ? (
            <p className="mt-3 text-sm leading-6 text-warning">
              Missing measurable acceptance criteria.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {issue.acceptanceCriteria?.map((criterion) => (
                <li key={criterion} className="flex gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-muted-foreground" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">Linked roadmap</h3>
          {roadmap ? (
            <div className="mt-3 rounded-lg border border-border/60 bg-muted/20 p-3">
              <div className="flex items-start gap-2">
                <GitBranch className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {roadmap.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {roadmap.goal}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Progress {roadmap.progress}% / Confidence {roadmap.confidence}%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No linked roadmap initiative.
            </p>
          )}
        </section>

        <section className="px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">AI issue context</h3>
          <div className="mt-3 space-y-3">
            {issueInsights.map((insight) => (
              <div
                key={insight.id}
                className="rounded-lg border border-border/60 bg-muted/20 p-3"
              >
                <p className="text-sm font-medium text-foreground">
                  {insight.title}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {insight.message}
                </p>
                {insight.suggestedAction ? (
                  <p className="mt-2 text-xs leading-5 text-foreground">
                    {insight.suggestedAction}
                  </p>
                ) : null}
              </div>
            ))}
            {missingCriteria ? (
              <div className="rounded-lg border border-warning/40 bg-muted/20 p-3">
                <p className="text-sm font-medium text-foreground">
                  Criteria clarity needed
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  This issue lacks measurable completion conditions, which can
                  weaken delivery confidence.
                </p>
                <p className="mt-2 text-xs leading-5 text-foreground">
                  Define validation conditions before expanding scope.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
