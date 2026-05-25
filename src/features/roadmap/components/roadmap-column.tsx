import type { AiInsight } from "@/types/ai"
import type { Issue } from "@/types/issue"
import type { RoadmapItem, RoadmapTimeframe } from "@/types/roadmap"
import type { Venture } from "@/types/venture"
import { RoadmapCard } from "@/features/roadmap/components/roadmap-card"
import {
  timeframeDescriptions,
  timeframeLabels,
} from "@/features/roadmap/utils/roadmap-utils"

type RoadmapColumnProps = {
  timeframe: RoadmapTimeframe
  items: RoadmapItem[]
  ventures: Venture[]
  issues: Issue[]
  insights: AiInsight[]
  onOpenRoadmapItem: (roadmapId: string) => void
}

export function RoadmapColumn({
  timeframe,
  items,
  ventures,
  issues,
  insights,
  onOpenRoadmapItem,
}: RoadmapColumnProps) {
  return (
    <section className="flex min-h-[440px] flex-col rounded-lg border border-border/60 bg-card/35">
      <header className="border-b border-border/50 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-medium text-foreground">
              {timeframeLabels[timeframe]}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {timeframeDescriptions[timeframe]}
            </p>
          </div>
          <span className="rounded-md border border-border/50 px-2 py-1 text-xs text-muted-foreground">
            {items.length}
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-3">
        {items.length > 0 ? (
          items.map((item) => (
            <RoadmapCard
              key={item.id}
              item={item}
              ventures={ventures}
              issues={issues}
              insights={insights}
              onOpenRoadmapItem={onOpenRoadmapItem}
            />
          ))
        ) : (
          <div className="flex min-h-40 flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/60 bg-background/20 p-4 text-center">
            <p className="text-sm font-medium text-foreground">
              No active initiatives.
            </p>
            <p className="mt-1 max-w-48 text-xs leading-5 text-muted-foreground">
              No roadmap items match this timeframe and current context.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
