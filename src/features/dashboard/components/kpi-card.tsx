import type { LucideIcon } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type KpiCardProps = {
  label: string
  value: number
  helper: string
  icon: LucideIcon
  tone: "neutral" | "warning" | "success" | "muted"
  onSelect?: () => void
}

const toneClassName = {
  neutral: "text-info",
  warning: "text-warning",
  success: "text-success",
  muted: "text-muted-foreground",
}

export function KpiCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
  onSelect,
}: KpiCardProps) {
  const content = (
    <span className="block p-4 text-left">
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-xs text-muted-foreground">{label}</span>
          <span className="mt-2 block text-2xl font-semibold tracking-normal text-foreground">
            {value}
          </span>
        </span>
        <span className="rounded-md border border-border/60 bg-muted/30 p-2">
          <Icon className={cn("size-4", toneClassName[tone])} strokeWidth={1.8} />
        </span>
      </span>
      <span className="mt-3 block text-xs leading-5 text-muted-foreground">
        {helper}
      </span>
    </span>
  )

  return (
    <Card
      className={cn(
        "border-border/60 bg-card/60 shadow-none",
        onSelect &&
          "transition-colors hover:border-border hover:bg-card/80 focus-within:border-border"
      )}
    >
      {onSelect ? (
        <button
          type="button"
          className="block w-full rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          onClick={onSelect}
        >
          {content}
        </button>
      ) : (
        content
      )}
    </Card>
  )
}
