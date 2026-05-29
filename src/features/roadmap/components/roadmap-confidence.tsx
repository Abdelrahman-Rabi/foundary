"use client"

import { RoadmapProgress } from "@/features/roadmap/components/roadmap-progress"

type RoadmapConfidenceProps = {
  value: number
  label?: string
}

export function RoadmapConfidence({
  value,
  label = "Confidence",
}: RoadmapConfidenceProps) {
  return (
    <RoadmapProgress
      label={label}
      value={value}
      tone={value < 50 ? "warning" : "success"}
    />
  )
}
