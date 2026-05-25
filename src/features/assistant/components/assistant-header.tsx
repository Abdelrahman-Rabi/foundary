import { PageHeader } from "@/components/layout/page-header"
import type { Venture } from "@/types/venture"

type AssistantHeaderProps = {
  mode: "portfolio" | "venture"
  activeVenture: Venture | null
}

export function AssistantHeader({ mode, activeVenture }: AssistantHeaderProps) {
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name

  return (
    <PageHeader
      eyebrow={`${contextLabel} / Operational intelligence`}
      title="AI Assistant"
      description="Contextual execution analysis, risk signals, and strategic recommendations derived from current venture work."
    />
  )
}
