"use client"

import { SlidersHorizontal, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { users } from "@/data/users"
import {
  issuePriorities,
  issueStatuses,
  issueTypes,
  priorityLabels,
  sortDirectionLabels,
  sortLabels,
  statusLabels,
  typeLabels,
} from "@/features/issues/utils/issue-utils"
import { useIssueStore } from "@/stores/issue-store"
import { useUiStore } from "@/stores/ui-store"
import type {
  IssueFilters,
  IssuePriority,
  IssueSortBy,
  IssueStatus,
  IssueType,
  SortDirection,
} from "@/types/issue"
import type { RoadmapItem } from "@/types/roadmap"
import type { Venture } from "@/types/venture"

function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
}

type IssuesToolbarProps = {
  ventures: Venture[]
  roadmapItems: RoadmapItem[]
}

export function IssuesToolbar({ ventures, roadmapItems }: IssuesToolbarProps) {
  const filters = useIssueStore((state) => state.filters)
  const setSearch = useIssueStore((state) => state.setSearch)
  const setFilters = useIssueStore((state) => state.setFilters)
  const setSorting = useIssueStore((state) => state.setSorting)
  const resetFilters = useIssueStore((state) => state.resetFilters)
  const issuesViewMode = useUiStore((state) => state.issuesViewMode)
  const setIssuesViewMode = useUiStore((state) => state.setIssuesViewMode)
  const activeFilterCount =
    filters.priorities.length +
    filters.statuses.length +
    filters.types.length +
    filters.ownerIds.length +
    filters.ventureIds.length +
    filters.roadmapIds.length +
    (filters.overdueOnly ? 1 : 0) +
    (filters.roadmapLinkedOnly ? 1 : 0)
  const filterChips = getFilterChips(filters, ventures, roadmapItems, setFilters)

  return (
    <div className="rounded-lg border border-border/60 bg-card/45 p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <Input
            value={filters.search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search issues, owners, tags..."
            className="h-8 min-w-56 max-w-md border-border/60 bg-background/50"
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
              <DropdownMenuLabel>Venture</DropdownMenuLabel>
              {ventures.map((venture) => (
                <DropdownMenuCheckboxItem
                  key={venture.id}
                  checked={filters.ventureIds.includes(venture.id)}
                  onCheckedChange={() =>
                    setFilters({
                      ventureIds: toggleValue<string>(
                        filters.ventureIds,
                        venture.id
                      ),
                    })
                  }
                >
                  {venture.name}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 border-border/60 bg-card/40 text-xs font-normal text-foreground select-none">
                Sort: {sortLabels[filters.sortBy]}
                <ChevronDown className="size-3.5 opacity-60 ml-1" strokeWidth={1.8} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup
                value={filters.sortBy}
                onValueChange={(value) => setSorting(value as IssueSortBy, filters.sortDirection)}
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <DropdownMenuRadioItem key={value} value={value}>
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 border-border/60 bg-card/40 text-xs font-normal text-foreground select-none">
                {sortDirectionLabels[filters.sortDirection]}
                <ChevronDown className="size-3.5 opacity-60 ml-1" strokeWidth={1.8} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuRadioGroup
                value={filters.sortDirection}
                onValueChange={(value) => setSorting(filters.sortBy, value as SortDirection)}
              >
                {Object.entries(sortDirectionLabels).map(([value, label]) => (
                  <DropdownMenuRadioItem key={value} value={value}>
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
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

      {filterChips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className="rounded-md border border-border/50 bg-background/35 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              onClick={chip.onRemove}
            >
              {chip.label}
              <span className="ml-1 text-muted-foreground">x</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function getFilterChips(
  filters: IssueFilters,
  ventures: Venture[],
  roadmapItems: RoadmapItem[],
  setFilters: (filters: Partial<IssueFilters>) => void
) {
  return [
    ...filters.ventureIds.map((ventureId) => ({
      key: `venture-${ventureId}`,
      label: ventures.find((venture) => venture.id === ventureId)?.name ?? "Venture",
      onRemove: () =>
        setFilters({
          ventureIds: filters.ventureIds.filter((id) => id !== ventureId),
        }),
    })),
    ...filters.statuses.map((status) => ({
      key: `status-${status}`,
      label: statusLabels[status],
      onRemove: () =>
        setFilters({
          statuses: filters.statuses.filter((item) => item !== status),
        }),
    })),
    ...filters.priorities.map((priority) => ({
      key: `priority-${priority}`,
      label: priorityLabels[priority],
      onRemove: () =>
        setFilters({
          priorities: filters.priorities.filter((item) => item !== priority),
        }),
    })),
    ...filters.types.map((type) => ({
      key: `type-${type}`,
      label: typeLabels[type],
      onRemove: () =>
        setFilters({ types: filters.types.filter((item) => item !== type) }),
    })),
    ...filters.ownerIds.map((ownerId) => ({
      key: `owner-${ownerId}`,
      label: users.find((user) => user.id === ownerId)?.name ?? "Owner",
      onRemove: () =>
        setFilters({
          ownerIds: filters.ownerIds.filter((item) => item !== ownerId),
        }),
    })),
    ...filters.roadmapIds.map((roadmapId) => ({
      key: `roadmap-${roadmapId}`,
      label:
        roadmapItems.find((item) => item.id === roadmapId)?.title ??
        "Roadmap initiative",
      onRemove: () =>
        setFilters({
          roadmapIds: filters.roadmapIds.filter((item) => item !== roadmapId),
        }),
    })),
    ...(filters.overdueOnly
      ? [
          {
            key: "overdue",
            label: "Overdue",
            onRemove: () => setFilters({ overdueOnly: false }),
          },
        ]
      : []),
    ...(filters.roadmapLinkedOnly
      ? [
          {
            key: "roadmap-linked",
            label: "Roadmap linked",
            onRemove: () => setFilters({ roadmapLinkedOnly: false }),
          },
        ]
      : []),
  ]
}
