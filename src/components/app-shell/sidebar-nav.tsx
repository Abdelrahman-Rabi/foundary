"use client"

import { LayoutDashboard, ListTodo, Map, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "@/components/app-shell/sidebar-nav-item"

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/issues",
    label: "Issues",
    icon: ListTodo,
  },
  {
    href: "/roadmap",
    label: "Roadmap",
    icon: Map,
  },
  {
    href: "/assistant",
    label: "AI Assistant",
    icon: Sparkles,
  },
]

type SidebarNavProps = {
  collapsed: boolean
}

export function SidebarNav({ collapsed }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-3" aria-label="Primary navigation">
      {navItems.map((item) => (
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
