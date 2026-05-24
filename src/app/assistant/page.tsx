import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { SectionShell } from "@/components/layout/section-shell"

export default function AssistantPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Operational intelligence"
        title="AI Assistant"
        description="Embedded AI insight surfaces will be implemented after core execution views."
      />
      <SectionShell title="Foundation placeholder" meta="Phase 1">
        Structured insight cards and risk recommendations are out of scope for
        this foundation pass.
      </SectionShell>
    </PageContainer>
  )
}
