import {
  BrainCircuit,
  LayoutDashboard,
  FlaskConical,
  GitGraph,
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
    label: "Command Center",
    description: "Studio decision surface",
    icon: LayoutDashboard,
    keywords: ["home", "portfolio", "command", "decisions", "overview", "dashboard"],
  },
  {
    href: "/issues",
    label: "Evidence",
    description: "Execution evidence",
    icon: FlaskConical,
    keywords: ["evidence", "issues", "tasks", "execution", "board", "list"],
  },
  {
    href: "/roadmap",
    label: "Bets",
    description: "Validation initiatives",
    icon: GitGraph,
    keywords: ["bets", "roadmap", "strategy", "initiatives", "validation", "now", "next", "later"],
  },
  {
    href: "/assistant",
    label: "Studio Analyst",
    description: "Source-linked recommendations",
    icon: BrainCircuit,
    keywords: ["analyst", "studio", "evidence", "risk", "recommendations", "assistant"],
  },
]

export function getRouteMetadata(pathname: string) {
  return (
    appRoutes.find(
      (route) => pathname === route.href || pathname.startsWith(`${route.href}/`)
    ) ?? appRoutes[0]
  )
}
