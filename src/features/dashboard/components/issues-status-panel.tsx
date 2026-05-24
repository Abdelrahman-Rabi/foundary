import type { StatusCount } from "@/features/dashboard/utils/dashboard-metrics"

type IssuesStatusPanelProps = {
  statusCounts: StatusCount[]
}

const statusColor: Record<string, string> = {
  backlog: "bg-muted-foreground/45",
  planned: "bg-info/65",
  "in-progress": "bg-info",
  "in-review": "bg-warning",
  done: "bg-success",
  killed: "bg-muted-foreground",
}

export function IssuesStatusPanel({ statusCounts }: IssuesStatusPanelProps) {
  const total = statusCounts.reduce((sum, status) => sum + status.count, 0)

  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">Issues by status</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Detailed issue records, shown as workflow momentum.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{total} detailed</span>
      </div>

      <div className="flex h-2 overflow-hidden rounded-full bg-muted/60">
        {statusCounts.map((status) => {
          const width = total === 0 ? 0 : (status.count / total) * 100

          return (
            <div
              key={status.status}
              className={statusColor[status.status]}
              style={{ width: `${width}%` }}
            />
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {statusCounts.map((status) => (
          <div
            key={status.status}
            className="flex items-center justify-between rounded-md border border-border/40 bg-background/30 px-3 py-2 text-xs"
          >
            <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
              <span className={`size-2 rounded-full ${statusColor[status.status]}`} />
              <span className="truncate">{status.label}</span>
            </span>
            <span className="font-medium text-foreground">{status.count}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
