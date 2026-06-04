import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ExecutionEvidenceSummary as EvidenceSummaryType } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface Props {
  summary: EvidenceSummaryType | null
  onOpenIssue?: (issueId: string) => void
}

const ROLE_LABELS: Record<string, string> = {
  prove: "Proving",
  disprove: "Challenging",
  unblock: "Unblocking",
  "de-risk": "De-risking",
  "capacity-cost": "Capacity cost",
}

const ROLE_COLORS: Record<string, string> = {
  prove: "bg-success/10 text-success border-success/30",
  disprove: "bg-destructive/10 text-destructive border-destructive/30",
  unblock: "bg-info/10 text-info border-info/30",
  "de-risk": "bg-warning/10 text-warning border-warning/30",
  "capacity-cost": "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30",
}

const ISSUE_STATUS_COLOR: Record<string, string> = {
  done: "bg-success",
  "in-progress": "bg-info",
  "in-review": "bg-warning",
  planned: "bg-muted-foreground",
  backlog: "bg-muted-foreground",
}

export function ExecutionEvidenceSummary({ summary, onOpenIssue }: Props) {
  if (!summary) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5 mb-4">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Execution evidence
        </h3>
        <div className="py-6 text-center text-xs text-muted-foreground">
          No execution evidence linked yet.
        </div>
      </div>
    )
  }

  const { evidenceRoleCounts, recentEvidenceIssues } = summary

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Execution evidence
        </h3>
        <p className="text-xs text-muted-foreground">
          Active tasks proving or disproving assumptions.
        </p>
      </div>

      {/* Role Counts grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(evidenceRoleCounts).map(([role, count]) => (
          <div key={role} className="flex flex-col items-center justify-center p-2 rounded-lg border border-border bg-muted/20">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">{ROLE_LABELS[role] || role}</span>
            <span className="text-sm font-bold text-foreground mt-1">{count}</span>
          </div>
        ))}
      </div>

      {/* Recent evidence list */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
          Recent Evidence Work
        </span>
        {recentEvidenceIssues.length === 0 ? (
          <div className="text-[11px] text-muted-foreground py-2">
            No active evidence tasks in execution.
          </div>
        ) : (
          recentEvidenceIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => onOpenIssue?.(issue.id)}
              className="flex items-start justify-between gap-3 p-2.5 rounded border border-border hover:bg-muted/20 transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <span className="text-xs font-medium text-foreground line-clamp-1">
                  {issue.title}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={cn("h-1.5 w-1.5 rounded-full", ISSUE_STATUS_COLOR[issue.status])} />
                  <span className="text-[10px] text-muted-foreground capitalize">{issue.status}</span>
                </div>
              </div>

              {issue.evidenceRole && (
                <Badge variant="outline" className={cn("text-[9px] h-4 py-0", ROLE_COLORS[issue.evidenceRole])}>
                  {ROLE_LABELS[issue.evidenceRole]}
                </Badge>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
