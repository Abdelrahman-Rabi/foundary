import { PageContainer } from "@/components/layout/page-container"
import {
  SkeletonAiInsightCards,
  SkeletonAiRecommendationBlock,
  SkeletonAiSummaryRow,
  SkeletonPanel,
} from "@/components/shared/skeleton"

export default function AssistantLoading() {
  return (
    <PageContainer>
      <div className="border-b border-border/60 pb-5">
        <div className="h-3 w-44 rounded-md bg-muted/45" />
        <div className="mt-3 h-7 w-60 rounded-md bg-muted/45" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-md bg-muted/45" />
      </div>
      <SkeletonAiSummaryRow />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-lg border border-border/60 bg-card/50 p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <div className="h-4 w-36 rounded-md bg-muted/45" />
              <div className="mt-2 h-3 w-56 rounded-md bg-muted/45" />
            </div>
            <div className="h-3 w-14 rounded-md bg-muted/45" />
          </div>
          <SkeletonAiInsightCards rows={3} />
        </section>
        <SkeletonPanel rows={4} />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-lg border border-border/60 bg-card/50 p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <div className="h-4 w-36 rounded-md bg-muted/45" />
              <div className="mt-2 h-3 w-56 rounded-md bg-muted/45" />
            </div>
            <div className="h-3 w-20 rounded-md bg-muted/45" />
          </div>
          <div className="space-y-3">
            <SkeletonAiRecommendationBlock />
            <SkeletonAiRecommendationBlock />
          </div>
        </section>
        <SkeletonPanel rows={3} />
      </div>
    </PageContainer>
  )
}
