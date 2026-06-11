"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, FilePlus2, GitBranchPlus, PanelRight, Search, Download, Upload, RefreshCw, Trash2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { appRoutes } from "@/components/app-shell/route-metadata"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { useUiStore } from "@/stores/ui-store"
import { useVentureStore } from "@/stores/venture-store"
import { useWorkspacePersistence } from "@/hooks/use-workspace-persistence"
import type { AppRoute } from "@/components/app-shell/route-metadata"

type CommandAction = {
  id: string
  label: string
  description: string
  keywords: string[]
  icon: AppRoute["icon"]
  run: () => void
}

export function CommandPalette() {
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const open = useUiStore((state) => state.commandPaletteOpen)
  const setOpen = useUiStore((state) => state.setCommandPaletteOpen)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const openQuickCreateIssue = useUiStore((state) => state.openQuickCreateIssue)
  const openQuickCreateRoadmap = useUiStore(
    (state) => state.openQuickCreateRoadmap
  )
  const openQuickCreateVenture = useUiStore((state) => state.openQuickCreateVenture)
  const assistantPanelOpen = useUiStore((state) => state.assistantPanelOpen)
  const setAssistantPanelOpen = useUiStore(
    (state) => state.setAssistantPanelOpen
  )
  const ventures = useVentureStore((state) => state.ventures)
  const setPortfolioMode = useVentureStore((state) => state.setPortfolioMode)
  const setActiveVenture = useVentureStore((state) => state.setActiveVenture)
  const { exportWorkspace, importWorkspace, resetWorkspace, clearWorkspace } = useWorkspacePersistence()


  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const actions = useMemo<CommandAction[]>(() => {
    const close = () => {
      setQuery("")
      setOpen(false)
    }
    const routeActions = appRoutes.map((route) => ({
      id: `route-${route.href}`,
      label: route.label,
      description: route.description,
      keywords: route.keywords,
      icon: route.icon,
      run: () => {
        router.push(route.href)
        close()
      },
    }))

    return [
      ...routeActions,
      {
        id: "create-issue",
        label: "Add Evidence",
        description: "Capture execution evidence in the active context.",
        keywords: ["create", "evidence", "execution"],
        icon: FilePlus2,
        run: () => {
          openQuickCreateIssue()
          close()
        },
      },
      {
        id: "create-roadmap",
        label: "Add Bet",
        description: "Capture a validation initiative or venture bet.",
        keywords: ["create", "bet", "roadmap", "initiative", "validation"],
        icon: GitBranchPlus,
        run: () => {
          openQuickCreateRoadmap()
          close()
        },
      },
      {
        id: "create-venture",
        label: "New Venture",
        description: "Create a new local venture context.",
        keywords: ["create", "venture", "startup"],
        icon: FilePlus2,
        run: () => {
          openQuickCreateVenture()
          close()
        },
      },
      {
        id: "open-assistant",
        label: "Inspect reasoning",
        description: "Open the Studio Analyst reasoning drawer.",
        keywords: ["analyst", "studio", "risk", "reasoning", "recommendation"],
        icon: Bot,
        run: () => {
          openDrawer({ type: "assistant" })
          close()
        },
      },
      {
        id: "toggle-assistant-panel",
        label: assistantPanelOpen ? "Hide Studio Analyst panel" : "Show Studio Analyst panel",
        description: "Toggle the ambient intelligence panel.",
        keywords: ["analyst", "studio", "panel", "insights"],
        icon: PanelRight,
        run: () => {
          setAssistantPanelOpen(!assistantPanelOpen)
          close()
        },
      },
      {
        id: "export-workspace",
        label: "Export Workspace State",
        description: "Download the current workspace execution state as JSON.",
        keywords: ["export", "save", "download", "backup"],
        icon: Download,
        run: () => {
          exportWorkspace()
          close()
        },
      },
      {
        id: "import-workspace",
        label: "Import Workspace State",
        description: "Upload a previously exported workspace JSON file.",
        keywords: ["import", "load", "upload", "restore"],
        icon: Upload,
        run: () => {
          const input = document.createElement("input")
          input.type = "file"
          input.accept = ".json"
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
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
          }
          input.click()
          close()
        },
      },
      {
        id: "reset-workspace",
        label: "Reset Demo Data",
        description: "Restore all ventures, issues, and roadmap to seeded mock data.",
        keywords: ["reset", "clear", "restore", "default", "clean"],
        icon: RefreshCw,
        run: () => {
          if (confirm("Are you sure you want to reset all workspace data to seeded mock defaults? This will erase all local modifications.")) {
            resetWorkspace()
          }
          close()
        },
      },
      {
        id: "clear-workspace",
        label: "Start Clean Platform",
        description: "Remove all demo data and start clean.",
        keywords: ["clear", "clean", "delete", "empty", "erase", "reset"],
        icon: Trash2,
        run: () => {
          if (confirm("Are you sure you want to remove all demo data and start clean? This will permanently delete all ventures, issues, and roadmap items.")) {
            clearWorkspace()
          }
          close()
        },
      },
      {
        id: "venture-portfolio",
        label: "Portfolio Context",
        description: "Show all venture operations.",
        keywords: ["venture", "portfolio", "all"],
        icon: PanelRight,
        run: () => {
          setPortfolioMode()
          close()
        },
      },
      ...ventures.map((venture) => ({
        id: `venture-${venture.id}`,
        label: venture.name,
        description: `${venture.stage} / ${venture.health}`,
        keywords: ["venture", venture.name, venture.stage, venture.health],
        icon: PanelRight,
        run: () => {
          setActiveVenture(venture.id)
          close()
        },
      })),
    ]
  }, [
    assistantPanelOpen,
    openDrawer,
    openQuickCreateIssue,
    openQuickCreateRoadmap,
    openQuickCreateVenture,
    router,
    setActiveVenture,
    setAssistantPanelOpen,
    setOpen,
    setPortfolioMode,
    ventures,
    exportWorkspace,
    importWorkspace,
    resetWorkspace,
    clearWorkspace,
  ])

  const filteredActions = actions.filter((action) => {
    const value = query.trim().toLowerCase()

    if (!value) {
      return true
    }

    return [action.label, action.description, ...action.keywords]
      .join(" ")
      .toLowerCase()
      .includes(value)
  })

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setQuery("")
    }
    setOpen(nextOpen)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="!inset-x-0 !top-0 h-auto !w-screen !max-w-none border-0 bg-transparent p-4 shadow-none data-[side=top]:!inset-x-0 data-[side=top]:!top-0"
      >
        <SheetTitle className="sr-only">Command palette</SheetTitle>
        <SheetDescription className="sr-only">
          Search routes, venture contexts, and quick actions.
        </SheetDescription>
        <div className="mx-auto w-[min(720px,calc(100vw-24px))] overflow-hidden rounded-xl border border-border/70 bg-popover shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border/60 px-3 py-3">
            <Search className="size-4 text-muted-foreground" strokeWidth={1.8} />
            <Input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search operations..."
              className="h-9 border-0 bg-transparent px-0 text-sm focus-visible:ring-0"
            />
            <span className="rounded border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              Esc
            </span>
          </div>
          <div className="max-h-[420px] overflow-y-auto p-2">
            {filteredActions.length > 0 ? (
              filteredActions.map((action) => {
                const Icon = action.icon
                const activeRoute =
                  action.id.startsWith("route-") &&
                  pathname === action.id.replace("route-", "")

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={action.run}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
                      <Icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">
                        {action.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    </span>
                    {activeRoute ? (
                      <span className="text-xs text-muted-foreground">
                        Current
                      </span>
                    ) : null}
                  </button>
                )
              })
            ) : (
              <div className="rounded-lg border border-border/50 bg-muted/20 p-3 text-sm text-muted-foreground">
                No matching operations.
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
