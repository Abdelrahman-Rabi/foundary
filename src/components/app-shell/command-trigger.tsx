"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CommandTriggerProps = {
  className?: string
}

export function CommandTrigger({ className }: CommandTriggerProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "hidden h-8 w-56 justify-start gap-2 border-border/60 bg-card/40 px-2 text-muted-foreground hover:bg-muted/45 lg:inline-flex",
        className
      )}
      aria-label="Open command search"
    >
      <Search className="size-3.5" strokeWidth={1.8} />
      <span className="text-xs">Search operations</span>
      <span className="ml-auto rounded border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
        /
      </span>
    </Button>
  )
}
