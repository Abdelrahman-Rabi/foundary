"use client"

import { useMemo, useState } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { IssueBoard } from "@/features/issues/components/issue-board"
import { IssueList } from "@/features/issues/components/issue-list"
import { IssuesHeader } from "@/features/issues/components/issues-header"
import { IssuesToolbar } from "@/features/issues/components/issues-toolbar"
import { QuickCreateIssue } from "@/features/issues/components/quick-create-issue"
import { filterIssues, issueStatuses } from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"
import type { Issue, IssueStatus } from "@/types/issue"

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

export default function IssuesPage() {
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const issues = useIssueStore((state) => state.issues)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const filters = useIssueStore((state) => state.filters)
  const issuesViewMode = useUiStore((state) => state.issuesViewMode)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null
  const filteredIssues = useMemo(
    () => filterIssues(issues, filters),
    [filters, issues]
  )
  const visibleIssues = useMemo(() => {
    if (mode === "venture" && activeVentureId) {
      return filteredIssues.filter((issue) => issue.ventureId === activeVentureId)
    }

    return filteredIssues
  }, [activeVentureId, filteredIssues, mode])
  const groupedIssues = useMemo(() => groupIssues(visibleIssues), [visibleIssues])
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name

  return (
    <PageContainer>
      <IssuesHeader
        contextLabel={contextLabel}
        visibleCount={visibleIssues.length}
        onOpenQuickCreate={() => setQuickCreateOpen(true)}
      />
      <IssuesToolbar />
      <QuickCreateIssue
        open={quickCreateOpen}
        activeVentureId={mode === "venture" ? activeVentureId : null}
        ventures={ventures}
        users={users}
        onClose={() => setQuickCreateOpen(false)}
      />

      {issuesViewMode === "list" ? (
        <IssueList
          issues={visibleIssues}
          ventures={ventures}
          users={users}
          roadmapItems={roadmapItems}
        />
      ) : (
        <IssueBoard
          groupedIssues={groupedIssues}
          ventures={ventures}
          users={users}
          roadmapItems={roadmapItems}
        />
      )}
    </PageContainer>
  )
}
