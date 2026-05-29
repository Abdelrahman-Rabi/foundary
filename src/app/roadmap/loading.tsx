import { PageContainer } from "@/components/layout/page-container"
import { SkeletonKpiRow, SkeletonRoadmapBoard } from "@/components/shared/skeleton"

export default function RoadmapLoading() {
  return (
    <PageContainer>
      <div className="border-b border-border/60 pb-5">
        <div className="h-3 w-36 rounded-md bg-muted/45" />
        <div className="mt-3 h-7 w-32 rounded-md bg-muted/45" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-md bg-muted/45" />
      </div>
      <div className="h-14 rounded-lg border border-border/60 bg-card/45" />
      <SkeletonKpiRow />
      <SkeletonRoadmapBoard />
    </PageContainer>
  )
}
