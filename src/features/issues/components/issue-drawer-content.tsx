"use client"

import { GitBranch } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
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
  getRoadmapItem,
  getVenture,
  isIssueOverdue,
  issuePriorities,
  issueStatuses,
  issueTypes,
  priorityLabels,
  statusLabels,
  typeLabels,
} from "@/features/issues/utils/issue-utils"
import { aiInsights } from "@/data/ai-insights"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { getSyncedRoadmapMetrics } from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import type { IssuePriority, IssueStatus, IssueType } from "@/types/issue"

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
  const updateIssue = useIssueStore((state) => state.updateIssue)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const openDrawer = useUiStore((state) => state.openDrawer)

  if (!issue) {
    return (
      <div className="p-5">
        <EmptyState
          title="Issue context is unavailable."
          description="The selected issue is no longer present in the current workspace."
        />
      </div>
    )
  }

  const venture = getVenture(ventures, issue.ventureId)
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
  const strongestSignal = allSignals[0] ?? null
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
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-foreground">Metadata</h3>
            {strongestSignal ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  openDrawer({ type: "assistant", id: strongestSignal.id })
                }
              >
                Inspect AI signal
              </Button>
            ) : null}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <MetadataSelect
              label="Status"
              value={issue.status}
              onChange={(value) =>
                updateIssue(issue.id, { status: value as IssueStatus })
              }
              options={issueStatuses.map((status) => ({
                value: status,
                label: statusLabels[status],
              }))}
            />
            <MetadataSelect
              label="Priority"
              value={issue.priority}
              onChange={(value) =>
                updateIssue(issue.id, { priority: value as IssuePriority })
              }
              options={issuePriorities.map((priority) => ({
                value: priority,
                label: priorityLabels[priority],
              }))}
            />
            <MetadataSelect
              label="Type"
              value={issue.type}
              onChange={(value) =>
                updateIssue(issue.id, { type: value as IssueType })
              }
              options={issueTypes.map((type) => ({
                value: type,
                label: typeLabels[type],
              }))}
            />
            <MetadataSelect
              label="Owner"
              value={issue.ownerId}
              onChange={(value) => updateIssue(issue.id, { ownerId: value })}
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
            />
            <MetadataInput
              label="Due date"
              value={issue.dueDate ?? ""}
              onChange={(value) =>
                updateIssue(issue.id, { dueDate: value || undefined })
              }
            />
            <MetadataSelect
              label="Roadmap"
              value={issue.roadmapId ?? ""}
              onChange={(value) =>
                updateIssue(issue.id, { roadmapId: value || undefined })
              }
              options={[
                { value: "", label: "No roadmap link" },
                ...roadmapItems
                  .filter((item) => item.ventureId === issue.ventureId)
                  .map((item) => ({ value: item.id, label: item.title })),
              ]}
            />
            <label className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={issue.blocked}
                onChange={(event) =>
                  updateIssue(issue.id, { blocked: event.target.checked })
                }
              />
              Blocked
            </label>
            <MetadataItem label="Confidence" value={`${issue.confidence}%`} />
            <MetadataItem label="Effort" value={issue.effort} />
            <MetadataItem
              label="Updated"
              value={formatDate(issue.updatedAt.slice(0, 10))}
            />
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
          ) : null}
          <textarea
            value={issue.acceptanceCriteria?.join("\n") ?? ""}
            onChange={(event) =>
              updateIssue(issue.id, {
                acceptanceCriteria: event.target.value
                  .split("\n")
                  .map((criterion) => criterion.trim())
                  .filter(Boolean),
              })
            }
            rows={4}
            placeholder="One measurable criterion per line..."
            className="mt-3 w-full resize-none rounded-lg border border-border/60 bg-background/50 p-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground"
          />
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-3 h-8 px-2 text-xs"
                    onClick={() => openDrawer({ type: "roadmap", id: roadmap.id })}
                  >
                    Open roadmap
                  </Button>
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

function MetadataSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <label>
      <span className="text-xs text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-8 w-full rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
      >
        {options.map((option) => (
          <option key={option.value || "none"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function MetadataInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label>
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-8 w-full rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
      />
    </label>
  )
}
