"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  type DragStartEvent,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { IssueCardPreview } from "@/features/issues/components/issue-card"
import { IssueColumn } from "@/features/issues/components/issue-column"
import { issueStatuses } from "@/features/issues/utils/issue-utils"
import { NextBestAction } from "@/components/shared/next-best-action"
import { useIssueStore } from "@/stores/issue-store"
import type { Issue, IssueStatus } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type IssueBoardProps = {
  groupedIssues: Record<IssueStatus, Issue[]>
  ventures: Venture[]
  users: User[]
  roadmapItems: RoadmapItem[]
  scopedIssueCount: number
  hasActiveFilters: boolean
  contextLabel: string
  onOpenQuickCreate: () => void
}

export function IssueBoard({
  groupedIssues,
  ventures,
  users,
  roadmapItems,
  scopedIssueCount,
  hasActiveFilters,
  contextLabel,
  onOpenQuickCreate,
}: IssueBoardProps) {
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus)
  const resetFilters = useIssueStore((state) => state.resetFilters)
  const [activeIssueId, setActiveIssueId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const activeIssue = activeIssueId
    ? Object.values(groupedIssues)
        .flat()
        .find((issue) => issue.id === activeIssueId) ?? null
    : null

  function handleDragStart(event: DragStartEvent) {
    setActiveIssueId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveIssueId(null)

    if (!over) {
      return
    }

    const overStatus =
      over.data.current?.status ??
      (issueStatuses.includes(over.id as IssueStatus) ? over.id : null)

    if (!overStatus || !issueStatuses.includes(overStatus as IssueStatus)) {
      return
    }

    const nextStatus = overStatus as IssueStatus
    const currentStatus = active.data.current?.status as IssueStatus | undefined

    if (currentStatus !== nextStatus) {
      updateIssueStatus(String(active.id), nextStatus)
    }
  }

  const visibleIssueCount = Object.values(groupedIssues).flat().length

  if (visibleIssueCount === 0 && scopedIssueCount === 0 && !hasActiveFilters) {
    return (
      <NextBestAction
        icon={Plus}
        title={`No board evidence in ${contextLabel.toLowerCase()} yet.`}
        description="Add the first evidence item to connect execution, validation, and delivery pressure."
        actionLabel="Add Evidence"
        onAction={onOpenQuickCreate}
      />
    )
  }

  if (visibleIssueCount === 0 && hasActiveFilters) {
    return (
      <EmptyState
        title="No board evidence matches the current filters."
        description="Clear filters to return to the full evidence board for this context."
        action={
          <Button variant="outline" className="h-8" onClick={resetFilters}>
            Clear filters
          </Button>
        }
      />
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveIssueId(null)}
    >
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4">
          {issueStatuses.map((status) => (
            <IssueColumn
              key={status}
              status={status}
              issues={groupedIssues[status]}
              ventures={ventures}
              users={users}
              roadmapItems={roadmapItems}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeIssue ? (
          <IssueCardPreview
            issue={activeIssue}
            ventures={ventures}
            users={users}
            roadmapItems={roadmapItems}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
