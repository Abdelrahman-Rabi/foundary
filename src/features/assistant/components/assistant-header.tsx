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
      eyebrow={`${contextLabel} / Studio Analyst`}
      title="Studio Analyst"
      description="Source-linked recommendations for studio moves, evidence gaps, validation confidence, and operator capacity tradeoffs."
    />
  )
}
