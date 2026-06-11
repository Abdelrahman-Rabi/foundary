"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { IssueRow } from "@/features/issues/components/issue-row"
import { NextBestAction } from "@/components/shared/next-best-action"
import { useIssueStore } from "@/stores/issue-store"
import type { Issue } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type IssueListProps = {
  issues: Issue[]
  ventures: Venture[]
  users: User[]
  roadmapItems: RoadmapItem[]
  scopedIssueCount: number
  hasActiveFilters: boolean
  contextLabel: string
  onOpenQuickCreate: () => void
}

export function IssueList({
  issues,
  ventures,
  users,
  roadmapItems,
  scopedIssueCount,
  hasActiveFilters,
  contextLabel,
  onOpenQuickCreate,
}: IssueListProps) {
  const resetFilters = useIssueStore((state) => state.resetFilters)

  if (issues.length === 0) {
    if (scopedIssueCount === 0 && !hasActiveFilters) {
      return (
        <NextBestAction
          icon={Plus}
          title={`No evidence items in ${contextLabel.toLowerCase()} yet.`}
          description="Add the first blocker, validation signal, or delivery risk so Foundary can connect work to a studio decision."
          actionLabel="Add Evidence"
          onAction={onOpenQuickCreate}
        />
      )
    }

    return (
      <EmptyState
        title="No evidence matches the current filters."
        description="Adjust search or filters to widen the evidence view."
        action={
          <Button variant="outline" className="h-8" onClick={resetFilters}>
            Clear filters
          </Button>
        }
      />
    )
  }

  return (
    <section className="overflow-x-auto rounded-lg border border-border/60 bg-card/45">
      <div className="min-w-[980px]">
        <div className="grid grid-cols-[minmax(280px,1fr)_110px_100px_110px_100px_130px_110px] gap-3 border-b border-border/60 px-3 py-2 text-xs text-muted-foreground">
          <span>Evidence Item</span>
          <span>Status</span>
          <span>Impact</span>
          <span>Role</span>
          <span>Owner</span>
          <span>Due</span>
          <span>Venture</span>
        </div>
        {issues.map((issue) => (
          <IssueRow
            key={issue.id}
            issue={issue}
            ventures={ventures}
            users={users}
            roadmapItems={roadmapItems}
          />
        ))}
      </div>
    </section>
  )
}
