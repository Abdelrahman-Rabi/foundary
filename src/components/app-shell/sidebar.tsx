"use client"

import { SidebarNav } from "@/components/app-shell/sidebar-nav"
import { VentureSwitcher } from "@/components/app-shell/venture-switcher"
import { useUiStore } from "@/stores/ui-store"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const collapsed = useUiStore((state) => state.sidebarCollapsed)

  return (
    <aside
      className={cn(
        "hidden min-h-screen shrink-0 border-r border-border/60 bg-background/95 transition-[width] duration-150 ease-out lg:flex lg:flex-col",
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
            Venture execution
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
          Mocked local data. No backend attached.
        </span>
        <span className={cn(!collapsed && "hidden")} aria-hidden="true">
          Local
        </span>
      </div>
    </aside>
  )
}
