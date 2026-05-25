"use client"

import { create } from "zustand"

import { issues as initialIssues } from "@/data/issues"
import type {
  Issue,
  IssueFilters,
  IssuePriority,
  IssueSortBy,
  IssueStatus,
  IssueType,
  SortDirection,
} from "@/types/issue"

const defaultFilters: IssueFilters = {
  ventureIds: [],
  priorities: [],
  statuses: [],
  types: [],
  ownerIds: [],
  search: "",
  overdueOnly: false,
  roadmapLinkedOnly: false,
  sortBy: "priority",
  sortDirection: "desc",
}

type IssueStore = {
  issues: Issue[]
  filters: IssueFilters
  setIssues: (issues: Issue[]) => void
  createIssue: (input: CreateIssueInput) => void
  updateIssue: (issueId: string, updates: Partial<Issue>) => void
  setSearch: (search: string) => void
  setFilters: (filters: Partial<IssueFilters>) => void
  setSorting: (sortBy: IssueSortBy, sortDirection: SortDirection) => void
  resetFilters: () => void
  updateIssueStatus: (issueId: string, status: IssueStatus) => void
  getIssuesByVenture: (ventureId: string) => Issue[]
}

type CreateIssueInput = {
  title: string
  ventureId: string
  type: IssueType
  priority: IssuePriority
  ownerId: string
  roadmapId?: string
}

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: initialIssues,
  filters: defaultFilters,
  setIssues: (issues) => set({ issues }),
  createIssue: (input) =>
    set((state) => {
      const now = new Date().toISOString()
      const issue: Issue = {
        id: `issue-${input.ventureId.replace("venture-", "")}-${Date.now()}`,
        ventureId: input.ventureId,
        roadmapId: input.roadmapId,
        title: input.title,
        description: "New execution work captured from quick create.",
        type: input.type,
        priority: input.priority,
        status: "backlog",
        ownerId: input.ownerId,
        tags: [],
        riskLevel: "low",
        confidence: 72,
        effort: "medium",
        blocked: false,
        acceptanceCriteria: [],
        aiInsightIds: [],
        createdAt: now,
        updatedAt: now,
      }

      return { issues: [issue, ...state.issues] }
    }),
  updateIssue: (issueId, updates) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
          : issue
      ),
    })),
  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSorting: (sortBy, sortDirection) =>
    set((state) => ({ filters: { ...state.filters, sortBy, sortDirection } })),
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
}))
