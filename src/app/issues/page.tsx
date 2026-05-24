import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionShell } from "@/components/layout/section-shell"

export default function IssuesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Execution layer"
        title="Issues"
        description="Operational issue workflows will be implemented after the dashboard phase."
      />
      <SectionShell title="Foundation placeholder" meta="Phase 1">
        List, board, drawer, filters, and quick-create workflows are out of
        scope for this foundation pass.
      </SectionShell>
    </PageContainer>
  )
}
