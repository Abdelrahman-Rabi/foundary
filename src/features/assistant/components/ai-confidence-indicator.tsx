"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type AiConfidenceIndicatorProps = {
  confidence: number
  className?: string
}

export function AiConfidenceIndicator({
  confidence,
  className,
}: AiConfidenceIndicatorProps) {
  const tone =
    confidence >= 80
      ? "bg-success"
      : confidence >= 60
        ? "bg-info"
        : "bg-warning"

  return (
    <div className={cn("min-w-28", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Confidence</span>
        <span className="text-foreground">{confidence}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/60">
        <motion.div
          className={cn("h-full rounded-full", tone)}
          initial={false}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
