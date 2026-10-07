import type { User } from "@/app/api/auth/auth.types";

export const ROLE_LABEL: Record<string, string> = {
  Admin: "Superadmin",
  Creator: "Organizador",
  User: "Usuario",
};

const ROLE_BY_ID: Record<string, string> = {
  "6667012c92cb8e72b8d00c48": "Admin",
  "6667012c92cb8e72b8d00c4c": "Creator",
  "6667012c92cb8e72b8d00c4a": "User",
};

export const roleName = (user?: { role?: { name?: string; _id?: string } | string } | null) => {
  const role = user?.role;
  if (!role) return "";
  if (typeof role === "string") return ROLE_BY_ID[role] ?? "";
  return role.name || ROLE_BY_ID[String(role._id)] || "";
};

export const roleLabel = (name?: string) =>
  name ? (ROLE_LABEL[name] ?? name) : "Usuario";

export const isSuperAdmin = (user?: { role?: { name?: string } } | null) =>
  roleName(user) === "Admin";

export const isOrganizer = (user?: { role?: { name?: string } } | null) => {
  const name = roleName(user);
  return name === "Admin" || name === "Creator";
};

export type PageReview = "pending" | "approved" | "rejected";

export const pageReview = (user?: User | null): PageReview | null => {
  const review = user?.page?.review;
  if (review === "pending" || review === "approved" || review === "rejected")
    return review;
  if (!user?.page) return null;
  return isOrganizer(user) ? "approved" : "pending";
};
