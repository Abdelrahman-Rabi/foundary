import { PageContainer } from "@/components/layout/page-container"
import { SkeletonKpiRow, SkeletonPanel } from "@/components/shared/skeleton"

export default function DashboardLoading() {
  return (
    <PageContainer>
      <div className="border-b border-border/60 pb-5">
        <div className="h-3 w-28 rounded-md bg-muted/45" />
        <div className="mt-3 h-7 w-40 rounded-md bg-muted/45" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-md bg-muted/45" />
      </div>
      <SkeletonKpiRow />
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <SkeletonPanel rows={3} />
        <SkeletonPanel rows={3} />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
        <SkeletonPanel rows={3} />
        <SkeletonPanel rows={4} />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <SkeletonPanel rows={3} />
        <SkeletonPanel rows={3} />
      </div>
    </PageContainer>
  )
}
