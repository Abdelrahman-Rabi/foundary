import { cn } from "@/lib/utils"

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/45 motion-reduce:animate-none",
        className
      )}
    />
  )
}

export function SkeletonKpiRow() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border/60 bg-card/45 p-4"
        >
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-7 w-14" />
          <Skeleton className="mt-3 h-3 w-32" />
        </div>
      ))}
    </section>
  )
}

export function SkeletonPanel({ rows = 3 }: { rows?: number }) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-2 h-3 w-48" />
        </div>
        <Skeleton className="h-3 w-14" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-border/50 bg-background/35 p-3"
          >
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="mt-2 h-3 w-4/5" />
            <Skeleton className="mt-3 h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function SkeletonAiSummaryRow() {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border/60 bg-card/45 p-4"
        >
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-3 h-6 w-12" />
          <Skeleton className="mt-3 h-3 w-36" />
        </div>
      ))}
    </section>
  )
}

export function SkeletonAiInsightCards({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-border/60 bg-muted/20 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="mt-3 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-4/5" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonAiRecommendationBlock() {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-4/5" />
      <Skeleton className="mt-4 h-2 w-40 rounded-full" />
    </div>
  )
}

export function SkeletonIssueRows({ rows = 8 }: { rows?: number }) {
  return (
    <section className="overflow-hidden rounded-lg border border-border/60 bg-card/45">
      <div className="grid grid-cols-[minmax(280px,1fr)_110px_100px_110px_100px_130px_110px] gap-3 border-b border-border/60 px-3 py-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[minmax(280px,1fr)_110px_100px_110px_100px_130px_110px] items-center gap-3 border-b border-border/50 px-3 py-3"
        >
          <Skeleton className="h-4 w-4/5" />
          {Array.from({ length: 6 }).map((__, column) => (
            <Skeleton key={column} className="h-5 w-16" />
          ))}
        </div>
      ))}
    </section>
  )
}

export function SkeletonRoadmapBoard() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, column) => (
        <section
          key={column}
          className="min-h-[440px] rounded-lg border border-border/60 bg-card/35"
        >
          <header className="border-b border-border/50 px-4 py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-2 h-3 w-40" />
          </header>
          <div className="space-y-3 p-3">
            {Array.from({ length: 2 }).map((__, card) => (
              <div
                key={card}
                className="rounded-lg border border-border/60 bg-card/60 p-4"
              >
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-3 h-12 w-full" />
                <Skeleton className="mt-4 h-2 w-full rounded-full" />
                <Skeleton className="mt-3 h-2 w-4/5 rounded-full" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function SkeletonDrawerSection() {
  return (
    <div className="border-b border-border/50 px-5 py-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
