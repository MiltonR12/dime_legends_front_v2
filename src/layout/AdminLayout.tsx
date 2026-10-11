"use client";

import { useMyTournaments } from "@/hooks/tournament";
import type { MyTournament } from "@/app/api/tournament/tournament.types";
import Image from "@/components/ui/Image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import logo from "@/assets/imgs/logos/logomandar.png";
import { CardUser } from "@/components/card/CardUser";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronRight,
  Plus,
  Trophy,
  Users,
  Swords,
  GitBranch,
  Radio,
  Info,
  LayoutDashboard,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { isOrganizer, isSuperAdmin } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NO_TOURNAMENTS: MyTournament[] = [];

type Access = "any" | "organizer" | "superadmin";

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  access: Access;
  end?: boolean;
  accent?: boolean;
};

const NAV: NavItem[] = [
  {
    to: "/admin/torneo/create",
    label: "Crear Torneo",
    icon: Plus,
    access: "organizer",
    accent: true,
  },
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    access: "any",
    end: true,
  },
  { to: "/admin/equipos", label: "Mis equipos", icon: Users, access: "any" },
  {
    to: "/admin/organizador",
    label: "Perfil organizador",
    icon: Trophy,
    access: "any",
  },
  {
    to: "/admin/usuarios",
    label: "Usuarios",
    icon: Users,
    access: "superadmin",
  },
];

const TOURNAMENT_PAGES: { segment: string; label: string; icon: LucideIcon }[] =
  [
    { segment: "", label: "Información", icon: Info },
    { segment: "equipos", label: "Equipos", icon: Users },
    { segment: "versus", label: "Versus", icon: Swords },
    { segment: "bracket", label: "Bracket", icon: GitBranch },
  ];

const pagesFor = (game: string) =>
  game === "Mobile Legends"
    ? [...TOURNAMENT_PAGES, { segment: "obs", label: "OBS", icon: Radio }]
    : TOURNAMENT_PAGES;

const canAccess = (access: Access, organizer: boolean, superAdmin: boolean) => {
  if (access === "organizer") return organizer;
  if (access === "superadmin") return superAdmin;
  return true;
};

const isHere = (pathname: string, item: NavItem) =>
  item.end
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(`${item.to}/`);

const linkClass = (active: boolean) =>
  active
    ? "bg-admin-accent text-white hover:bg-admin-accent hover:text-white"
    : "text-admin-muted hover:bg-admin-surface hover:text-admin-text";

function AdminLayout() {
  const { user, isLoading } = useAuth();
  const { data: myTournaments = NO_TOURNAMENTS } = useMyTournaments(
    isOrganizer(user),
  );
  const [query, setQuery] = useState("");
  const location = useLocation();
  const organizer = isOrganizer(user);
  const superAdmin = isSuperAdmin(user);
  const visible = NAV.filter((item) =>
    canAccess(item.access, organizer, superAdmin),
  );
  const actions = visible.filter((item) => item.accent);
  const links = visible.filter((item) => !item.accent);
  const tournaments = myTournaments.filter((item) =>
    item.name?.toLowerCase().includes(query.trim().toLowerCase()),
  );

  if (isLoading) return null;
  if (!user) return <Navigate to="/" replace />;
  if (!organizer && !links.some((item) => isHere(location.pathname, item))) {
    return <Navigate to={links[0]?.to ?? "/"} replace />;
  }

  return (
    <SidebarProvider className="admin-theme">
      <Sidebar
        collapsible="icon"
        className="border-r border-admin-border bg-admin-sidebar"
      >
        <SidebarHeader className="gap-4 px-4 py-5">
          <div className="flex items-center gap-3">
            <Image
              src={logo || "/placeholder.svg"}
              className="h-8 w-8 rounded-md group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7"
            />
            <h3 className="text-lg font-semibold text-admin-text group-data-[collapsible=icon]:hidden">
              Dime Legends
            </h3>
          </div>
          <label className="relative group-data-[collapsible=icon]:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar..."
              className="h-10 w-full rounded-lg border border-admin-border bg-admin-input pl-9 pr-3 text-sm text-admin-text outline-none placeholder:text-admin-muted focus:border-admin-accent"
            />
          </label>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 space-y-4">
          {actions.map((item) => (
            <div key={item.to} className="px-1">
              <Button
                asChild
                className="w-full justify-start gap-3 border-none bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
              >
                <NavLink to={item.to}>
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium group-data-[collapsible=icon]:hidden">
                    {item.label}
                  </span>
                </NavLink>
              </Button>
            </div>
          ))}

          {actions.length > 0 && <Separator className="bg-admin-border" />}

          <SidebarGroup>
            <SidebarMenu className="mb-2">
              {links.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className="rounded-lg"
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => linkClass(isActive)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {organizer && (
              <>
                <SidebarGroupLabel className="flex items-center gap-2 px-2 py-2 text-xs font-medium uppercase tracking-wider text-admin-muted">
                  <Trophy className="h-3 w-3 flex-shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Torneos
                  </span>
                  {myTournaments.length > 0 && (
                    <Badge
                      variant="outline"
                      className="ml-auto border-admin-border text-xs text-admin-muted group-data-[collapsible=icon]:hidden"
                    >
                      {myTournaments.length}
                    </Badge>
                  )}
                </SidebarGroupLabel>

                <SidebarMenu className="space-y-1">
                  {tournaments.length === 0 ? (
                    <div className="px-2 py-8 text-center">
                      <Trophy className="mx-auto mb-2 h-6 w-6 text-admin-muted" />
                      <p className="text-sm text-admin-muted">
                        No tienes torneos
                      </p>
                      <p className="text-xs text-admin-muted">
                        Crea tu primer torneo
                      </p>
                    </div>
                  ) : (
                    tournaments.map((item) => (
                      <Collapsible key={item._id} className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.name}
                              className="rounded-lg text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                            >
                              <Trophy className="h-4 w-4 text-admin-muted" />
                              <span className="font-medium capitalize truncate">
                                {item.name?.toLowerCase().slice(0, 30)}
                              </span>
                              {user?._id &&
                                item.createdBy &&
                                item.createdBy !== user._id && (
                                  <span className="text-[10px] uppercase text-admin-muted group-data-[collapsible=icon]:hidden">
                                    Compartido
                                  </span>
                                )}
                              <ChevronRight className="ml-auto h-4 w-4 text-admin-muted transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub className="ml-6 mt-1 space-y-1">
                              {pagesFor(item.game).map((page) => (
                                <SidebarMenuSubItem key={page.label}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className="rounded-md text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                                  >
                                    <NavLink
                                      to={
                                        page.segment
                                          ? `/admin/torneo/${page.segment}/${item._id}`
                                          : `/admin/torneo/${item._id}`
                                      }
                                      className={({ isActive }) =>
                                        isActive
                                          ? "bg-admin-accent text-white"
                                          : "text-admin-muted hover:text-admin-text"
                                      }
                                    >
                                      <page.icon className="h-3 w-3" />
                                      <span>{page.label}</span>
                                    </NavLink>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))
                  )}
                </SidebarMenu>
              </>
            )}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-admin-border p-3">
          <CardUser />
        </SidebarFooter>

        <SidebarRail className="bg-admin-border" />
      </Sidebar>

      <SidebarInset>
        <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden bg-admin-bg p-4 md:p-6">
          <div className="flex items-center gap-3 pb-4">
            <SidebarTrigger className="text-admin-muted hover:bg-admin-surface hover:text-admin-text" />
            <div className="h-4 w-px bg-admin-border" />
            <h1 className="text-sm font-medium text-admin-muted">
              {organizer ? "Panel de Administración" : "Mi cuenta"}
            </h1>
          </div>
          <main className="h-full overflow-y-auto pt-4">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
