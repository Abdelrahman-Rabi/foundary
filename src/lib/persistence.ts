"use client"

import type { Issue, IssueFilters } from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { RoadmapFilters } from "@/stores/roadmap-store"
import type { Venture } from "@/types/venture"

export const PERSISTENCE_VERSION = 1
export const PERSISTENCE_KEY = "foundary_workspace_state"

export interface WorkspaceState {
  version: number
  venture: {
    ventures?: Venture[]
    activeVentureId: string | null
    mode: "portfolio" | "venture"
  }
  issues: {
    issues: Issue[]
    filters?: IssueFilters
  }
  roadmap: {
    roadmapItems: RoadmapItem[]
    filters?: RoadmapFilters
  }
  assistant: {
    inspectedSignalIds: string[]
    dismissedSignalIds: string[]
  }
  preferences?: {
    issuesViewMode?: "list" | "board"
  }
}

/**
 * Validates and normalizes raw data into a safe WorkspaceState structure.
 * Throws an Error if validation fails and normalization is not possible.
 */
export function validateAndNormalizeState(raw: unknown): WorkspaceState {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid format: state must be a JSON object")
  }

  const rawState = raw as Record<string, unknown>

  // 1. Version Check
  const version = typeof rawState.version === "number" ? rawState.version : PERSISTENCE_VERSION

  // 2. Venture Store Validation
  const venture: {
    ventures?: Venture[]
    activeVentureId: string | null
    mode: "portfolio" | "venture"
  } = {
    activeVentureId: null,
    mode: "portfolio"
  }

  if (rawState.venture && typeof rawState.venture === "object") {
    const rawVenture = rawState.venture as Record<string, unknown>
    const hasVentures = Array.isArray(rawVenture.ventures)

    if (hasVentures) {
      const venturesArray: Venture[] = []
      for (const item of rawVenture.ventures as unknown[]) {
        if (!item || typeof item !== "object") {
          throw new Error("Invalid venture structure: venture item must be an object")
        }
        const ventItem = item as Record<string, unknown>
        if (
          typeof ventItem.id !== "string" ||
          typeof ventItem.name !== "string" ||
          typeof ventItem.slug !== "string" ||
          typeof ventItem.description !== "string" ||
          !["idea", "validation", "mvp", "growth"].includes(ventItem.stage as string) ||
          !["strong", "stable", "at-risk", "critical"].includes(ventItem.health as string) ||
          !["high", "moderate", "slow"].includes(ventItem.momentum as string) ||
          typeof ventItem.color !== "string" ||
          typeof ventItem.icon !== "string" ||
          typeof ventItem.activeRoadmapCount !== "number" ||
          typeof ventItem.activeIssueCount !== "number" ||
          typeof ventItem.overdueIssueCount !== "number" ||
          typeof ventItem.progress !== "number" ||
          typeof ventItem.confidence !== "number" ||
          typeof ventItem.createdAt !== "string" ||
          typeof ventItem.updatedAt !== "string"
        ) {
          throw new Error("Invalid venture data structure: missing or malformed required venture fields")
        }
        venturesArray.push(item as Venture)
      }
      venture.ventures = venturesArray

      if (typeof rawVenture.activeVentureId === "string" || rawVenture.activeVentureId === null) {
        const activeId = rawVenture.activeVentureId
        if (activeId === null || venturesArray.some(v => v.id === activeId)) {
          venture.activeVentureId = activeId
        } else {
          venture.activeVentureId = null
        }
      }
      if (rawVenture.mode === "portfolio" || rawVenture.mode === "venture") {
        if (rawVenture.mode === "venture" && venture.activeVentureId !== null) {
          venture.mode = "venture"
        } else {
          venture.mode = "portfolio"
          venture.activeVentureId = null
        }
      }
    } else {
      // Backward compatibility: rawVenture.ventures is absent
      if (typeof rawVenture.activeVentureId === "string" || rawVenture.activeVentureId === null) {
        venture.activeVentureId = rawVenture.activeVentureId
      }
      if (rawVenture.mode === "portfolio" || rawVenture.mode === "venture") {
        if (rawVenture.mode === "venture" && typeof venture.activeVentureId === "string") {
          venture.mode = "venture"
        } else {
          venture.mode = "portfolio"
          venture.activeVentureId = null
        }
      }
    }
  }


  // 3. Issues Validation
  const issuesArray: Issue[] = []
  let issueFilters: IssueFilters | undefined = undefined
  if (rawState.issues && typeof rawState.issues === "object") {
    const rawIssuesObj = rawState.issues as Record<string, unknown>
    if (Array.isArray(rawIssuesObj.issues)) {
      // Basic verification of issues structure
      for (const item of rawIssuesObj.issues) {
        if (!item || typeof item !== "object") continue
        const issueItem = item as Record<string, unknown>
        if (typeof issueItem.id !== "string" || typeof issueItem.title !== "string" || typeof issueItem.ventureId !== "string") {
          throw new Error("Invalid issue data structure: missing id, title, or ventureId")
        }
        issuesArray.push(item as Issue)
      }
    }
    if (rawIssuesObj.filters && typeof rawIssuesObj.filters === "object") {
      issueFilters = rawIssuesObj.filters as IssueFilters
    }
  } else if (rawState.issues !== undefined) {
    throw new Error("Invalid issues structure: issues field must contain an issues list")
  }

  // 4. Roadmap Validation
  const roadmapArray: RoadmapItem[] = []
  let roadmapFilters: RoadmapFilters | undefined = undefined
  if (rawState.roadmap && typeof rawState.roadmap === "object") {
    const rawRoadmapObj = rawState.roadmap as Record<string, unknown>
    if (Array.isArray(rawRoadmapObj.roadmapItems)) {
      // Basic verification of roadmap items
      for (const item of rawRoadmapObj.roadmapItems) {
        if (!item || typeof item !== "object") continue
        const roadmapItem = item as Record<string, unknown>
        if (typeof roadmapItem.id !== "string" || typeof roadmapItem.title !== "string" || typeof roadmapItem.ventureId !== "string" || typeof roadmapItem.timeframe !== "string") {
          throw new Error("Invalid roadmap item structure: missing id, title, ventureId, or timeframe")
        }
        roadmapArray.push(item as RoadmapItem)
      }
    }
    if (rawRoadmapObj.filters && typeof rawRoadmapObj.filters === "object") {
      roadmapFilters = rawRoadmapObj.filters as RoadmapFilters
    }
  } else if (rawState.roadmap !== undefined) {
    throw new Error("Invalid roadmap structure: roadmap field must contain a roadmapItems list")
  }

  // 5. Assistant Validation
  let inspectedSignalIds: string[] = []
  let dismissedSignalIds: string[] = []
  if (rawState.assistant && typeof rawState.assistant === "object") {
    const rawAssistant = rawState.assistant as Record<string, unknown>
    if (Array.isArray(rawAssistant.inspectedSignalIds)) {
      inspectedSignalIds = rawAssistant.inspectedSignalIds.filter((id): id is string => typeof id === "string")
    }
    if (Array.isArray(rawAssistant.dismissedSignalIds)) {
      dismissedSignalIds = rawAssistant.dismissedSignalIds.filter((id): id is string => typeof id === "string")
    }
  }

  // 6. Preferences/View mode validation
  let issuesViewMode: "list" | "board" | undefined = undefined
  if (rawState.preferences && typeof rawState.preferences === "object") {
    const rawPrefs = rawState.preferences as Record<string, unknown>
    if (rawPrefs.issuesViewMode === "list" || rawPrefs.issuesViewMode === "board") {
      issuesViewMode = rawPrefs.issuesViewMode
    }
  }

  return {
    version,
    venture,
    issues: {
      issues: issuesArray,
      filters: issueFilters,
    },
    roadmap: {
      roadmapItems: roadmapArray,
      filters: roadmapFilters,
    },
    assistant: {
      inspectedSignalIds,
      dismissedSignalIds,
    },
    preferences: {
      issuesViewMode,
    },
  }
}

/**
 * Saves the workspace state to localStorage.
 */
export function saveWorkspaceState(state: WorkspaceState): void {
  try {
    const serialized = JSON.stringify(state)
    window.localStorage.setItem(PERSISTENCE_KEY, serialized)
  } catch (err) {
    console.error("Failed to save workspace state to localStorage:", err)
  }
}

/**
 * Loads and validates the workspace state from localStorage.
 * Returns null if no state is found or validation fails.
 */
export function loadWorkspaceState(): WorkspaceState | null {
  try {
    const raw = window.localStorage.getItem(PERSISTENCE_KEY)
    if (!raw) return null
    
    const parsed = JSON.parse(raw)
    return validateAndNormalizeState(parsed)
  } catch (err) {
    console.error("Failed to load workspace state from localStorage:", err)
    return null
  }
}

/**
 * Clears the workspace state from localStorage.
 */
export function clearWorkspaceState(): void {
  try {
    window.localStorage.removeItem(PERSISTENCE_KEY)
  } catch (err) {
    console.error("Failed to clear workspace state from localStorage:", err)
  }
}

/**
 * Exports the workspace state by triggering a file download.
 */
export function exportWorkspaceState(state: WorkspaceState): void {
  try {
    const serialized = JSON.stringify(state, null, 2)
    const blob = new Blob([serialized], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `foundary-workspace-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error("Failed to export workspace state:", err)
  }
}
