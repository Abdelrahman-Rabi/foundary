import { AlertTriangle, BrainCircuit, ListChecks, TrendingDown } from "lucide-react"

import type { AssistantSummary } from "@/features/assistant/utils/assistant-analysis"

type AssistantSummaryRowProps = {
  summary: AssistantSummary
}

const items = [
  {
    key: "activeInsights",
    label: "Analyst signals",
    icon: BrainCircuit,
  },
  {
    key: "highRiskSignals",
    label: "High-risk signals",
    icon: AlertTriangle,
  },
  {
    key: "unclearIssues",
    label: "Evidence gaps",
    icon: ListChecks,
  },
  {
    key: "decliningRoadmaps",
    label: "Declining initiatives",
    icon: TrendingDown,
  },
] as const

export function AssistantSummaryRow({ summary }: AssistantSummaryRowProps) {
  return (
    <section className="grid gap-3 md:grid-cols-4">
      {items.map((item) => {
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
              {summary[item.key]}
            </p>
          </div>
        )
      })}
    </section>
  )
}
