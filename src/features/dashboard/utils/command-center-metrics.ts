import type {
  Venture,
  CapacityPressure,
} from "@/types/venture"
import type { Issue, EvidenceRole, OperatorFunction } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { AnalystSignal } from "@/types/ai"
import type {
  CommandCenterData,
  CommandCenterDecision,
  ValidationRiskSummary,
  CapacityPressureSummary,
  ExecutionEvidenceSummary,
} from "@/types/dashboard"

import { validationGates } from "@/data/validation-gates"
import { evidenceSignals } from "@/data/evidence-signals"
import { operatorAllocations, capacitySignals } from "@/data/operator-capacity"
import { analystSignals } from "@/data/analyst-signals"

export function getCommandCenterData(
  ventures: Venture[],
  issues: Issue[],
  roadmapItems: RoadmapItem[],
  context: { mode: "portfolio" | "venture"; activeVentureId: string | null }
): CommandCenterData {
  if (ventures.length === 0) {
    return {
      topDecision: null,
      attentionQueue: [],
      validationRisks: [],
      capacityPressures: [],
      evidenceSummary: null,
      analystRecommendation: null,
    }
  }

  const currentVentureIds = new Set(ventures.map((v) => v.id))

  // Filter local/seeded data arrays by current venture IDs to avoid showing seeded info for custom/clean workspaces
  const activeGates = validationGates.filter((g) => currentVentureIds.has(g.ventureId))
  const activeEvidenceSignals = evidenceSignals.filter((es) => currentVentureIds.has(es.ventureId))
  const activeAllocations = operatorAllocations.filter((a) => currentVentureIds.has(a.ventureId))
  const activeCapacitySignals = capacitySignals
    .filter((cs) => cs.affectedVentureIds.some((id) => currentVentureIds.has(id)))
    .map((cs) => {
      const filteredIssueIds = cs.sourceIssueIds.filter((id) => {
        const issue = issues.find((i) => i.id === id)
        return issue && currentVentureIds.has(issue.ventureId)
      })
      const filteredRoadmapIds = cs.sourceRoadmapIds.filter((id) => {
        const roadmap = roadmapItems.find((r) => r.id === id)
        return roadmap && currentVentureIds.has(roadmap.ventureId)
      })
      return {
        ...cs,
        affectedVentureIds: cs.affectedVentureIds.filter((id) => currentVentureIds.has(id)),
        sourceIssueIds: filteredIssueIds,
        sourceRoadmapIds: filteredRoadmapIds,
      }
    })
  const activeAnalystSignals = analystSignals.filter((s) => currentVentureIds.has(s.ventureId))

  // 1. Calculate venture priority scores for attention queue ranking
  const rankedVentures = ventures.map((venture) => {
    const gate = activeGates.find((g) => g.ventureId === venture.id)
    const allocations = activeAllocations.filter((a) => a.ventureId === venture.id)

    // Decision pressure weighting
    let decisionPressureScore = 25
    if (venture.decisionPressure === "critical") decisionPressureScore = 100
    else if (venture.decisionPressure === "high") decisionPressureScore = 75
    else if (venture.decisionPressure === "medium") decisionPressureScore = 50

    // Validation gate status weighting
    let gateStatusScore = 0
    if (gate) {
      if (["blocked", "failed", "at-risk"].includes(gate.status)) gateStatusScore = 50
      else if (gate.status === "watch") gateStatusScore = 25
    }

    // Capacity pressure weighting
    let capacityPressureScore = 0
    const hasOverloaded = allocations.some((a) => a.pressure === "overloaded")
    const hasWatch = allocations.some((a) => a.pressure === "watch")
    if (hasOverloaded) capacityPressureScore = 30
    else if (hasWatch) capacityPressureScore = 15

    // Lower confidence = higher attention needed
    const confidenceScore = 100 - (venture.confidence ?? 50)

    const priorityScore = decisionPressureScore + gateStatusScore + confidenceScore + capacityPressureScore

    return {
      venture,
      priorityScore,
      gate,
    }
  })

  // Dynamic ranking: highest priority score first, fallback to ID sorting
  const sortedRankings = [...rankedVentures].sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore
    }
    return a.venture.id.localeCompare(b.venture.id)
  })

  const attentionQueue = sortedRankings.map(({ venture, gate }) => {
    const allocations = activeAllocations.filter((a) => a.ventureId === venture.id)
    const hasOverloaded = allocations.some((a) => a.pressure === "overloaded")
    const hasWatch = allocations.some((a) => a.pressure === "watch")
    const capacityPressure = hasOverloaded ? "overloaded" : hasWatch ? "watch" : "healthy"

    return {
      ventureId: venture.id,
      ventureName: venture.name,
      ventureSlug: venture.slug,
      phase: venture.phase ?? (venture.stage === "idea" ? "explore" : venture.stage === "validation" ? "validate" : venture.stage === "mvp" ? "build" : "scale"),
      gateName: gate?.name,
      validationConfidence: venture.confidence,
      decisionPressure: venture.decisionPressure ?? "low",
      capacityPressure: capacityPressure as CapacityPressure,
      recommendedDecision: venture.recommendedDecision ?? "continue",
    }
  })

  // 2. Resolve Top Decision
  let topDecision: CommandCenterDecision | null = null

  if (context.mode === "portfolio") {
    const leading = sortedRankings[0]
    if (leading && leading.venture.recommendedDecision && leading.venture.recommendedDecision !== "continue") {
      topDecision = {
        ventureId: leading.venture.id,
        ventureName: leading.venture.name,
        recommendedDecision: leading.venture.recommendedDecision,
        decisionPressure: leading.venture.decisionPressure ?? "low",
        reason: leading.gate?.decisionReason ?? leading.venture.description,
        gateName: leading.gate?.name,
      }
    } else if (leading) {
      // Fallback if top ranked doesn't have an action decision
      topDecision = {
        ventureId: leading.venture.id,
        ventureName: leading.venture.name,
        recommendedDecision: leading.venture.recommendedDecision ?? "continue",
        decisionPressure: leading.venture.decisionPressure ?? "low",
        reason: leading.gate?.decisionReason ?? leading.venture.description,
        gateName: leading.gate?.name,
      }
    }
  } else if (context.activeVentureId) {
    const active = rankedVentures.find((rv) => rv.venture.id === context.activeVentureId)
    if (active) {
      topDecision = {
        ventureId: active.venture.id,
        ventureName: active.venture.name,
        recommendedDecision: active.venture.recommendedDecision ?? "continue",
        decisionPressure: active.venture.decisionPressure ?? "low",
        reason: active.gate?.decisionReason ?? active.venture.description,
        gateName: active.gate?.name,
      }
    }
  }

  // 3. Validation Risks
  let targetGates = activeGates
  if (context.mode === "venture" && context.activeVentureId) {
    targetGates = activeGates.filter((g) => g.ventureId === context.activeVentureId)
  }

  const validationRisks: ValidationRiskSummary[] = targetGates
    .filter((g) => ["watch", "at-risk", "blocked", "failed"].includes(g.status))
    .map((g) => {
      const vName = ventures.find((v) => v.id === g.ventureId)?.name ?? "Unknown"
      return {
        gateId: g.id,
        gateName: g.name,
        ventureId: g.ventureId,
        ventureName: vName,
        status: g.status,
        confidence: g.confidence,
        assumption: g.assumption,
        evidenceSignalIds: g.evidenceSignalIds.filter((id) => activeEvidenceSignals.some((es) => es.id === id)),
      }
    })

  // 4. Capacity Pressures
  let capacityPressures: CapacityPressureSummary[] = []
  if (context.mode === "portfolio") {
    capacityPressures = activeCapacitySignals.map((cs) => {
      const names = cs.affectedVentureIds.map(
        (id) => ventures.find((v) => v.id === id)?.name ?? "Unknown"
      )
      return {
        id: cs.id,
        function: cs.function as OperatorFunction,
        pressure: cs.pressure,
        totalAllocationPercent: cs.totalAllocationPercent,
        affectedVentureIds: cs.affectedVentureIds,
        affectedVentureNames: names,
        contentionReason: cs.contentionReason,
        downstreamImpact: cs.downstreamImpact,
        recommendedDecision: cs.recommendedDecision,
        sourceIssueIds: cs.sourceIssueIds,
        sourceRoadmapIds: cs.sourceRoadmapIds,
      }
    })
  } else if (context.activeVentureId) {
    const currentActiveAllocations = activeAllocations.filter(
      (a) => a.ventureId === context.activeVentureId && ["watch", "overloaded"].includes(a.pressure)
    )
    capacityPressures = currentActiveAllocations.map((a) => {
      const vName = ventures.find((v) => v.id === a.ventureId)?.name ?? "Unknown"
      const matchingSignal = activeCapacitySignals.find(
        (cs) => cs.function === a.function && cs.affectedVentureIds.includes(a.ventureId)
      )
      return {
        id: a.id,
        function: a.function as OperatorFunction,
        pressure: a.pressure,
        totalAllocationPercent: a.allocationPercent,
        affectedVentureIds: [a.ventureId],
        affectedVentureNames: [vName],
        contentionReason: a.impact,
        downstreamImpact: matchingSignal?.downstreamImpact ?? "Operator capacity contention splits design/delivery bandwidth.",
        recommendedDecision: matchingSignal?.recommendedDecision,
        sourceIssueIds: a.linkedIssueIds.filter((id) => {
          const issue = issues.find((i) => i.id === id)
          return issue && currentVentureIds.has(issue.ventureId)
        }),
        sourceRoadmapIds: a.linkedRoadmapIds.filter((id) => {
          const roadmap = roadmapItems.find((r) => r.id === id)
          return roadmap && currentVentureIds.has(roadmap.ventureId)
        }),
      }
    })
  }

  // 5. Execution Evidence Summary
  let evidenceSummary: ExecutionEvidenceSummary | null = null
  const targetVentureId = context.mode === "venture" ? context.activeVentureId : topDecision?.ventureId

  if (targetVentureId) {
    const ventureIssues = issues.filter((i) => i.ventureId === targetVentureId)
    const ventureRoadmaps = roadmapItems.filter((r) => r.ventureId === targetVentureId)
    const roleCounts: Record<EvidenceRole, number> = {
      prove: 0,
      disprove: 0,
      unblock: 0,
      "de-risk": 0,
      "capacity-cost": 0,
    }

    ventureIssues.forEach((issue) => {
      if (issue.evidenceRole && roleCounts[issue.evidenceRole] !== undefined) {
        roleCounts[issue.evidenceRole]++
      }
    })

    const recentIssues = ventureIssues
      .filter((i) => i.evidenceRole && ["done", "in-review", "in-progress"].includes(i.status))
      .slice(0, 3)

    const recentRoadmaps = ventureRoadmaps
      .filter((r) => r.betType && ["active", "planned", "at-risk", "completed", "killed"].includes(r.status))
      .slice(0, 2)

    evidenceSummary = {
      ventureId: targetVentureId,
      evidenceRoleCounts: roleCounts,
      recentEvidenceIssues: recentIssues,
      recentEvidenceRoadmapItems: recentRoadmaps,
    }
  }

  // 6. Studio Analyst Recommendation
  let analystRecommendation: AnalystSignal | null = null
  if (context.mode === "portfolio") {
    // Top portfolio signal matching top decision venture
    const topVentureId = topDecision?.ventureId
    analystRecommendation =
      activeAnalystSignals.find((s) => s.ventureId === topVentureId && s.severity === "high") ??
      activeAnalystSignals.find((s) => s.severity === "high") ??
      activeAnalystSignals[0] ??
      null
  } else if (context.activeVentureId) {
    analystRecommendation = activeAnalystSignals.find((s) => s.ventureId === context.activeVentureId) ?? null
  }

  return {
    topDecision,
    attentionQueue,
    validationRisks,
    capacityPressures,
    evidenceSummary,
    analystRecommendation,
  }
}
