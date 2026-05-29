import type { User } from "@/types/user"

export const users: User[] = [
  {
    id: "user-sarah-chen",
    name: "Sarah Chen",
    role: "Venture Product Lead",
    avatar: "SC",
    activeVentureIds: ["venture-sentra", "venture-reson8"],
    createdAt: "2026-04-01T09:00:00.000Z",
  },
  {
    id: "user-omar-khaled",
    name: "Omar Khaled",
    role: "AI Engineer",
    avatar: "OK",
    activeVentureIds: ["venture-sentra", "venture-internal-ops"],
    createdAt: "2026-04-01T09:00:00.000Z",
  },
  {
    id: "user-maya-rodriguez",
    name: "Maya Rodriguez",
    role: "Studio Operator",
    avatar: "MR",
    activeVentureIds: ["venture-sentra", "venture-reson8", "venture-internal-ops"],
    createdAt: "2026-04-01T09:00:00.000Z",
  },
  {
    id: "user-lina-haddad",
    name: "Lina Haddad",
    role: "Product Designer",
    avatar: "LH",
    activeVentureIds: ["venture-reson8", "venture-internal-ops"],
    createdAt: "2026-04-01T09:00:00.000Z",
  },
]
