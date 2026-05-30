"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  roadmapTimeframes,
  timeframeLabels,
} from "@/features/roadmap/utils/roadmap-utils"
import { useRoadmapStore } from "@/stores/roadmap-store"
import type { RoadmapTimeframe } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type QuickCreateRoadmapItemProps = {
  open: boolean
  activeVentureId: string | null
  ventures: Venture[]
  users: User[]
  onClose: () => void
  onCreated?: (roadmapId: string) => void
}

export function QuickCreateRoadmapItem({
  open,
  activeVentureId,
  ventures,
  users,
  onClose,
  onCreated,
}: QuickCreateRoadmapItemProps) {
  const createRoadmapItem = useRoadmapStore((state) => state.createRoadmapItem)
  const [title, setTitle] = useState("")
  const [goal, setGoal] = useState("")
  const [ventureId, setVentureId] = useState(
    activeVentureId ?? ventures[0]?.id ?? ""
  )
  const [timeframe, setTimeframe] = useState<RoadmapTimeframe>("now")
  const [ownerId, setOwnerId] = useState(users[0]?.id ?? "")
  const [confidence, setConfidence] = useState("70")

  if (!open) {
    return null
  }

  const selectedVenture = ventures.find((v) => v.id === ventureId)
  const selectedOwner = users.find((u) => u.id === ownerId)

  function handleCreate() {
    if (!title.trim() || !goal.trim() || !ventureId) {
      return
    }

    const item = createRoadmapItem({
      title: title.trim(),
      goal: goal.trim(),
      ventureId,
      timeframe,
      ownerId,
      confidence: Number(confidence) || 70,
    })
    setTitle("")
    setGoal("")
    setVentureId(activeVentureId ?? ventures[0]?.id ?? "")
    setTimeframe("now")
    setOwnerId(users[0]?.id ?? "")
    setConfidence("70")
    onCreated?.(item.id)
    onClose()
  }

  return (
    <section className="rounded-lg border border-border/70 bg-popover p-4 shadow-2xl shadow-background/45">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">New initiative</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Capture the outcome and minimum strategic context.
          </p>
        </div>
        <Button variant="ghost" className="h-8" onClick={onClose}>
          Cancel
        </Button>
      </div>
      <div className="grid gap-3 xl:grid-cols-[1fr_1.4fr_150px_130px_150px_120px_auto]">
        <Input
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Initiative title..."
          className="h-8 border-border/60 bg-background/50"
        />
        <Input
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              handleCreate()
            }
          }}
          placeholder="Strategic goal..."
          className="h-8 border-border/60 bg-background/50"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{selectedVenture?.name ?? "Select Venture"}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup value={ventureId} onValueChange={setVentureId}>
              {ventures.map((venture) => (
                <DropdownMenuRadioItem key={venture.id} value={venture.id}>
                  {venture.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{timeframeLabels[timeframe]}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup value={timeframe} onValueChange={(val) => setTimeframe(val as RoadmapTimeframe)}>
              {roadmapTimeframes.map((item) => (
                <DropdownMenuRadioItem key={item} value={item}>
                  {timeframeLabels[item]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{selectedOwner?.name ?? "Select Owner"}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup value={ownerId} onValueChange={setOwnerId}>
              {users.map((user) => (
                <DropdownMenuRadioItem key={user.id} value={user.id}>
                  {user.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          value={confidence}
          onChange={(event) => setConfidence(event.target.value)}
          inputMode="numeric"
          placeholder="70"
          className="h-8 border-border/60 bg-background/50"
        />
        <Button className="h-8" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </section>
  )
}
