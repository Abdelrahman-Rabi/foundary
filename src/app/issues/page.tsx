"use client"

import { PageContainer } from "@/components/layout/page-container"
import { users } from "@/data/users"
import { IssueBoard } from "@/features/issues/components/issue-board"
import { IssueList } from "@/features/issues/components/issue-list"
import { IssuesHeader } from "@/features/issues/components/issues-header"
import { IssuesToolbar } from "@/features/issues/components/issues-toolbar"
import { useIssuesData } from "@/features/issues/hooks/use-issues-data"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

export default function IssuesPage() {
  const openQuickCreateIssue = useUiStore((state) => state.openQuickCreateIssue)
  const ventures = useVentureStore((state) => state.ventures)
  const {
    visibleIssues,
    groupedIssues,
    roadmapItems,
    issuesViewMode,
    contextLabel,
  } = useIssuesData({ users, ventures })

  return (
    <PageContainer>
      <IssuesHeader
        contextLabel={contextLabel}
        visibleCount={visibleIssues.length}
        onOpenQuickCreate={openQuickCreateIssue}
      />
      <IssuesToolbar ventures={ventures} roadmapItems={roadmapItems} />

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
