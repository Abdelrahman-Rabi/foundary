"use client"

import { useState } from "react"

import { PageContainer } from "@/components/layout/page-container"
import { users } from "@/data/users"
import { ventures } from "@/data/ventures"
import { IssueBoard } from "@/features/issues/components/issue-board"
import { IssueList } from "@/features/issues/components/issue-list"
import { IssuesHeader } from "@/features/issues/components/issues-header"
import { IssuesToolbar } from "@/features/issues/components/issues-toolbar"
import { QuickCreateIssue } from "@/features/issues/components/quick-create-issue"
import { useIssuesData } from "@/features/issues/hooks/use-issues-data"

export default function IssuesPage() {
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const {
    visibleIssues,
    groupedIssues,
    roadmapItems,
    issuesViewMode,
    mode,
    activeVentureId,
    contextLabel,
  } = useIssuesData({ users, ventures })

  return (
    <PageContainer>
      <IssuesHeader
        contextLabel={contextLabel}
        visibleCount={visibleIssues.length}
        onOpenQuickCreate={() => setQuickCreateOpen(true)}
      />
      <IssuesToolbar ventures={ventures} />
      <QuickCreateIssue
        key={quickCreateOpen ? activeVentureId ?? "portfolio" : "closed"}
        open={quickCreateOpen}
        activeVentureId={mode === "venture" ? activeVentureId : null}
        ventures={ventures}
        users={users}
        roadmapItems={roadmapItems}
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
