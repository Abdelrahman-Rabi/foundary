"use client"

import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { IssueCard } from "@/features/issues/components/issue-card"
import { statusLabels } from "@/features/issues/utils/issue-utils"
import { cn } from "@/lib/utils"
import type { Issue, IssueStatus } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type IssueColumnProps = {
  status: IssueStatus
  issues: Issue[]
  ventures: Venture[]
  users: User[]
  roadmapItems: RoadmapItem[]
}

export function IssueColumn({
  status,
  issues,
  ventures,
  users,
  roadmapItems,
}: IssueColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id: status })

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "flex h-[calc(100vh-220px)] w-80 shrink-0 flex-col rounded-lg border border-border/60 bg-card/40",
        isOver && "border-ring/60 bg-muted/30"
      )}
    >
      <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
        <h2 className="text-sm font-medium text-foreground">
          {statusLabels[status]}
        </h2>
        <span className="text-xs text-muted-foreground">{issues.length}</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {issues.length > 0 ? (
          <SortableContext
            items={issues.map((issue) => issue.id)}
            strategy={verticalListSortingStrategy}
          >
            {issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                ventures={ventures}
                users={users}
                roadmapItems={roadmapItems}
              />
            ))}
          </SortableContext>
        ) : (
          <div className="rounded-lg border border-dashed border-border/60 p-3 text-xs text-muted-foreground">
            No issues in {statusLabels[status].toLowerCase()}.
          </div>
        )}
      </div>
    </section>
  )
}
