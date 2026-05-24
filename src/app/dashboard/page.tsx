import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionShell } from "@/components/layout/section-shell"

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Portfolio overview"
        title="Dashboard"
        description="Strategic venture visibility will live here in Phase 3."
      />
      <SectionShell title="Foundation placeholder" meta="Phase 1">
        Dashboard intelligence, venture health, and risk panels are intentionally
        deferred until the dashboard phase.
      </SectionShell>
    </PageContainer>
  )
}
