import type { ReactNode } from "react"

type PageHeaderProps = {
  title: string
  description?: string
  eyebrow?: string
  action?: ReactNode
}

export function PageHeader({
  title,
  description,
  eyebrow,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-6 border-b border-border/60 pb-5">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-normal text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}
