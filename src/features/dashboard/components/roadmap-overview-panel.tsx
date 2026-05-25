import { Badge } from "@/components/ui/badge"
import { getVentureName } from "@/features/dashboard/utils/dashboard-metrics"
import { cn } from "@/lib/utils"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"

type RoadmapOverviewPanelProps = {
  roadmapItems: RoadmapItem[]
  ventures: Venture[]
  onOpenRoadmapItem: (roadmapId: string) => void
}

const statusClassName = {
  planned: "border-info/40 text-info",
  active: "border-success/40 text-success",
  "at-risk": "border-warning/50 text-warning",
  completed: "border-success/40 text-success",
  killed: "border-muted-foreground/40 text-muted-foreground",
}

export function RoadmapOverviewPanel({
  roadmapItems,
  ventures,
  onOpenRoadmapItem,
}: RoadmapOverviewPanelProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">Roadmap overview</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Active initiatives sorted by confidence risk.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {roadmapItems.length} visible
        </span>
      </div>

      <div className="space-y-3">
        {roadmapItems.length > 0 ? roadmapItems.map((item) => (
          <div
            role="button"
            tabIndex={0}
            key={item.id}
            className="w-full rounded-lg border border-border/50 bg-background/35 p-3 text-left transition-colors hover:border-border hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            onClick={() => onOpenRoadmapItem(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onOpenRoadmapItem(item.id)
              }
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {getVentureName(ventures, item.ventureId)} / {item.linkedIssueIds.length} linked issue
                  {item.linkedIssueIds.length === 1 ? "" : "s"}
                </p>
              </div>
              <Badge
                variant="outline"
                className={cn("capitalize", statusClassName[item.status])}
              >
                {item.status.replace("-", " ")}
              </Badge>
            </div>

            <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">
              {item.goal}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{item.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/60">
                  <div
                    className="h-full rounded-full bg-primary/80"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="text-foreground">{item.confidence}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/60">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      item.confidence < 50 ? "bg-warning" : "bg-success"
                    )}
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
                <p className="mt-2 text-xs capitalize text-muted-foreground">
                  Trend: {item.confidenceTrend}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <div className="rounded-lg border border-border/50 bg-background/35 p-3">
            <p className="text-sm text-muted-foreground">
              No active roadmap initiatives in this context.
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Planned, active, and at-risk initiatives will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
