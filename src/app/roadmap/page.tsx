import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionShell } from "@/components/layout/section-shell"

export default function RoadmapPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Strategic execution"
        title="Roadmap"
        description="Outcome-oriented roadmap coordination will be built in Phase 5."
      />
      <SectionShell title="Foundation placeholder" meta="Phase 1">
        Now, Next, and Later roadmap views are intentionally deferred until the
        roadmap phase.
      </SectionShell>
    </PageContainer>
  )
}
