import { validationGates } from "@/data/validation-gates"
import { evidenceSignals } from "@/data/evidence-signals"
import type { ValidationGate, EvidenceSignal, Venture } from "@/types/venture"

export interface QualitativeEvidence {
  required: string
  status: "observed" | "challenged" | "pending" | "missing"
  signalTitle?: string
  strength?: string
}

export interface ValidationGateContext {
  gate: ValidationGate
  venture: Venture
  observedSignals: EvidenceSignal[]
  qualitativeEvidenceList: QualitativeEvidence[]
}

/**
 * Resolves validation gate context, ensuring that only gates and signals belonging to active ventures
 * in the workspace are loaded (preventing data leaks in clean/custom workspaces).
 */
export function resolveValidationGateContext(
  ventureId: string | undefined,
  activeVentures: Venture[],
  overrideGateId?: string
): ValidationGateContext | null {
  if (!ventureId) return null

  // Ensure the venture exists in the current active workspace
  const venture = activeVentures.find((v) => v.id === ventureId)
  if (!venture) return null

  // Find the current gate for the venture (or override if provided)
  const gate = validationGates.find(
    (g) => g.ventureId === ventureId && (overrideGateId ? g.id === overrideGateId : (venture.currentGateId ? g.id === venture.currentGateId : true))
  )
  if (!gate) return null

  // Filter evidence signals to only those linked to this gate and active in the current venture
  const observedSignals = evidenceSignals.filter(
    (es) => es.gateId === gate.id && es.ventureId === ventureId
  )

  // Qualitatively map required evidence to observed signals
  const qualitativeEvidenceList: QualitativeEvidence[] = gate.requiredEvidence.map((req) => {
    // Look for matching signals qualitatively
    const reqLower = req.toLowerCase()
    
    // Find matching signal based on keyword matching
    const matchingSignal = observedSignals.find((sig) => {
      const sigTitleLower = sig.title.toLowerCase()
      
      // Sentra cohort match
      if (reqLower.includes("cohort") && sigTitleLower.includes("cohort")) return true
      // Sentra taxonomy match
      if (reqLower.includes("taxonomy") && (sigTitleLower.includes("taxonomy") || sigTitleLower.includes("logging"))) return true
      // Reson8 interviews match
      if (reqLower.includes("interview") && sigTitleLower.includes("interview")) return true
      // Reson8 retention/broadcast match
      if (reqLower.includes("retention") && (sigTitleLower.includes("broadcast") || sigTitleLower.includes("retention"))) return true
      // Internal Ops meeting rollup match
      if (reqLower.includes("rollout") && sigTitleLower.includes("rollout")) return true
      if (reqLower.includes("summary") && sigTitleLower.includes("summary")) return true

      return false
    })

    if (matchingSignal) {
      const isNegative = matchingSignal.strength === "negative"
      const isWeak = matchingSignal.strength === "weak"
      const isPending = matchingSignal.title.toLowerCase().includes("pending") || matchingSignal.summary.toLowerCase().includes("pending") || matchingSignal.title.toLowerCase().includes("logging")

      let status: QualitativeEvidence["status"] = "observed"
      if (isNegative) {
        status = "challenged"
      } else if (isPending) {
        status = "pending"
      } else if (isWeak) {
        status = "pending"
      }

      return {
        required: req,
        status,
        signalTitle: matchingSignal.title,
        strength: matchingSignal.strength,
      }
    }

    return {
      required: req,
      status: "missing",
    }
  })

  return {
    gate,
    venture,
    observedSignals,
    qualitativeEvidenceList,
  }
}
