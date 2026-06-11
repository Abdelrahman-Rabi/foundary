"use client"

import { Plus } from "lucide-react"

import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"

type RoadmapHeaderProps = {
  contextLabel: string
  visibleCount: number
  onOpenQuickCreate: () => void
}

export function RoadmapHeader({
  contextLabel,
  visibleCount,
  onOpenQuickCreate,
}: RoadmapHeaderProps) {
  return (
    <PageHeader
      eyebrow={`${contextLabel} / ${visibleCount} bets visible`}
      title="Bets"
      description="Validation initiatives and venture bets tied to assumptions, evidence, and gate confidence."
      action={
        <Button size="sm" className="h-9 gap-2" onClick={onOpenQuickCreate}>
          <Plus className="size-4" />
          Add Bet
        </Button>
      }
    />
  )
}
