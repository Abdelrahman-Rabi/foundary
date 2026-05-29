type AiSignalEmptyStateProps = {
  title: string
  description?: string
}

export function AiSignalEmptyState({
  title,
  description,
}: AiSignalEmptyStateProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/35 p-3">
      <p className="text-sm text-muted-foreground">{title}</p>
      {description ? (
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
