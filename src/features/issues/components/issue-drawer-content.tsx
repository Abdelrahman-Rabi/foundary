"use client"

import { GitBranch } from "lucide-react"

import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import {
  getInsightSignals,
  getIssueSignals,
  getIssueSummary,
} from "@/features/assistant/utils/assistant-analysis"
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
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { getSyncedRoadmapMetrics } from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"

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
  const issues = useIssueStore((state) => state.issues)
  const issue = useIssueStore((state) =>
    state.issues.find((item) => item.id === issueId)
  )
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)

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
  const syncedRoadmapMetrics = roadmap
    ? getSyncedRoadmapMetrics(roadmap, issues)
    : null
  const issueInsights = aiInsights.filter((insight) =>
    issue.aiInsightIds.includes(insight.id)
  )
  const derivedSignals = getIssueSignals(issue, roadmapItems, ventures)
  const insightSignals = getInsightSignals(issueInsights)
  const allSignals = [...insightSignals, ...derivedSignals]
  const issueSummary = getIssueSummary(issue, roadmapItems, ventures)
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
          <h3 className="text-sm font-medium text-foreground">AI summary</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {issueSummary}
          </p>
        </section>

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
                    Progress {syncedRoadmapMetrics?.progress ?? roadmap.progress}% /
                    Confidence{" "}
                    {syncedRoadmapMetrics?.confidence ?? roadmap.confidence}%
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
            {allSignals.length > 0 ? (
              allSignals.map((signal) =>
                signal.recommendationKind ? (
                  <AiRecommendationBlock key={signal.id} signal={signal} />
                ) : (
                  <AiInsightCard key={signal.id} signal={signal} compact />
                )
              )
            ) : null}
            {allSignals.length === 0 ? (
              <p className="rounded-lg border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
                No significant issue risk detected.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}
