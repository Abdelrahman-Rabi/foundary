type AiIssueSummaryProps = {
  summary: string
  signalCount: number
}

export function AiIssueSummary({ summary, signalCount }: AiIssueSummaryProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-foreground">
          Analyst summary
        </h3>
        <span className="text-xs text-muted-foreground">
          {signalCount} signal{signalCount === 1 ? "" : "s"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{summary}</p>
    </div>
  )
}
