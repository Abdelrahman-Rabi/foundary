import {
  CircleSlash,
  Flag,
  ListTodo,
  Timer,
  type LucideIcon,
} from "lucide-react"

import { KpiCard } from "@/features/dashboard/components/kpi-card"
import type { KpiMetric } from "@/features/dashboard/utils/dashboard-metrics"

type KpiRowProps = {
  metrics: KpiMetric[]
  onSelectMetric?: (metric: KpiMetric) => void
}

const icons: LucideIcon[] = [ListTodo, Timer, Flag, CircleSlash]

export function KpiRow({ metrics, onSelectMetric }: KpiRowProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <KpiCard
          key={metric.label}
          label={metric.label}
          value={metric.value}
          helper={metric.helper}
          tone={metric.tone}
          icon={icons[index] ?? ListTodo}
          onSelect={
            metric.targetRoute && onSelectMetric
              ? () => onSelectMetric(metric)
              : undefined
          }
        />
      ))}
    </section>
  )
}
