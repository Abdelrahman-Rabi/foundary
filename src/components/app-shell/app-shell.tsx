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
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar />
          <div className="flex-1 overflow-y-auto">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
      <AppDrawer />
    </div>
  )
}
