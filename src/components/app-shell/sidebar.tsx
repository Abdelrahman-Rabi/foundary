"use client"

import { SidebarNav } from "@/components/app-shell/sidebar-nav"
import { VentureSwitcher } from "@/components/app-shell/venture-switcher"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed)
  const mode = useVentureStore((state) => state.mode)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const ventures = useVentureStore((state) => state.ventures)
  const activeVenture = ventures.find((venture) => venture.id === activeVentureId)
  const contextLabel =
    mode === "portfolio" || !activeVenture ? "Portfolio" : activeVenture.name

  return (
    <aside
      className={cn(
        "hidden h-full shrink-0 border-r border-border/60 bg-background/95 transition-[width] duration-150 ease-out lg:flex lg:flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center gap-2 px-4",
          collapsed && "justify-center px-0"
        )}
      >
        <div className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-card text-xs font-semibold text-foreground">
          F
        </div>
        <div className={cn("min-w-0", collapsed && "sr-only")}>
          <div className="truncate text-sm font-semibold text-foreground">
            Foundary
          </div>
          <div className="truncate text-[11px] text-muted-foreground">
            Studio operating intelligence
          </div>
        </div>
      </div>

      <div className="border-y border-border/50 py-3">
        <VentureSwitcher collapsed={collapsed} />
      </div>

      <div className="flex-1 py-3">
        <SidebarNav collapsed={collapsed} />
      </div>

      <div
        className={cn(
          "border-t border-border/50 p-4 text-xs leading-5 text-muted-foreground",
          collapsed && "px-2 text-center"
        )}
      >
        <span className={cn(collapsed && "sr-only")}>
          Demo workspace
          <span className="mt-1 block truncate text-[11px]">{contextLabel}</span>
        </span>
        <span className={cn(!collapsed && "hidden")} aria-hidden="true">
          Demo
        </span>
      </div>
    </aside>
  )
}
