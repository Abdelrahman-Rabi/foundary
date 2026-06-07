import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ExecutionEvidenceSummary as EvidenceSummaryType } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface Props {
  summary: EvidenceSummaryType | null
  onOpenIssue?: (issueId: string) => void
  onOpenRoadmap?: (roadmapId: string) => void
}

const ROLE_LABELS: Record<string, string> = {
  prove: "Proving",
  disprove: "Challenging",
  unblock: "Unblocking",
  "de-risk": "De-risking",
  "capacity-cost": "Capacity cost",
}

export function ExecutionEvidenceSummary({ summary, onOpenIssue, onOpenRoadmap }: Props) {
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

  const { evidenceRoleCounts, recentEvidenceIssues, recentEvidenceRoadmapItems = [] } = summary

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
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {Object.entries(evidenceRoleCounts).map(([role, count]) => (
          <div key={role} className="flex flex-col items-center justify-center p-1.5 rounded border border-border bg-muted/10">
            <span className="text-[8px] text-muted-foreground uppercase tracking-normal text-center truncate w-full" title={ROLE_LABELS[role] || role}>
              {role === "capacity-cost" ? "Cost" : role === "de-risk" ? "De-risk" : ROLE_LABELS[role] || role}
            </span>
            <span className="text-xs font-bold text-foreground mt-0.5">{count}</span>
          </div>
        ))}
      </div>

      {/* Compact Source Stack */}
      <div className="space-y-3">
        {/* Source Issues */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Source issues
          </span>
          {recentEvidenceIssues.length === 0 ? (
            <div className="text-[11px] text-muted-foreground py-1">
              No active evidence tasks in execution.
            </div>
          ) : (
            <div className="space-y-1">
              {recentEvidenceIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => onOpenIssue?.(issue.id)}
                  className="flex items-center justify-between gap-2 p-2 rounded border border-border bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer text-xs"
                >
                  <span className="font-medium text-foreground line-clamp-1 flex-1">
                    {issue.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {issue.evidenceRole && (
                      <Badge variant="outline" className={cn("text-[8px] py-0 px-1 font-mono uppercase h-4 font-bold", 
                        issue.evidenceRole === "prove" ? "bg-success/5 text-success border-success/20" :
                        issue.evidenceRole === "disprove" ? "bg-destructive/5 text-destructive border-destructive/20" :
                        issue.evidenceRole === "unblock" ? "bg-info/5 text-info border-info/20" :
                        issue.evidenceRole === "de-risk" ? "bg-warning/5 text-warning border-warning/20" :
                        "bg-muted-foreground/5 text-muted-foreground border-muted-foreground/20"
                      )}>
                        {issue.evidenceRole === "prove" ? "proving" :
                         issue.evidenceRole === "disprove" ? "challenging" :
                         issue.evidenceRole === "unblock" ? "unblocking" :
                         issue.evidenceRole === "de-risk" ? "de-risking" :
                         "cost"}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Source Bets */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Source venture bets
          </span>
          {recentEvidenceRoadmapItems.length === 0 ? (
            <div className="text-[11px] text-muted-foreground py-1">
              No active strategic bets linked.
            </div>
          ) : (
            <div className="space-y-1">
              {recentEvidenceRoadmapItems.map((bet) => (
                <div
                  key={bet.id}
                  onClick={() => onOpenRoadmap?.(bet.id)}
                  className="flex items-center justify-between gap-2 p-2 rounded border border-border bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer text-xs"
                >
                  <span className="font-medium text-foreground line-clamp-1 flex-1">
                    {bet.title}
                  </span>
                  {bet.betType && (
                    <Badge variant="outline" className="text-[8px] py-0 px-1 font-mono uppercase h-4 shrink-0 bg-muted/10 border-border">
                      {bet.betType.replace("-", " ")}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
