import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type {
  IssuePriority,
  IssueStatus,
  IssueType,
  RiskLevel,
} from "@/types/issue"
import {
  priorityLabels,
  riskLabels,
  statusLabels,
  typeLabels,
} from "@/features/issues/utils/issue-utils"

type BadgeProps = {
  className?: string
}

const statusClassName: Record<IssueStatus, string> = {
  backlog: "border-muted-foreground/40 text-muted-foreground",
  planned: "border-info/40 text-info",
  "in-progress": "border-info/50 text-info",
  "in-review": "border-warning/50 text-warning",
  done: "border-success/40 text-success",
  killed: "border-muted-foreground/40 text-muted-foreground",
}

const priorityClassName: Record<IssuePriority, string> = {
  urgent: "border-destructive/50 text-destructive",
  high: "border-warning/50 text-warning",
  medium: "border-info/40 text-info",
  low: "border-muted-foreground/40 text-muted-foreground",
}

const riskClassName: Record<RiskLevel, string> = {
  low: "border-success/40 text-success",
  medium: "border-warning/50 text-warning",
  high: "border-destructive/50 text-destructive",
}

export function IssueStatusBadge({
  status,
  className,
}: BadgeProps & { status: IssueStatus }) {
  return (
    <Badge variant="outline" className={cn(statusClassName[status], className)}>
      {statusLabels[status]}
    </Badge>
  )
}

export function IssuePriorityBadge({
  priority,
  className,
}: BadgeProps & { priority: IssuePriority }) {
  return (
    <Badge
      variant="outline"
      className={cn(priorityClassName[priority], className)}
    >
      {priorityLabels[priority]}
    </Badge>
  )
}

export function IssueTypeBadge({
  type,
  className,
}: BadgeProps & { type: IssueType }) {
  return (
    <Badge variant="outline" className={cn("border-border/60", className)}>
      {typeLabels[type]}
    </Badge>
  )
}

export function IssueRiskBadge({
  risk,
  className,
}: BadgeProps & { risk: RiskLevel }) {
  return (
    <Badge variant="outline" className={cn(riskClassName[risk], className)}>
      {riskLabels[risk]} risk
    </Badge>
  )
}
