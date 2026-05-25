"use client"

import { SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { users } from "@/data/users"
import {
  issuePriorities,
  issueStatuses,
  issueTypes,
  priorityLabels,
  statusLabels,
  typeLabels,
} from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useUiStore } from "@/stores/ui-store"
import type {
  IssuePriority,
  IssueStatus,
  IssueType,
} from "@/types/issue"

function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
}

export function IssuesToolbar() {
  const filters = useIssueStore((state) => state.filters)
  const setSearch = useIssueStore((state) => state.setSearch)
  const setFilters = useIssueStore((state) => state.setFilters)
  const resetFilters = useIssueStore((state) => state.resetFilters)
  const issuesViewMode = useUiStore((state) => state.issuesViewMode)
  const setIssuesViewMode = useUiStore((state) => state.setIssuesViewMode)
  const activeFilterCount =
    filters.priorities.length +
    filters.statuses.length +
    filters.types.length +
    filters.ownerIds.length +
    (filters.overdueOnly ? 1 : 0) +
    (filters.roadmapLinkedOnly ? 1 : 0)

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/60 bg-card/45 p-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Input
          value={filters.search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search issues..."
          className="h-8 max-w-md border-border/60 bg-background/50"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 border-border/60 bg-card/40">
              <SlidersHorizontal className="size-3.5" strokeWidth={1.8} />
              Filters
              {activeFilterCount > 0 ? ` ${activeFilterCount}` : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            {issueStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.statuses.includes(status)}
                onCheckedChange={() =>
                  setFilters({
                    statuses: toggleValue<IssueStatus>(filters.statuses, status),
                  })
                }
              >
                {statusLabels[status]}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            {issuePriorities.map((priority) => (
              <DropdownMenuCheckboxItem
                key={priority}
                checked={filters.priorities.includes(priority)}
                onCheckedChange={() =>
                  setFilters({
                    priorities: toggleValue<IssuePriority>(
                      filters.priorities,
                      priority
                    ),
                  })
                }
              >
                {priorityLabels[priority]}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Type</DropdownMenuLabel>
            {issueTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={filters.types.includes(type)}
                onCheckedChange={() =>
                  setFilters({
                    types: toggleValue<IssueType>(filters.types, type),
                  })
                }
              >
                {typeLabels[type]}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Owner</DropdownMenuLabel>
            {users.map((user) => (
              <DropdownMenuCheckboxItem
                key={user.id}
                checked={filters.ownerIds.includes(user.id)}
                onCheckedChange={() =>
                  setFilters({
                    ownerIds: toggleValue<string>(filters.ownerIds, user.id),
                  })
                }
              >
                {user.name}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.overdueOnly}
              onCheckedChange={(checked) =>
                setFilters({ overdueOnly: Boolean(checked) })
              }
            >
              Overdue only
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.roadmapLinkedOnly}
              onCheckedChange={(checked) =>
                setFilters({ roadmapLinkedOnly: Boolean(checked) })
              }
            >
              Roadmap linked
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {activeFilterCount > 0 || filters.search ? (
          <Button
            variant="ghost"
            className="h-8"
            onClick={resetFilters}
            aria-label="Clear issue filters"
          >
            <X className="size-3.5" strokeWidth={1.8} />
            Clear
          </Button>
        ) : null}
      </div>

      <Tabs
        value={issuesViewMode}
        onValueChange={(value) =>
          setIssuesViewMode(value === "board" ? "board" : "list")
        }
      >
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
