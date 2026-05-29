import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { OperationalActivity } from "@/features/dashboard/utils/dashboard-metrics"

type OperationalActivityPanelProps = {
  items: OperationalActivity[]
  onOpenActivity: (item: OperationalActivity) => void
}

const severityClassName = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

function formatActivityTime(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
  }).format(new Date(timestamp))
}

export function OperationalActivityPanel({
  items,
  onOpenActivity,
}: OperationalActivityPanelProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">
            Recent operational activity
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Recent signals that support the portfolio demo path.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} events</span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            className="flex items-start justify-between gap-3 rounded-lg border border-border/50 bg-background/35 p-3 transition-colors hover:border-border hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            onClick={() => onOpenActivity(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onOpenActivity(item)
              }
            }}
          >
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h3 className="truncate text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatActivityTime(item.timestamp)}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {item.detail}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn("capitalize", severityClassName[item.severity])}
            >
              {item.severity}
            </Badge>
          </div>
        ))}
      </div>
    </section>
  )
}
