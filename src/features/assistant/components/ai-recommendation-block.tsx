"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiRecommendationBadge, AiRiskBadge } from "@/features/assistant/components/ai-badges"
import { AiConfidenceIndicator } from "@/features/assistant/components/ai-confidence-indicator"

type AiRecommendationBlockProps = {
  signal: AiSignal
  onOpenSource?: (signal: AiSignal) => void
  onOpenInsight?: (signalId: string) => void
}

export function AiRecommendationBlock({
  signal,
  onOpenSource,
  onOpenInsight,
}: AiRecommendationBlockProps) {
  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:border-border"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">
            {getSignalTypeLabel(signal.signalType)}
          </p>
          <h3 className="mt-1 text-sm font-medium text-foreground">
            {signal.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {signal.ventureName} / {signal.sourceLabel}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <AiRiskBadge severity={signal.severity} />
          {signal.recommendationKind ? (
            <AiRecommendationBadge kind={signal.recommendationKind} />
          ) : null}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {signal.recommendedDecision ? (
          <SignalText
            label="Recommended move"
            value={formatDecision(signal.recommendedDecision)}
          />
        ) : null}
        <SignalText label="Reason" value={signal.reason} muted />
        {signal.evidenceSummary ? (
          <SignalText label="Evidence" value={signal.evidenceSummary} muted />
        ) : null}
        {signal.capacityTradeoff ? (
          <SignalText
            label="Capacity tradeoff"
            value={signal.capacityTradeoff}
            muted
          />
        ) : null}
        <SignalText label="Suggested action" value={signal.suggestedAction} />
      </div>
      <AiConfidenceIndicator
        confidence={signal.confidence}
        className="mt-3 max-w-40"
      />
      {onOpenSource || onOpenInsight ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {onOpenSource ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => onOpenSource(signal)}
            >
              <ExternalLink className="mr-1.5 size-3.5" />
              {signal.sourceActionLabel ?? "Open source"}
            </Button>
          ) : null}
          {onOpenInsight ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => onOpenInsight(signal.id)}
            >
              Inspect signal
            </Button>
          ) : null}
        </div>
      ) : null}
    </motion.section>
  )
}

function SignalText({
  label,
  value,
  muted = false,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={
          muted
            ? "mt-1 text-xs leading-5 text-muted-foreground"
            : "mt-1 text-xs leading-5 text-foreground"
        }
      >
        {value}
      </p>
    </div>
  )
}

function formatDecision(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function getSignalTypeLabel(type: AiSignal["signalType"]) {
  const labels: Record<AiSignal["signalType"], string> = {
    "studio-decision": "Recommended studio move",
    "evidence-gap": "Evidence gap",
    "sunk-cost-risk": "Sunk-cost risk",
    "capacity-tradeoff": "Capacity tradeoff",
    "gate-confidence": "Gate confidence",
    "execution-risk": "Execution risk",
  }

  return labels[type]
}
