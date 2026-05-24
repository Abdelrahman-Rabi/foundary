import type { ReactNode } from "react"

type SectionShellProps = {
  title: string
  meta?: string
  children: ReactNode
}

export function SectionShell({ title, meta, children }: SectionShellProps) {
  return (
    <section className="rounded-lg border border-border/60 bg-card/55 p-4 text-sm leading-6 text-muted-foreground shadow-none">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        {meta ? <span className="text-xs text-muted-foreground">{meta}</span> : null}
      </div>
      {children}
    </section>
  )
}
