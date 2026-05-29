"use client"

import { usePathname } from "next/navigation"

import { appRoutes } from "@/components/app-shell/route-metadata"
import { SidebarNavItem } from "@/components/app-shell/sidebar-nav-item"

type SidebarNavProps = {
  collapsed: boolean
}

export function SidebarNav({ collapsed }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-3" aria-label="Primary navigation">
      {appRoutes.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          collapsed={collapsed}
        />
      ))}
    </nav>
  )
}
