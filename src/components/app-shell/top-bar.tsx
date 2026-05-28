"use client"

import { Menu, PanelLeft, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

import { CommandTrigger } from "@/components/app-shell/command-trigger"
import { getRouteMetadata } from "@/components/app-shell/route-metadata"
import { Button } from "@/components/ui/button"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"

export function TopBar() {
  const pathname = usePathname()
  const route = getRouteMetadata(pathname)
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen)
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
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation"
          className="lg:hidden"
        >
          <Menu className="size-4" strokeWidth={1.8} />
        </Button>
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
