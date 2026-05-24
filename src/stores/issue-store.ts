"use client"

import { create } from "zustand"

import { issues as initialIssues } from "@/data/issues"
import type { Issue, IssueFilters, IssueStatus } from "@/types/issue"

const defaultFilters: IssueFilters = {
  ventureIds: [],
  priorities: [],
  statuses: [],
  types: [],
  ownerIds: [],
  search: "",
}

type IssueStore = {
  issues: Issue[]
  filters: IssueFilters
  setIssues: (issues: Issue[]) => void
  setSearch: (search: string) => void
  setFilters: (filters: Partial<IssueFilters>) => void
  resetFilters: () => void
  updateIssueStatus: (issueId: string, status: IssueStatus) => void
  getIssuesByVenture: (ventureId: string) => Issue[]
  getFilteredIssues: () => Issue[]
}

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: initialIssues,
  filters: defaultFilters,
  setIssues: (issues) => set({ issues }),
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
  updateIssueStatus: (issueId, status) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, status, updatedAt: new Date().toISOString() }
          : issue
      ),
    })),
  getIssuesByVenture: (ventureId) =>
    get().issues.filter((issue) => issue.ventureId === ventureId),
  getFilteredIssues: () => {
    const { issues, filters } = get()
    const search = filters.search.trim().toLowerCase()

    return issues.filter((issue) => {
      const matchesSearch =
        search.length === 0 ||
        issue.title.toLowerCase().includes(search) ||
        issue.tags.some((tag) => tag.toLowerCase().includes(search))

      return (
        matchesSearch &&
        (filters.ventureIds.length === 0 ||
          filters.ventureIds.includes(issue.ventureId)) &&
        (filters.priorities.length === 0 ||
          filters.priorities.includes(issue.priority)) &&
        (filters.statuses.length === 0 ||
          filters.statuses.includes(issue.status)) &&
        (filters.types.length === 0 || filters.types.includes(issue.type)) &&
        (filters.ownerIds.length === 0 ||
          filters.ownerIds.includes(issue.ownerId))
      )
    })
  },
}))
