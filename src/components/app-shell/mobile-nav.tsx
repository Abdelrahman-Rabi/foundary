"use client"

import { Bot } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { appRoutes } from "@/components/app-shell/route-metadata"
import { VentureSwitcher } from "@/components/app-shell/venture-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { useUiStore } from "@/stores/ui-store"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const router = useRouter()
  const pathname = usePathname()
  const open = useUiStore((state) => state.mobileNavOpen)
  const setOpen = useUiStore((state) => state.setMobileNavOpen)
  const openDrawer = useUiStore((state) => state.openDrawer)
  const setCommandPaletteOpen = useUiStore(
    (state) => state.setCommandPaletteOpen
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-[min(360px,calc(100vw-32px))] border-border/70 bg-popover p-0 sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Primary navigation and venture context controls.
        </SheetDescription>
        <div className="flex h-14 items-center gap-2 border-b border-border/60 px-4">
          <div className="flex size-7 items-center justify-center rounded-lg border border-border/70 bg-card text-xs font-semibold text-foreground">
            F
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Foundary</p>
            <p className="text-[11px] text-muted-foreground">Demo workspace</p>
          </div>
        </div>
        <div className="border-b border-border/60 py-3">
          <VentureSwitcher collapsed={false} />
        </div>
        <div className="border-b border-border/60 p-3">
          <Button
            type="button"
            variant="outline"
            className="h-9 w-full justify-start text-muted-foreground"
            onClick={() => {
              setCommandPaletteOpen(true)
              setOpen(false)
            }}
          >
            Search operations
            <span className="ml-auto rounded border border-border/60 px-1.5 py-0.5 text-[10px]">
              /
            </span>
          </Button>
        </div>
        <nav className="space-y-1 p-3" aria-label="Mobile navigation">
          {appRoutes.map((route) => {
            const Icon = route.icon
            const active =
              pathname === route.href || pathname.startsWith(`${route.href}/`)

            return (
              <Button
                key={route.href}
                type="button"
                variant="ghost"
                aria-current={active ? "page" : undefined}
                className={cn(
                  "h-9 w-full justify-start gap-2 px-3 text-muted-foreground",
                  active && "bg-muted text-foreground"
                )}
                onClick={() => {
                  router.push(route.href)
                  setOpen(false)
                }}
              >
                <Icon className="size-4" strokeWidth={1.8} />
                {route.label}
              </Button>
            )
          })}
        </nav>
        <div className="mt-auto border-t border-border/60 p-3">
          <Button
            type="button"
            variant="ghost"
            className="h-9 w-full justify-start gap-2"
            onClick={() => {
              openDrawer({ type: "assistant" })
              setOpen(false)
            }}
          >
            <Bot className="size-4" strokeWidth={1.8} />
            Open assistant signal
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
