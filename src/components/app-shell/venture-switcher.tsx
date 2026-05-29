"use client"

import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useVentureStore } from "@/stores/venture-store"
import { cn } from "@/lib/utils"

type VentureSwitcherProps = {
  collapsed: boolean
}

function formatMeta(stage: string, health: string) {
  return `${stage} / ${health}`
}

export function VentureSwitcher({ collapsed }: VentureSwitcherProps) {
  const ventures = useVentureStore((state) => state.ventures)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const mode = useVentureStore((state) => state.mode)
  const setActiveVenture = useVentureStore((state) => state.setActiveVenture)
  const setPortfolioMode = useVentureStore((state) => state.setPortfolioMode)

  const activeVenture =
    ventures.find((venture) => venture.id === activeVentureId) ?? null
  const activeLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name
  const activeMeta =
    mode === "portfolio" || !activeVenture
      ? "All ventures"
      : formatMeta(activeVenture.stage, activeVenture.health)

  const trigger = (
    <button
      type="button"
      className={cn(
        "mx-3 flex h-11 items-center gap-3 rounded-lg border border-border/60 bg-card/45 px-3 text-left transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        collapsed && "mx-2 justify-center px-0"
      )}
      aria-label={`Switch venture context. Current context: ${activeLabel}`}
    >
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/50 text-[11px] font-semibold text-foreground"
        style={{
          color: activeVenture?.color,
        }}
      >
        {activeVenture?.icon ?? "F"}
      </span>
      <span className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
        <span className="block truncate text-sm font-medium text-foreground">
          {activeLabel}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {activeMeta}
        </span>
      </span>
      <ChevronDown
        className={cn("size-3.5 text-muted-foreground", collapsed && "hidden")}
        strokeWidth={1.8}
      />
    </button>
  )

  return (
    <DropdownMenu>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {activeLabel}
          </TooltipContent>
        </Tooltip>
      ) : (
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      )}
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel>Venture context</DropdownMenuLabel>
        <DropdownMenuItem onSelect={setPortfolioMode}>
          <span className="size-2 rounded-full bg-foreground/70" />
          <span className="flex min-w-0 flex-col">
            <span className="text-xs text-foreground">Portfolio</span>
            <span className="text-[11px] text-muted-foreground">
              All venture operations
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {ventures.map((venture) => (
          <DropdownMenuItem
            key={venture.id}
            onSelect={() => setActiveVenture(venture.id)}
          >
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: venture.color }}
            />
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-foreground">{venture.name}</span>
              <span className="text-[11px] text-muted-foreground">
                {formatMeta(venture.stage, venture.health)}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
