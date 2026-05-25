"use client"

import { ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import type { RoadmapStatus } from "@/types/roadmap"
import type { ConfidenceFilter } from "@/features/roadmap/utils/roadmap-utils"
import {
  roadmapStatuses,
  roadmapStatusLabels,
} from "@/features/roadmap/utils/roadmap-utils"

type RoadmapToolbarProps = {
  search: string
  status: RoadmapStatus | "all"
  confidence: ConfidenceFilter
  onSearchChange: (search: string) => void
  onStatusChange: (status: RoadmapStatus | "all") => void
  onConfidenceChange: (confidence: ConfidenceFilter) => void
}

const confidenceOptions: Array<{ value: ConfidenceFilter; label: string }> = [
  { value: "all", label: "All confidence" },
  { value: "strong", label: "Strong" },
  { value: "moderate", label: "Moderate" },
  { value: "uncertain", label: "Uncertain" },
  { value: "high-risk", label: "High risk" },
]

export function RoadmapToolbar({
  search,
  status,
  confidence,
  onSearchChange,
  onStatusChange,
  onConfidenceChange,
}: RoadmapToolbarProps) {
  const statusLabel =
    status === "all" ? "All status" : roadmapStatusLabels[status]
  const confidenceLabel =
    confidenceOptions.find((option) => option.value === confidence)?.label ??
    "All confidence"

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-card/45 p-3 md:flex-row md:items-center md:justify-between">
      <div className="relative min-w-0 flex-1 md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search initiatives"
          className="h-9 border-border/60 bg-background/40 pl-9 text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2">
              {statusLabel}
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onStatusChange("all")}>
              All status
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {roadmapStatuses.map((roadmapStatus) => (
              <DropdownMenuItem
                key={roadmapStatus}
                onClick={() => onStatusChange(roadmapStatus)}
              >
                {roadmapStatusLabels[roadmapStatus]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2">
              {confidenceLabel}
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>Confidence</DropdownMenuLabel>
            {confidenceOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onConfidenceChange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
