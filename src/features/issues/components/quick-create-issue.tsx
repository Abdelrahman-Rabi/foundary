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
  issuePriorities,
  issueTypes,
  priorityLabels,
  typeLabels,
} from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import type { IssuePriority, IssueType } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { User } from "@/types/user"
import type { Venture } from "@/types/venture"

type QuickCreateIssueProps = {
  open: boolean
  activeVentureId: string | null
  ventures: Venture[]
  users: User[]
  roadmapItems: RoadmapItem[]
  onClose: () => void
}

export function QuickCreateIssue({
  open,
  activeVentureId,
  ventures,
  users,
  roadmapItems,
  onClose,
}: QuickCreateIssueProps) {
  const createIssue = useIssueStore((state) => state.createIssue)
  const linkIssueToRoadmap = useRoadmapStore((state) => state.linkIssueToRoadmap)
  const [title, setTitle] = useState("")
  const [type, setType] = useState<IssueType>("feature")
  const [priority, setPriority] = useState<IssuePriority>("medium")
  const [ventureId, setVentureId] = useState(
    activeVentureId ?? ventures[0]?.id ?? ""
  )
  const [ownerId, setOwnerId] = useState(users[0]?.id ?? "")
  const [roadmapId, setRoadmapId] = useState("")

  if (!open) {
    return null
  }

  const ventureRoadmapItems = roadmapItems.filter(
    (item) => item.ventureId === ventureId
  )

  const selectedVenture = ventures.find((v) => v.id === ventureId)
  const selectedOwner = users.find((u) => u.id === ownerId)
  const selectedRoadmap = roadmapItems.find((r) => r.id === roadmapId)

  function handleCreateIssue() {
    if (!title.trim() || !ventureId || !ownerId) {
      return
    }

    const createdId = `issue-${ventureId.replace("venture-", "")}-${Date.now()}`
    createIssue({
      id: createdId,
      title: title.trim(),
      type,
      priority,
      ventureId,
      ownerId,
      roadmapId: roadmapId || undefined,
    })
    if (roadmapId) {
      linkIssueToRoadmap(roadmapId, createdId)
    }
    setTitle("")
    setType("feature")
    setPriority("medium")
    setVentureId(activeVentureId ?? ventures[0]?.id ?? "")
    setOwnerId(users[0]?.id ?? "")
    setRoadmapId("")
    onClose()
  }

  return (
    <section className="rounded-lg border border-border/70 bg-popover p-4 shadow-2xl shadow-background/45">

      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">Quick create</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Capture evidence with the minimum useful context.
          </p>
        </div>
        <Button variant="ghost" className="h-8" onClick={onClose}>
          Cancel
        </Button>
      </div>
      <div className="grid gap-3 xl:grid-cols-[1fr_140px_140px_160px_160px_180px_auto]">
        <Input
          autoFocus
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              handleCreateIssue()
            }
          }}
          placeholder="Evidence title..."
          className="h-8 border-border/60 bg-background/50"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{typeLabels[type]}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup value={type} onValueChange={(val) => setType(val as IssueType)}>
              {issueTypes.map((issueType) => (
                <DropdownMenuRadioItem key={issueType} value={issueType}>
                  {typeLabels[issueType]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{priorityLabels[priority]}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup value={priority} onValueChange={(val) => setPriority(val as IssuePriority)}>
              {issuePriorities.map((issuePriority) => (
                <DropdownMenuRadioItem key={issuePriority} value={issuePriority}>
                  {priorityLabels[issuePriority]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{selectedVenture?.name ?? "Select Venture"}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup
              value={ventureId}
              onValueChange={(val) => {
                setVentureId(val)
                setRoadmapId("")
              }}
            >
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{selectedRoadmap?.title ?? "No supported bet"}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60 overflow-y-auto">
            <DropdownMenuRadioGroup value={roadmapId} onValueChange={setRoadmapId}>
              <DropdownMenuRadioItem value="">No supported bet</DropdownMenuRadioItem>
              {ventureRoadmapItems.map((item) => (
                <DropdownMenuRadioItem key={item.id} value={item.id}>
                  {item.title}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="h-8" onClick={handleCreateIssue}>
          Add
        </Button>
      </div>
    </section>
  )
}
