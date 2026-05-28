"use client"

import { useEffect } from "react"

import { useUiStore } from "@/stores/ui-store"

export function useShellShortcuts() {
  const commandPaletteOpen = useUiStore((state) => state.commandPaletteOpen)
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen)
  const assistantPanelOpen = useUiStore((state) => state.assistantPanelOpen)
  const setCommandPaletteOpen = useUiStore(
    (state) => state.setCommandPaletteOpen
  )
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen)
  const setAssistantPanelOpen = useUiStore(
    (state) => state.setAssistantPanelOpen
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && !isEditableTarget(event.target)) {
        event.preventDefault()
        setCommandPaletteOpen(true)
        return
      }

      if (event.key !== "Escape") {
        return
      }

      if (commandPaletteOpen) {
        setCommandPaletteOpen(false)
        return
      }

      if (mobileNavOpen) {
        setMobileNavOpen(false)
        return
      }

      if (assistantPanelOpen) {
        setAssistantPanelOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    assistantPanelOpen,
    commandPaletteOpen,
    mobileNavOpen,
    setAssistantPanelOpen,
    setCommandPaletteOpen,
    setMobileNavOpen,
  ])
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']")
  )
}
