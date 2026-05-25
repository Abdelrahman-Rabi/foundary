"use client"

import { create } from "zustand"

import { issues as initialIssues } from "@/data/issues"
import type {
  Issue,
  IssueFilters,
  IssuePriority,
  IssueStatus,
  IssueType,
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
}

type IssueStore = {
  issues: Issue[]
  filters: IssueFilters
  setIssues: (issues: Issue[]) => void
  createIssue: (input: CreateIssueInput) => void
  updateIssue: (issueId: string, updates: Partial<Issue>) => void
  setSearch: (search: string) => void
  setFilters: (filters: Partial<IssueFilters>) => void
  resetFilters: () => void
  updateIssueStatus: (issueId: string, status: IssueStatus) => void
  getIssuesByVenture: (ventureId: string) => Issue[]
  getFilteredIssues: () => Issue[]
  getGroupedIssues: () => Record<IssueStatus, Issue[]>
}

type CreateIssueInput = {
  title: string
  ventureId: string
  type: IssueType
  priority: IssuePriority
  ownerId: string
  roadmapId?: string
}

const ISSUE_TODAY = new Date("2026-05-24T00:00:00.000Z")

function isIssueOverdue(issue: Issue) {
  if (!issue.dueDate || issue.status === "done" || issue.status === "killed") {
    return false
  }

  return new Date(`${issue.dueDate}T00:00:00.000Z`) < ISSUE_TODAY
}

const emptyGroups: Record<IssueStatus, Issue[]> = {
  backlog: [],
  planned: [],
  "in-progress": [],
  "in-review": [],
  done: [],
  killed: [],
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
        issue.tags.some((tag) => tag.toLowerCase().includes(search)) ||
        issue.type.toLowerCase().includes(search)

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
          filters.ownerIds.includes(issue.ownerId)) &&
        (!filters.overdueOnly || isIssueOverdue(issue)) &&
        (!filters.roadmapLinkedOnly || Boolean(issue.roadmapId))
      )
    })
  },
  getGroupedIssues: () =>
    get()
      .getFilteredIssues()
      .reduce<Record<IssueStatus, Issue[]>>(
        (groups, issue) => ({
          ...groups,
          [issue.status]: [...groups[issue.status], issue],
        }),
        emptyGroups
      ),
}))
