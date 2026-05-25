"use client"

import type { ReactNode } from "react"

import { AppDrawer } from "@/components/app-shell/app-drawer"
import { PageTransition } from "@/components/layout/page-transition"
import { Sidebar } from "@/components/app-shell/sidebar"
import { TopBar } from "@/components/app-shell/top-bar"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-background text-foreground">
      <div className="flex h-full min-h-0">
        <Sidebar />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar />
          <div className="min-h-0 flex-1 overflow-y-auto">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
      <AppDrawer />
    </div>
  )
}
