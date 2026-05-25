import type { ReactNode } from "react"

type AssistantSectionProps = {
  title: string
  description: string
  meta?: string
  children: ReactNode
}

export function AssistantSection({
  title,
  description,
  meta,
  children,
}: AssistantSectionProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/50 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        {meta ? <span className="text-xs text-muted-foreground">{meta}</span> : null}
      </div>
      {children}
    </section>
  )
}
