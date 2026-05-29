"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import {
  PERSISTENCE_VERSION,
  clearWorkspaceState,
  exportWorkspaceState,
  loadWorkspaceState,
  saveWorkspaceState,
  validateAndNormalizeState,
} from "@/lib/persistence"
import { useAssistantStore } from "@/stores/assistant-store"
import { useIssueStore } from "@/stores/issue-store"
import { useRoadmapStore } from "@/stores/roadmap-store"
import { useVentureStore } from "@/stores/venture-store"
import { useUiStore } from "@/stores/ui-store"

let hasHydratedGlobally = false

export function useWorkspacePersistence() {
  const [isHydrated, setIsHydrated] = useState(false)
  const isHydratedRef = useRef(false)

  // Select store states
  const issues = useIssueStore((state) => state.issues)
  const issueFilters = useIssueStore((state) => state.filters)
  const roadmapItems = useRoadmapStore((state) => state.roadmapItems)
  const roadmapFilters = useRoadmapStore((state) => state.filters)
  const activeVentureId = useVentureStore((state) => state.activeVentureId)
  const mode = useVentureStore((state) => state.mode)
  const inspectedSignalIds = useAssistantStore((state) => state.inspectedSignalIds)
  const dismissedSignalIds = useAssistantStore((state) => state.dismissedSignalIds)
  const issuesViewMode = useUiStore((state) => state.issuesViewMode)

  // 1. Initial hydration on mount
  useEffect(() => {
    if (hasHydratedGlobally) {
      setTimeout(() => {
        setIsHydrated(true)
      }, 0)
      isHydratedRef.current = true
      return
    }

    const state = loadWorkspaceState()
    if (state) {
      try {
        useVentureStore.getState().hydrate(state.venture)
        useIssueStore.getState().hydrate(state.issues)
        useRoadmapStore.getState().hydrate(state.roadmap)
        useAssistantStore.getState().hydrate(state.assistant)
        if (state.preferences) {
          useUiStore.getState().hydrate(state.preferences)
        }
      } catch (err) {
        console.error("Error during initial workspace state hydration:", err)
      }
    }
    hasHydratedGlobally = true
    setTimeout(() => {
      setIsHydrated(true)
    }, 0)
    isHydratedRef.current = true
  }, [])

  // 2. Automatically save state on changes (only after hydration is complete)
  useEffect(() => {
    if (!isHydrated) return

    saveWorkspaceState({
      version: PERSISTENCE_VERSION,
      venture: { activeVentureId, mode },
      issues: { issues, filters: issueFilters },
      roadmap: { roadmapItems, filters: roadmapFilters },
      assistant: { inspectedSignalIds, dismissedSignalIds },
      preferences: { issuesViewMode },
    })
  }, [isHydrated, issues, issueFilters, roadmapItems, roadmapFilters, activeVentureId, mode, inspectedSignalIds, dismissedSignalIds, issuesViewMode])

  // 3. Reset Workspace
  const resetWorkspace = useCallback(() => {
    // Clear localStorage
    clearWorkspaceState()
    // Reset all stores to mock data/defaults
    useVentureStore.getState().reset()
    useIssueStore.getState().reset()
    useRoadmapStore.getState().reset()
    useAssistantStore.getState().reset()
    useUiStore.getState().reset()
  }, [])

  // 4. Export Workspace
  const exportWorkspace = useCallback(() => {
    const state = {
      version: PERSISTENCE_VERSION,
      venture: { activeVentureId, mode },
      issues: { issues, filters: issueFilters },
      roadmap: { roadmapItems, filters: roadmapFilters },
      assistant: { inspectedSignalIds, dismissedSignalIds },
      preferences: { issuesViewMode },
    }
    exportWorkspaceState(state)
  }, [activeVentureId, mode, issues, issueFilters, roadmapItems, roadmapFilters, inspectedSignalIds, dismissedSignalIds, issuesViewMode])

  // 5. Import Workspace
  const importWorkspace = useCallback((rawState: unknown) => {
    // validateAndNormalizeState throws if invalid
    const validated = validateAndNormalizeState(rawState)

    // Hydrate stores (disable autosave during hydration if needed, but since we are updating React state it takes effect in next render cycle)
    useVentureStore.getState().hydrate(validated.venture)
    useIssueStore.getState().hydrate(validated.issues)
    useRoadmapStore.getState().hydrate(validated.roadmap)
    useAssistantStore.getState().hydrate(validated.assistant)
    if (validated.preferences) {
      useUiStore.getState().hydrate(validated.preferences)
    }

    // Save to localStorage directly
    saveWorkspaceState(validated)
  }, [])

  return {
    isHydrated,
    resetWorkspace,
    exportWorkspace,
    importWorkspace,
  }
}
