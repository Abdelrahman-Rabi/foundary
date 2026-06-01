import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NextBestActionProps = {
  title: string
  description: string
  actionLabel: string
  icon: LucideIcon
  onAction: () => void
  className?: string
}

export function NextBestAction({
  title,
  description,
  actionLabel,
  icon: Icon,
  onAction,
  className,
}: NextBestActionProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border/60 bg-card/45 p-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/35 text-foreground">
          <Icon className="size-4" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        className="h-8 self-start border-border/60 bg-background/40 sm:self-center"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </section>
  )
}
