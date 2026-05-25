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
      eyebrow={`${contextLabel} / ${visibleCount} visible`}
      title="Roadmap"
      description="Coordinate venture direction through outcomes, confidence, and execution progress."
      action={
        <Button size="sm" className="h-9 gap-2" onClick={onOpenQuickCreate}>
          <Plus className="size-4" />
          New Initiative
        </Button>
      }
    />
  )
}
