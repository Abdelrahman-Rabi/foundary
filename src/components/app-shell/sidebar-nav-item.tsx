"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type SidebarNavItemProps = {
  href: string
  label: string
  icon: LucideIcon
  active: boolean
  collapsed: boolean
}

export function SidebarNavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={cn(
        "flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        active && "bg-muted text-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.8} />
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
    </Link>
  )
}
