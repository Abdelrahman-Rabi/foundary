import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type KpiCardProps = {
  label: string
  value: number
  helper: string
  icon: LucideIcon
  tone: "neutral" | "warning" | "success" | "muted"
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
}: KpiCardProps) {
  return (
    <Card className="border-border/60 bg-card/60 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
              {value}
            </p>
          </div>
          <div className="rounded-md border border-border/60 bg-muted/30 p-2">
            <Icon className={cn("size-4", toneClassName[tone])} strokeWidth={1.8} />
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  )
}
