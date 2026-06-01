"use client"

import { useMemo } from "react"

import {
  filterIssues,
  issueStatuses,
  sortIssues,
} from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"
import type { Issue, IssueFilters, IssueStatus } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

function groupIssues(issues: Issue[]) {
  const groups = issueStatuses.reduce<Record<IssueStatus, Issue[]>>(
    (accumulator, status) => ({ ...accumulator, [status]: [] }),
    {
      backlog: [],
      planned: [],
      "in-progress": [],
      "in-review": [],
      done: [],
      killed: [],
    }
  )

  issues.forEach((issue) => {
    groups[issue.status].push(issue)
  })

  return groups
}

function hasActiveIssueFilters(filters: IssueFilters) {
  return (
    filters.search.trim().length > 0 ||
    filters.ventureIds.length > 0 ||
    filters.priorities.length > 0 ||
    filters.statuses.length > 0 ||
    filters.types.length > 0 ||
    filters.ownerIds.length > 0 ||
    filters.roadmapIds.length > 0 ||
    filters.overdueOnly ||
    filters.roadmapLinkedOnly
  )
}

export function useIssuesData({
  users,
  ventures,
}: {
  users: User[]
  ventures: Venture[]
}) {
  const issues = useIssueStore((state) => state.issues)
  const filters = useIssueStore((state) => state.filters)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const issuesViewMode = useUiStore((state) => state.issuesViewMode)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)

  return useMemo(() => {
    const activeVenture =
      ventures.find((venture) => venture.id === activeVentureId) ?? null
    const filteredIssues = filterIssues(issues, filters, users)
    const scopedIssueCount =
      mode === "venture" && activeVentureId
        ? issues.filter((issue) => issue.ventureId === activeVentureId).length
        : issues.length
    const scopedIssues =
      mode === "venture" && activeVentureId
        ? filteredIssues.filter((issue) => issue.ventureId === activeVentureId)
        : filteredIssues
    const visibleIssues = sortIssues(scopedIssues, filters, users, ventures)

    return {
      activeVenture,
      visibleIssues,
      groupedIssues: groupIssues(visibleIssues),
      scopedIssueCount,
      hasActiveFilters: hasActiveIssueFilters(filters),
      roadmapItems: roadmapItems as RoadmapItem[],
      issuesViewMode,
      mode,
      activeVentureId,
      contextLabel:
        mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name,
    }
  }, [activeVentureId, filters, issues, issuesViewMode, mode, roadmapItems, users, ventures])
}
