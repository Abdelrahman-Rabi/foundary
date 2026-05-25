"use client"

import { motion } from "framer-motion"
import { BrainCircuit, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { AiSignal } from "@/features/assistant/utils/assistant-analysis"
import { AiRecommendationBadge, AiRiskBadge } from "@/features/assistant/components/ai-badges"
import { AiConfidenceIndicator } from "@/features/assistant/components/ai-confidence-indicator"

type AiInsightCardProps = {
  signal: AiSignal
  onOpenInsight?: (signalId: string) => void
  onOpenSource?: (signal: AiSignal) => void
  compact?: boolean
}

export function AiInsightCard({
  signal,
  onOpenInsight,
  onOpenSource,
  compact = false,
}: AiInsightCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="rounded-lg border border-border/60 bg-muted/20 p-4 transition-colors hover:border-border"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">
              {signal.title}
            </h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {signal.observation}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
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

      {!compact ? (
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_140px]">
          <div className="space-y-2">
            <SignalText label="Reason" value={signal.reason} />
            <SignalText label="Suggested action" value={signal.suggestedAction} />
          </div>
          <AiConfidenceIndicator confidence={signal.confidence} />
        </div>
      ) : (
        <p className="mt-3 text-xs leading-5 text-foreground">
          {signal.suggestedAction}
        </p>
      )}

      {onOpenInsight || onOpenSource ? (
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
    </motion.article>
  )
}

function SignalText({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs leading-5 text-foreground">{value}</p>
    </div>
  )
}
