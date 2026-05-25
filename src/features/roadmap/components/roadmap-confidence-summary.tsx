import { AlertTriangle, Signal, TrendingDown } from "lucide-react"

type RoadmapConfidenceSummaryProps = {
  visibleCount: number
  averageConfidence: number
  atRiskCount: number
  decliningCount: number
}

const summaryItems = [
  {
    key: "visible",
    label: "Visible initiatives",
    icon: Signal,
  },
  {
    key: "confidence",
    label: "Average confidence",
    icon: Signal,
  },
  {
    key: "risk",
    label: "At-risk initiatives",
    icon: AlertTriangle,
  },
  {
    key: "declining",
    label: "Declining confidence",
    icon: TrendingDown,
  },
] as const

export function RoadmapConfidenceSummary({
  visibleCount,
  averageConfidence,
  atRiskCount,
  decliningCount,
}: RoadmapConfidenceSummaryProps) {
  const values = {
    visible: visibleCount.toString(),
    confidence: `${averageConfidence}%`,
    risk: atRiskCount.toString(),
    declining: decliningCount.toString(),
  }

  return (
    <section className="grid gap-3 md:grid-cols-4">
      {summaryItems.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.key}
            className="rounded-lg border border-border/60 bg-card/45 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <Icon className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-xl font-semibold text-foreground">
              {values[item.key]}
            </p>
          </div>
        )
      })}
    </section>
  )
}
