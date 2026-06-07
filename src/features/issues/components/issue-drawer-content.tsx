"use client"

import { GitBranch, ChevronDown, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiInsightCard } from "@/features/assistant/components/ai-insight-card"
import { AiIssueSummary } from "@/features/assistant/components/ai-issue-summary"
import { AiRecommendationBlock } from "@/features/assistant/components/ai-recommendation-block"
import { AiSignalEmptyState } from "@/features/assistant/components/ai-signal-empty-state"
import {
  dedupeSignals,
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
import { getSyncedRoadmapMetrics } from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"
import { resolveValidationGateContext } from "@/features/synchronization/utils/validation-gate-resolver"
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

const STATUS_COLOR: Record<string, string> = {
  blocked: "border-destructive/40 text-destructive bg-destructive/5",
  failed: "border-destructive/40 text-destructive bg-destructive/5",
  "at-risk": "border-destructive/40 text-destructive bg-destructive/5",
  watch: "border-warning/40 text-warning bg-warning/5",
  healthy: "border-success/40 text-success bg-success/5",
}

export function IssueDrawerContent({ issueId }: IssueDrawerContentProps) {
  const issues = useIssueStore((state) => state.issues)
  const issue = useIssueStore((state) =>
    state.issues.find((item) => item.id === issueId)
  )
  const updateIssue = useIssueStore((state) => state.updateIssue)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const linkIssueToRoadmap = useRoadmapStore((state) => state.linkIssueToRoadmap)
  const unlinkIssueFromRoadmap = useRoadmapStore(
    (state) => state.unlinkIssueFromRoadmap
  )
  const openDrawer = useUiStore((state) => state.openDrawer)
  const ventures = useVentureStore((state) => state.ventures)

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
  const insightSignals = getInsightSignals(
    issueInsights,
    issues,
    roadmapItems,
    ventures
  )
  const allSignals = dedupeSignals([...insightSignals, ...derivedSignals])
  const strongestSignal = allSignals[0] ?? null
  const issueSummary = getIssueSummary(issue, roadmapItems, ventures)
  const overdue = isIssueOverdue(issue)
  const missingCriteria =
    !issue.acceptanceCriteria || issue.acceptanceCriteria.length === 0
  const gateContext = resolveValidationGateContext(issue.ventureId, ventures, issue.validationGateId)

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
          <AiIssueSummary summary={issueSummary} signalCount={allSignals.length} />
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
                Inspect operational signal
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
              onChange={(value) => {
                if (issue.roadmapId) {
                  unlinkIssueFromRoadmap(issue.roadmapId, issue.id)
                }
                if (value) {
                  linkIssueToRoadmap(value, issue.id)
                }
                updateIssue(issue.id, { roadmapId: value || undefined })
              }}
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
          <h3 className="text-sm font-medium text-foreground mb-3">
            Execution Evidence
          </h3>
          {gateContext ? (
            <div className="space-y-3.5">
              <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-semibold">Validation Gate</span>
                    <span className="font-semibold text-sm text-foreground">
                      {gateContext.gate.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Badge variant="outline" className="text-[9px] uppercase font-bold py-0 h-4 border-info/40 text-info bg-info/5">
                      Phase: {gateContext.gate.phase}
                    </Badge>
                    <Badge variant="outline" className={cn("text-[9px] uppercase font-bold py-0 h-4", STATUS_COLOR[gateContext.gate.status])}>
                      {gateContext.gate.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs pt-2 border-t border-border/20">
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Evidence Role</span>
                    <span className="font-medium text-foreground capitalize">{issue.evidenceRole || "None"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Evidence Strength</span>
                    <span className="font-medium text-foreground capitalize">{issue.evidenceStrength || "None"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Confidence Impact</span>
                    <span className="font-medium text-foreground capitalize">{issue.confidenceImpact || "Neutral"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Decision Impact</span>
                    <span className="font-medium text-foreground capitalize">{issue.decisionImpact || "None"}</span>
                  </div>
                </div>

                {issue.operatorImpact && (
                  <div className="pt-2 border-t border-border/20 text-xs">
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Operator Capacity Impact</span>
                    <div className="mt-0.5 font-medium text-foreground">
                      <span className="capitalize">{issue.operatorImpact.function}</span> /{" "}
                      <span className="capitalize">{issue.operatorImpact.effort} Effort</span>
                      {issue.operatorImpact.capacityPercent !== undefined && (
                        <span> ({issue.operatorImpact.capacityPercent}%)</span>
                      )}
                    </div>
                    {issue.operatorImpact.note && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 italic">{issue.operatorImpact.note}</p>
                    )}
                  </div>
                )}

                {issue.evidenceRole === "capacity-cost" && (
                  <div className="pt-2 border-t border-border/20 text-[11px] text-warning flex items-start gap-1.5">
                    <AlertTriangle className="size-3.5 shrink-0 mt-0.5" />
                    <span>Incurs operator capacity pressure.</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground bg-muted/20 p-2.5 rounded border border-border/40">
                <span className="font-semibold text-[10px] uppercase text-muted-foreground block mb-1">Tested Assumption</span>
                {gateContext.gate.assumption}
              </div>

              {gateContext.gate.requiredEvidence.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Required Evidence</span>
                  <ul className="text-xs space-y-1">
                    {gateContext.qualitativeEvidenceList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                        <span className={cn(
                          "inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                          item.status === "observed" ? "bg-success" : 
                          item.status === "challenged" ? "bg-destructive" : 
                          item.status === "pending" ? "bg-warning" : "bg-muted-foreground/40"
                        )} />
                        <span>
                          {item.required}{" "}
                          {item.status !== "missing" && (
                            <span className="text-[10px] text-muted-foreground/60 italic font-mono">
                              ({item.status})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {gateContext.observedSignals.length > 0 && (
                <div className="space-y-1.5 border-t border-border/20 pt-2">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Observed Evidence Signals</span>
                  <div className="space-y-2">
                    {gateContext.observedSignals.map((signal) => (
                      <div key={signal.id} className="text-xs bg-muted/10 p-2 rounded border border-border/20">
                        <div className="flex justify-between items-center flex-wrap gap-1 mb-1">
                          <span className="font-medium text-foreground">{signal.title}</span>
                          <Badge variant="outline" className={cn("text-[9px] h-3.5 py-0 px-1 font-mono uppercase",
                            signal.strength === "strong" || signal.strength === "moderate" ? "text-success border-success/20 bg-success/5" :
                            signal.strength === "negative" ? "text-destructive border-destructive/20 bg-destructive/5" :
                            "text-warning border-warning/20 bg-warning/5"
                          )}>
                            {signal.strength}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-normal">{signal.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground bg-muted/10 p-3 rounded border border-border/40">
              <p className="font-medium text-foreground mb-0.5">No execution evidence linked yet.</p>
              <p className="text-muted-foreground/85">This work doesn&apos;t currently support or challenge a validation milestone.</p>
            </div>
          )}
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Strategic linkage
          </h3>
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
                    Open linked roadmap
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No strategic roadmap linkage yet.
            </p>
          )}
        </section>

        <section className="px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Operational intelligence
          </h3>
          <div className="mt-3 space-y-3">
            {allSignals.length > 0 ? (
              allSignals.map((signal) =>
                signal.recommendationKind ? (
                  <AiRecommendationBlock
                    key={signal.id}
                    signal={signal}
                    onOpenInsight={(signalId) =>
                      openDrawer({ type: "assistant", id: signalId })
                    }
                  />
                ) : (
                  <AiInsightCard
                    key={signal.id}
                    signal={signal}
                    compact
                    onOpenInsight={(signalId) =>
                      openDrawer({ type: "assistant", id: signalId })
                    }
                  />
                )
              )
            ) : null}
            {allSignals.length === 0 ? (
              <AiSignalEmptyState title="No significant issue risk detected." />
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
  const selectedOption = options.find((opt) => opt.value === value)
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="mt-1 h-8 w-full justify-between rounded-md border border-border/60 bg-background/50 px-2.5 text-left text-xs font-normal text-foreground select-none"
          >
            <span className="truncate">{selectedOption?.label ?? value}</span>
            <ChevronDown className="size-3.5 opacity-60 shrink-0" strokeWidth={1.8} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value || "none"} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
