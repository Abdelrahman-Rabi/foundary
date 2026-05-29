import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { AttentionItem } from "@/features/dashboard/utils/dashboard-metrics"

type AttentionPanelProps = {
  items: AttentionItem[]
  onOpenAttention: (item: AttentionItem) => void
}

const severityClassName = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

export function AttentionPanel({
  items,
  onOpenAttention,
}: AttentionPanelProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">
            Delivery attention
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Focus areas for the next operating pass.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} items</span>
      </div>

      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              role="button"
              tabIndex={0}
              key={item.id}
              className="flex w-full items-start justify-between gap-3 rounded-lg border border-border/50 bg-background/35 p-3 text-left transition-colors hover:border-border hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              onClick={() => onOpenAttention(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onOpenAttention(item)
                }
              }}
            >
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-foreground">
                  {item.title}
                </h3>
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
          ))
        ) : (
          <div className="rounded-lg border border-border/50 bg-background/35 p-3">
            <p className="text-sm text-muted-foreground">
              No active delivery attention areas detected.
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Declining confidence, overdue work, and validation warnings will
              appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
