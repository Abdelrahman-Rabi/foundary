"use client"

import { PanelLeft, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

import { CommandTrigger } from "@/components/app-shell/command-trigger"
import { Button } from "@/components/ui/button"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

const routeLabels: Record<string, { label: string; description: string }> = {
  "/dashboard": {
    label: "Dashboard",
    description: "Portfolio operating context",
  },
  "/issues": {
    label: "Issues",
    description: "Execution workflow",
  },
  "/roadmap": {
    label: "Roadmap",
    description: "Strategic direction",
  },
  "/assistant": {
    label: "AI Assistant",
    description: "Operational intelligence",
  },
}

function getRouteLabel(pathname: string) {
  return routeLabels[pathname] ?? routeLabels["/dashboard"]
}

export function TopBar() {
  const pathname = usePathname()
  const route = getRouteLabel(pathname)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const ventures = useVentureStore((state) => state.ventures)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const mode = useVentureStore((state) => state.mode)
  const activeVenture = ventures.find((venture) => venture.id === activeVentureId)
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="hidden lg:inline-flex"
        >
          <PanelLeft className="size-4" strokeWidth={1.8} />
        </Button>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-foreground">
            {route.label}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {route.description} / {contextLabel}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <CommandTrigger />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => openDrawer({ type: "assistant" })}
          aria-label="Open assistant drawer"
        >
          <Sparkles className="size-4" strokeWidth={1.8} />
        </Button>
      </div>
    </header>
  )
}
