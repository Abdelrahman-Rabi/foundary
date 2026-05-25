"use client"

import { DndContext, type DragEndEvent, closestCorners } from "@dnd-kit/core"

import { IssueColumn } from "@/features/issues/components/issue-column"
import { issueStatuses } from "@/features/issues/utils/issue-utils"
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
}

export function IssueBoard({
  groupedIssues,
  ventures,
  users,
  roadmapItems,
}: IssueBoardProps) {
  const updateIssueStatus = useIssueStore((state) => state.updateIssueStatus)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || !issueStatuses.includes(over.id as IssueStatus)) {
      return
    }

    const nextStatus = over.id as IssueStatus
    const currentStatus = active.data.current?.status as IssueStatus | undefined

    if (currentStatus !== nextStatus) {
      updateIssueStatus(String(active.id), nextStatus)
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
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
    </DndContext>
  )
}
