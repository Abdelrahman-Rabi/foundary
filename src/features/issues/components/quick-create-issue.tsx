"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  issuePriorities,
  issueTypes,
  priorityLabels,
  typeLabels,
} from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
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

  function handleCreateIssue() {
    if (!title.trim() || !ventureId || !ownerId) {
      return
    }

    createIssue({
      title: title.trim(),
      type,
      priority,
      ventureId,
      ownerId,
      roadmapId: roadmapId || undefined,
    })
    setTitle("")
    setType("feature")
    setPriority("medium")
    setVentureId(activeVentureId ?? ventures[0]?.id ?? "")
    setOwnerId(users[0]?.id ?? "")
    setRoadmapId("")
    onClose()
  }

  return (
    <section className="rounded-lg border border-border/60 bg-card/55 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">Quick create</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Capture execution work with the minimum useful context.
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
          placeholder="Issue title..."
          className="h-8 border-border/60 bg-background/50"
        />
        <select
          value={type}
          onChange={(event) => setType(event.target.value as IssueType)}
          className="h-8 rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
        >
          {issueTypes.map((issueType) => (
            <option key={issueType} value={issueType}>
              {typeLabels[issueType]}
            </option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as IssuePriority)}
          className="h-8 rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
        >
          {issuePriorities.map((issuePriority) => (
            <option key={issuePriority} value={issuePriority}>
              {priorityLabels[issuePriority]}
            </option>
          ))}
        </select>
        <select
          value={ventureId}
          onChange={(event) => {
            setVentureId(event.target.value)
            setRoadmapId("")
          }}
          className="h-8 rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
        >
          {ventures.map((venture) => (
            <option key={venture.id} value={venture.id}>
              {venture.name}
            </option>
          ))}
        </select>
        <select
          value={ownerId}
          onChange={(event) => setOwnerId(event.target.value)}
          className="h-8 rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select
          value={roadmapId}
          onChange={(event) => setRoadmapId(event.target.value)}
          className="h-8 rounded-md border border-border/60 bg-background/50 px-2 text-xs text-foreground"
        >
          <option value="">No roadmap link</option>
          {ventureRoadmapItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <Button className="h-8" onClick={handleCreateIssue}>
          Create
        </Button>
      </div>
    </section>
  )
}
