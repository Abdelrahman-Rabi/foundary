"use client"

import { Menu, PanelLeft, Sparkles, Database, Download, Upload, RefreshCw } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRef } from "react"

import { CommandTrigger } from "@/components/app-shell/command-trigger"
import { getRouteMetadata } from "@/components/app-shell/route-metadata"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWorkspacePersistence } from "@/hooks/use-workspace-persistence"
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

  const { exportWorkspace, importWorkspace, resetWorkspace } = useWorkspacePersistence()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        importWorkspace(parsed)
        alert("Workspace state imported successfully.")
      } catch (err) {
        alert("Import failed: " + (err instanceof Error ? err.message : "Invalid JSON format"))
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  const handleResetClick = () => {
    if (confirm("Are you sure you want to reset all workspace data to seeded mock defaults? This will erase all local modifications.")) {
      resetWorkspace()
    }
  }

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Workspace state options"
            >
              <Database className="size-4 text-muted-foreground hover:text-foreground" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuLabel className="font-semibold text-foreground">
              Local Workspace
            </DropdownMenuLabel>
            <div className="px-2 pb-2 text-[10px] text-muted-foreground/80">
              State stored in local storage
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exportWorkspace} className="gap-2">
              <Download className="size-3.5" />
              <span>Export Workspace</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleImportClick} className="gap-2">
              <Upload className="size-3.5" />
              <span>Import Workspace</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleResetClick}
              variant="destructive"
              className="gap-2 text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20"
            >
              <RefreshCw className="size-3.5 text-destructive" />
              <span>Reset Demo Data</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />

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
