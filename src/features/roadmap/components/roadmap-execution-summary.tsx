import { AlertCircle, CheckCircle2, CircleDot, GitBranch, XCircle } from "lucide-react"

import type { SyncedRoadmapMetrics } from "@/features/synchronization/utils/sync-utils"

type RoadmapExecutionSummaryProps = {
  metrics: SyncedRoadmapMetrics
}

const items = [
  { key: "linkedIssues", label: "Linked", icon: GitBranch },
  { key: "completedIssues", label: "Done", icon: CheckCircle2 },
  { key: "activeIssues", label: "Active", icon: CircleDot },
  { key: "blockedIssues", label: "Blocked", icon: AlertCircle },
  { key: "overdueIssues", label: "Overdue", icon: AlertCircle },
  { key: "killedIssues", label: "Killed", icon: XCircle },
] as const

export function RoadmapExecutionSummary({
  metrics,
}: RoadmapExecutionSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => {
        const Icon = item.icon
        const value = metrics[item.key]

        return (
          <div
            key={item.key}
            className="rounded-lg border border-border/60 bg-muted/20 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <Icon className="size-3.5 text-muted-foreground" />
            </div>
            <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
          </div>
        )
      })}
    </div>
  )
}
