import {
  BrainCircuit,
  LayoutDashboard,
  ListTodo,
  Map,
  type LucideIcon,
} from "lucide-react"

export type AppRoute = {
  href: "/dashboard" | "/issues" | "/roadmap" | "/assistant"
  label: string
  description: string
  icon: LucideIcon
  keywords: string[]
}

export const appRoutes: AppRoute[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Portfolio operating context",
    icon: LayoutDashboard,
    keywords: ["home", "portfolio", "metrics", "overview"],
  },
  {
    href: "/issues",
    label: "Issues",
    description: "Execution workflow",
    icon: ListTodo,
    keywords: ["tasks", "execution", "board", "list"],
  },
  {
    href: "/roadmap",
    label: "Roadmap",
    description: "Strategic direction",
    icon: Map,
    keywords: ["strategy", "initiatives", "now", "next", "later"],
  },
  {
    href: "/assistant",
    label: "Studio Analyst",
    description: "Source-linked recommendations",
    icon: BrainCircuit,
    keywords: ["analyst", "studio", "evidence", "risk", "recommendations"],
  },
]

export function getRouteMetadata(pathname: string) {
  return (
    appRoutes.find(
      (route) => pathname === route.href || pathname.startsWith(`${route.href}/`)
    ) ?? appRoutes[0]
  )
}
