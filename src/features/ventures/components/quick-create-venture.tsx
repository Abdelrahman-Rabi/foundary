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
import { useVentureStore } from "@/stores/venture-store"
import type { VentureStage } from "@/types/venture"

type QuickCreateVentureProps = {
  open: boolean
  onClose: () => void
}

const stageLabels: Record<VentureStage, string> = {
  idea: "Idea",
  validation: "Validation",
  mvp: "MVP",
  growth: "Growth",
}

export function QuickCreateVenture({ open, onClose }: QuickCreateVentureProps) {
  const createVenture = useVentureStore((state) => state.createVenture)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [stage, setStage] = useState<VentureStage>("idea")
  const [error, setError] = useState<string | null>(null)

  if (!open) {
    return null
  }

  function handleCreate() {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError("Venture name is required")
      return
    }

    try {
      createVenture({
        name: trimmedName,
        description: description.trim(),
        stage,
      })
      setName("")
      setDescription("")
      setStage("idea")
      setError(null)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  return (
    <section className="rounded-lg border border-border/70 bg-popover p-4 shadow-2xl shadow-background/45">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium text-foreground">New Venture</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Create a new local venture context immediately.
          </p>
        </div>
        <Button variant="ghost" className="h-8 text-xs" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_2fr_160px_auto]">
        <div className="flex flex-col gap-1">
          <Input
            autoFocus
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (error) setError(null)
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                handleCreate()
              }
            }}
            placeholder="Venture name..."
            className="h-8 border-border/60 bg-background/50 text-xs"
          />
          {error && <span className="text-[10px] text-destructive pl-1">{error}</span>}
        </div>

        <Input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              handleCreate()
            }
          }}
          placeholder="Brief description..."
          className="h-8 border-border/60 bg-background/50 text-xs"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-background/50 px-2 text-xs font-normal text-foreground justify-between w-full select-none">
              <span className="truncate">{stageLabels[stage]}</span>
              <ChevronDown className="size-3.5 opacity-60 ml-1 shrink-0" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuRadioGroup value={stage} onValueChange={(val) => setStage(val as VentureStage)}>
              {(Object.keys(stageLabels) as VentureStage[]).map((key) => (
                <DropdownMenuRadioItem key={key} value={key} className="text-xs">
                  {stageLabels[key]}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="h-8 text-xs font-medium px-4" onClick={handleCreate}>
          Create Venture
        </Button>
      </div>
    </section>
  )
}
