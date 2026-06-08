import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

type IssuesHeaderProps = {
  contextLabel: string
  visibleCount: number
  onOpenQuickCreate: () => void
}

export function IssuesHeader({
  contextLabel,
  visibleCount,
  onOpenQuickCreate,
}: IssuesHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-6 border-b border-border/60 pb-5">
      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {contextLabel} evidence
        </p>
        <h1 className="text-2xl font-semibold tracking-normal text-foreground">
          Evidence
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Execution work that proves, disproves, unblocks, or de-risks a studio
          decision. Move status quickly and keep validation context visible.
        </p>
      </div>
      <Button
        type="button"
        onClick={onOpenQuickCreate}
        className="hidden md:inline-flex"
      >
        <Plus className="size-3.5" strokeWidth={1.8} />
        New Issue
      </Button>
      <span className="sr-only">{visibleCount} issues visible</span>
    </header>
  )
}
