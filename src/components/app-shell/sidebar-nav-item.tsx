"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  const item = (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-all duration-150 hover:bg-muted/50 hover:text-foreground active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 motion-reduce:transition-none motion-reduce:active:scale-100",
        active && "bg-muted text-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      {active ? (
        <span className="absolute inset-y-2 left-1 w-px rounded-full bg-foreground/45" />
      ) : null}
      <Icon className="size-4 shrink-0" strokeWidth={1.8} />
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
    </Link>
  )

  if (!collapsed) {
    return item
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{item}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
