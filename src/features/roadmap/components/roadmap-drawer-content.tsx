"use client"

import { GitBranch, Target, ChevronDown, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/shared/empty-state"
import { AiRoadmapAnalysis } from "@/features/assistant/components/ai-roadmap-analysis"
import {
  dedupeSignals,
  getInsightSignals,
  getRoadmapSignals,
} from "@/features/assistant/utils/assistant-analysis"
import {
  RoadmapConfidenceBadge,
  RoadmapStatusBadge,
  RoadmapTrendBadge,
} from "@/features/roadmap/components/roadmap-badges"
import { RoadmapConfidence } from "@/features/roadmap/components/roadmap-confidence"
import { RoadmapExecutionSummary } from "@/features/roadmap/components/roadmap-execution-summary"
import { RoadmapLinkedIssues } from "@/features/roadmap/components/roadmap-linked-issues"
import { RoadmapProgress } from "@/features/roadmap/components/roadmap-progress"
import {
  getIssueCompletion,
  getLinkedIssues,
  getRoadmapInsights,
  getVenture,
  roadmapStatuses,
  roadmapStatusLabels,
  roadmapTimeframes,
  timeframeLabels,
} from "@/features/roadmap/utils/roadmap-utils"
import { aiInsights } from "@/data/ai-insights"
import { users } from "@/data/users"
import { useVentureStore } from "@/stores/venture-store"
import { resolveValidationGateContext } from "@/features/synchronization/utils/validation-gate-resolver"
import { Badge } from "@/components/ui/badge"
import { evidenceSignals } from "@/data/evidence-signals"
import {
  getSyncedRoadmapItems,
  getSyncedRoadmapMetrics,
} from "@/features/synchronization/utils/sync-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import type {
  RoadmapStatus,
  RoadmapTimeframe,
} from "@/types/roadmap"

const STATUS_COLOR: Record<string, string> = {
  blocked: "border-destructive/40 text-destructive bg-destructive/5",
  failed: "border-destructive/40 text-destructive bg-destructive/5",
  "at-risk": "border-destructive/40 text-destructive bg-destructive/5",
  watch: "border-warning/40 text-warning bg-warning/5",
  healthy: "border-success/40 text-success bg-success/5",
}

const COLOR_MAP: Record<string, string> = {
  narrow: "border-warning/50 text-warning bg-warning/5",
  pause: "border-warning/50 text-warning bg-warning/5",
  kill: "border-destructive/50 text-destructive bg-destructive/5",
  "staff-up": "border-info/40 text-info bg-info/5",
  defer: "border-muted-foreground/40 text-muted-foreground bg-muted-foreground/5",
  "partner-review": "border-destructive/50 text-destructive bg-destructive/5",
  continue: "border-success/40 text-success bg-success/5",
}


const DECISION_LABELS: Record<string, string> = {
  continue: "Continue",
  narrow: "Narrow",
  pause: "Pause",
  kill: "Stop",
  "staff-up": "Staff Up",
  defer: "Defer",
  "partner-review": "Escalate",
}

type RoadmapDrawerContentProps = {
  roadmapId: string
}

export function RoadmapDrawerContent({
  roadmapId,
}: RoadmapDrawerContentProps) {
  const router = useRouter()
  const item = useRoadmapStore((state) =>
    state.roadmapItems.find((roadmapItem) => roadmapItem.id === roadmapId)
  )
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const updateRoadmapItem = useRoadmapStore((state) => state.updateRoadmapItem)
  const issues = useIssueStore((state) => state.issues)
  const setIssueFilters = useIssueStore((state) => state.setFilters)
  const resetIssueFilters = useIssueStore((state) => state.resetFilters)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const ventures = useVentureStore((state) => state.ventures)

  if (!item) {
    return (
      <div className="p-5">
        <EmptyState
          title="Roadmap context is unavailable."
          description="The selected initiative is no longer present in the current workspace."
        />
      </div>
    )
  }
  const syncedItem =
    getSyncedRoadmapItems(roadmapItems, issues).find(
      (roadmapItem) => roadmapItem.id === item.id
    ) ?? item
  const venture = getVenture(ventures, item.ventureId)
  const gateContext = resolveValidationGateContext(item.ventureId, ventures, item.validationGateId)
  const linkedIssues = getLinkedIssues(issues, item)
  const matchingSignals = evidenceSignals.filter((es) => {
    if (es.ventureId !== item.ventureId) return false
    
    const matchesGate = item.validationGateId && es.gateId === item.validationGateId
    const matchesSignalId = item.evidenceSignalIds?.includes(es.id)
    const matchesSourceRoadmap = es.sourceRoadmapIds?.includes(item.id)
    const matchesLinkedIssue = es.sourceIssueIds?.some((id) =>
      linkedIssues.some((issue) => issue.id === id)
    )

    return !!(matchesGate || matchesSignalId || matchesSourceRoadmap || matchesLinkedIssue)
  })

  const linkedIssueRoleCounts = {
    prove: 0,
    disprove: 0,
    unblock: 0,
    "de-risk": 0,
    "capacity-cost": 0,
  }
  linkedIssues.forEach((issue) => {
    if (issue.evidenceRole) {
      linkedIssueRoleCounts[issue.evidenceRole]++
    }
  })

  const issueCompletion = getIssueCompletion(linkedIssues)
  const syncedMetrics = getSyncedRoadmapMetrics(item, issues)
  const insights = getRoadmapInsights(aiInsights, item)
  const analysisSignals = getRoadmapSignals(syncedItem, issues, ventures)
  const insightSignals = getInsightSignals(
    insights,
    issues,
    roadmapItems,
    ventures
  )
  const allSignals = dedupeSignals([...insightSignals, ...analysisSignals])
  const itemId = item.id
  const itemVentureId = item.ventureId

  function handleViewLinkedIssues() {
    resetIssueFilters()
    setIssueFilters({
      roadmapIds: [itemId],
      ventureIds: itemVentureId ? [itemVentureId] : [],
      roadmapLinkedOnly: true,
    })
    router.push("/issues")
  }

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-10 border-b border-border/60 bg-popover/95 px-5 py-4 backdrop-blur-sm">
        <div className="pr-8">
          <p className="text-xs text-muted-foreground">
            {venture?.name ?? "Unknown venture"} / {item.id}
          </p>
          <h2 className="mt-2 text-base font-semibold leading-6 text-foreground">
            {item.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <RoadmapStatusBadge status={syncedItem.status} />
            <RoadmapConfidenceBadge confidence={syncedMetrics.confidence} />
            <RoadmapTrendBadge trend={item.confidenceTrend} />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <section className="border-b border-border/50 px-5 py-4">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">
              Strategic outcome
            </h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.goal}
          </p>
          <textarea
            value={item.goal}
            onChange={(event) =>
              updateRoadmapItem(item.id, { goal: event.target.value })
            }
            rows={3}
            aria-label="Roadmap strategic outcome"
            className="mt-3 w-full resize-none rounded-lg border border-border/60 bg-background/50 p-3 text-sm leading-6 text-foreground placeholder:text-muted-foreground"
          />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
          <label className="mt-4 block">
            <span className="text-xs text-muted-foreground">Target outcome</span>
            <input
              value={item.targetMetric ?? ""}
              onChange={(event) =>
                updateRoadmapItem(item.id, {
                  targetMetric: event.target.value || undefined,
                })
              }
              placeholder="Activation rate +12%"
              className="mt-2 h-9 w-full rounded-lg border border-border/60 bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </label>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Venture Bet / Execution Evidence Context
          </h3>
          {gateContext ? (
            <div className="space-y-3.5">
              <div className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2.5">
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
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Bet Type</span>
                    <span className="font-medium text-foreground capitalize">{item.betType || "None"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Recommended Decision</span>
                    <Badge variant="outline" className={cn("h-4.5 text-[9px] py-0 px-1 font-semibold uppercase font-mono", COLOR_MAP[gateContext.gate.recommendedDecision])}>
                      {DECISION_LABELS[gateContext.gate.recommendedDecision] || gateContext.gate.recommendedDecision}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Confidence Impact</span>
                    <span className="font-medium text-foreground capitalize">{item.confidenceImpact || "Neutral"}</span>
                  </div>
                </div>

                {item.operatorImpact && (
                  <div className="pt-2 border-t border-border/20 text-xs">
                    <span className="text-[10px] text-muted-foreground block uppercase font-mono">Bet Operator Capacity Impact</span>
                    <div className="mt-0.5 font-medium text-foreground">
                      <span className="capitalize">{item.operatorImpact.function}</span> /{" "}
                      <span className="capitalize">{item.operatorImpact.effort} Effort</span>
                      {item.operatorImpact.capacityPercent !== undefined && (
                        <span> ({item.operatorImpact.capacityPercent}%)</span>
                      )}
                    </div>
                    {item.operatorImpact.note && (
                      <p className="text-[11px] text-muted-foreground mt-0.5 italic">{item.operatorImpact.note}</p>
                    )}
                  </div>
                )}

                {/* Linked Issue Roles Summary */}
                <div className="pt-2 border-t border-border/20">
                  <span className="text-[10px] text-muted-foreground block uppercase font-mono mb-1">Linked Issue Roles</span>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(linkedIssueRoleCounts).map(([role, count]) => {
                      if (count === 0) return null
                      return (
                        <Badge key={role} variant="outline" className={cn("text-[9px] h-4.5 py-0 px-1 font-mono uppercase", 
                          role === "prove" ? "bg-success/5 text-success border-success/20" :
                          role === "disprove" ? "bg-destructive/5 text-destructive border-destructive/20" :
                          role === "unblock" ? "bg-info/5 text-info border-info/20" :
                          role === "de-risk" ? "bg-warning/5 text-warning border-warning/20" :
                          "bg-muted-foreground/5 text-muted-foreground border-muted-foreground/20"
                        )}>
                          {role === "prove" ? "proving" : 
                           role === "disprove" ? "challenging" : 
                           role === "unblock" ? "unblocking" : 
                           role === "de-risk" ? "de-risking" : 
                           "capacity-cost"}: {count}
                        </Badge>
                      )
                    })}
                    {Object.values(linkedIssueRoleCounts).every((c) => c === 0) && (
                      <span className="text-xs text-muted-foreground italic">No evidence roles assigned to linked issues</span>
                    )}
                  </div>
                </div>

                {/* Conditional Strategic Warning */}
                {(item.confidence < 50 || item.confidenceTrend === "declining") && 
                 (item.operatorImpact?.effort === "high" || linkedIssues.some(issue => issue.evidenceRole === "capacity-cost" || issue.operatorImpact?.effort === "high")) && (
                  <div className="pt-2 border-t border-border/20 text-[11px] text-muted-foreground flex items-start gap-1.5 leading-normal">
                    <AlertTriangle className="size-3.5 shrink-0 mt-0.5 text-warning" />
                    <span>This initiative consumes active operator capacity despite lower validation confidence. Consider narrowing or pausing.</span>
                  </div>
                )}
              </div>

              {/* Expected Evidence (Roadmap Specific) */}
              {item.expectedEvidence && item.expectedEvidence.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Expected Initiative Evidence</span>
                  <ul className="text-xs space-y-1">
                    {item.expectedEvidence.map((req, idx) => {
                      const reqLower = req.toLowerCase()
                      const matchingSignal = matchingSignals.find((sig) => {
                        const sigTitleLower = sig.title.toLowerCase()
                        if (reqLower.includes("retention") && (sigTitleLower.includes("broadcast") || sigTitleLower.includes("retention") || sigTitleLower.includes("interview"))) return true
                        if (reqLower.includes("cohort") && sigTitleLower.includes("cohort")) return true
                        if (reqLower.includes("interview") && sigTitleLower.includes("interview")) return true
                        return false
                      })

                      const status = matchingSignal 
                        ? (matchingSignal.strength === "negative" ? "challenged" : (matchingSignal.title.toLowerCase().includes("pending") ? "pending" : "observed"))
                        : "missing"

                      return (
                        <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                          <span className={cn(
                            "inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                            status === "observed" ? "bg-success" : 
                            status === "challenged" ? "bg-destructive" : 
                            status === "pending" ? "bg-warning" : "bg-muted-foreground/40"
                          )} />
                          <span>
                            {req}{" "}
                            {status !== "missing" && (
                              <span className="text-[10px] text-muted-foreground/60 italic font-mono">
                                ({status})
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {/* Required Evidence (Validation Gate Specific) */}
              {gateContext.gate.requiredEvidence.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Required Gate Evidence</span>
                  <ul className="text-xs space-y-1">
                    {gateContext.qualitativeEvidenceList.map((ev, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-muted-foreground">
                        <span className={cn(
                          "inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                          ev.status === "observed" ? "bg-success" : 
                          ev.status === "challenged" ? "bg-destructive" : 
                          ev.status === "pending" ? "bg-warning" : "bg-muted-foreground/40"
                        )} />
                        <span>
                          {ev.required}{" "}
                          {ev.status !== "missing" && (
                            <span className="text-[10px] text-muted-foreground/60 italic font-mono">
                              ({ev.status})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strict matching observed signals */}
              {matchingSignals.length > 0 && (
                <div className="space-y-1.5 border-t border-border/20 pt-2">
                  <span className="font-semibold text-[10px] uppercase text-muted-foreground block">Observed Evidence Signals</span>
                  <div className="space-y-2">
                    {matchingSignals.map((signal) => (
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
              <p className="text-muted-foreground/85 font-normal">Link this initiative to an active validation gate to track confidence against studio criteria.</p>
            </div>
          )}
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Progress and confidence
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <RoadmapProgress value={syncedMetrics.progress} />
            <RoadmapConfidence value={syncedMetrics.confidence} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetadataSelect
              label="Status"
              value={item.status}
              onChange={(value) =>
                updateRoadmapItem(item.id, { status: value as RoadmapStatus })
              }
              options={roadmapStatuses.map((status) => ({
                value: status,
                label: roadmapStatusLabels[status],
              }))}
            />
            <MetadataSelect
              label="Timeframe"
              value={item.timeframe}
              onChange={(value) =>
                updateRoadmapItem(item.id, {
                  timeframe: value as RoadmapTimeframe,
                })
              }
              options={roadmapTimeframes.map((timeframe) => ({
                value: timeframe,
                label: timeframeLabels[timeframe],
              }))}
            />
            <MetadataSelect
              label="Owner"
              value={item.ownerId}
              onChange={(value) => updateRoadmapItem(item.id, { ownerId: value })}
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
            />
            <MetadataInput
              label="Confidence"
              value={String(item.confidence)}
              onChange={(value) =>
                updateRoadmapItem(item.id, {
                  confidence: Math.max(0, Math.min(100, Number(value) || 0)),
                })
              }
            />
            <MetadataItem label="Impact" value={item.impact} />
            <MetadataItem
              label="Linked completion"
              value={`${issueCompletion.percent}%`}
            />
          </div>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Execution overview
          </h3>
          <div className="mt-3">
            <RoadmapExecutionSummary metrics={syncedMetrics} />
          </div>
        </section>

        <section className="border-b border-border/50 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-foreground">
                Execution links
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              {issueCompletion.completed} of {issueCompletion.activeTotal} done
            </span>
          </div>

          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={handleViewLinkedIssues}
            >
              View execution links
            </Button>
          </div>

          <div className="mt-3">
            <RoadmapLinkedIssues
              issues={linkedIssues}
              onOpenIssue={(issueId) => openDrawer({ type: "issue", id: issueId })}
            />
          </div>
        </section>

        <section className="px-5 py-4">
          <h3 className="text-sm font-medium text-foreground">
            Operational intelligence
          </h3>
          <div className="mt-3">
            <AiRoadmapAnalysis
              signals={allSignals}
              onOpenInsight={(signalId) =>
                openDrawer({ type: "assistant", id: signalId })
              }
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 capitalize text-sm text-foreground">{value}</p>
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
  options: Array<{ value: string; label: string }>
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
            className="mt-1 h-9 w-full justify-between rounded-lg border border-border/60 bg-background/50 px-2.5 text-left text-sm font-normal text-foreground select-none"
          >
            <span className="truncate">{selectedOption?.label ?? value}</span>
            <ChevronDown className="size-4 opacity-60 shrink-0" strokeWidth={1.8} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-9 w-full rounded-lg border border-border/60 bg-background/50 px-2 text-sm text-foreground"
      />
    </label>
  )
}
