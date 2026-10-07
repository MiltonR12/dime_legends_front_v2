"use client"

import { useMyTournaments } from "@/hooks/tournament"
import type { MyTournament } from "@/app/api/tournament/tournament.types"
import Image from "@/components/ui/Image"
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
} from "@/components/ui/sidebar"
import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import logo from "@/assets/imgs/logos/logomandar.png"
import { CardUser } from "@/components/card/CardUser"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, Plus, Trophy, Users, Swords, GitBranch, Info, LayoutDashboard, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const NO_TOURNAMENTS: MyTournament[] = []

function AdminLayout() {
  const { data: myTournaments = NO_TOURNAMENTS } = useMyTournaments()
  const [query, setQuery] = useState("")
  const tournaments = myTournaments.filter((item) =>
    item.name?.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <SidebarProvider className="admin-theme">
      <Sidebar
        collapsible="icon"
        className="border-r border-admin-border bg-admin-sidebar"
      >
        <SidebarHeader className="gap-4 px-4 py-5">
          <div className="flex items-center gap-3">
            <Image src={logo || "/placeholder.svg"} className="h-8 w-8 rounded-md group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
            <h3 className="text-lg font-semibold text-admin-text group-data-[collapsible=icon]:hidden">Dime Legends</h3>
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
          <div className="px-1">
            <Button
              asChild
              className="w-full justify-start gap-3 border-none bg-admin-accent text-white shadow-none hover:bg-admin-accent-hover group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
            >
              <NavLink to="/admin/torneo/create">
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">Crear Torneo</span>
              </NavLink>
            </Button>
          </div>

          <Separator className="bg-admin-border" />

          {/* Tournaments Section */}
          <SidebarGroup>
            <SidebarMenu className="mb-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" className="rounded-lg">
                  <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "bg-admin-accent text-white hover:bg-admin-accent hover:text-white"
                        : "text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                    }
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroupLabel className="flex items-center gap-2 px-2 py-2 text-xs font-medium uppercase tracking-wider text-admin-muted">
              <Trophy className="h-3 w-3 flex-shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Torneos</span>
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
                  <p className="text-sm text-admin-muted">No tienes torneos</p>
                  <p className="text-xs text-admin-muted">Crea tu primer torneo</p>
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
                          <ChevronRight className="ml-auto h-4 w-4 text-admin-muted transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-6 mt-1 space-y-1">
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="rounded-md text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                            >
                              <NavLink
                                to={`/admin/torneo/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-admin-accent text-white"
                                    : "text-admin-muted hover:text-admin-text"
                                }
                              >
                                <Info className="h-3 w-3" />
                                <span>Información</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="rounded-md text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                            >
                              <NavLink
                                to={`/admin/torneo/equipos/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-admin-accent text-white"
                                    : "text-admin-muted hover:text-admin-text"
                                }
                              >
                                <Users className="h-3 w-3" />
                                <span>Equipos</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="rounded-md text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                            >
                              <NavLink
                                to={`/admin/torneo/versus/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-admin-accent text-white"
                                    : "text-admin-muted hover:text-admin-text"
                                }
                              >
                                <Swords className="h-3 w-3" />
                                <span>Versus</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>

                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="rounded-md text-admin-muted hover:bg-admin-surface hover:text-admin-text"
                            >
                              <NavLink
                                to={`/admin/torneo/bracket/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-admin-accent text-white"
                                    : "text-admin-muted hover:text-admin-text"
                                }
                              >
                                <GitBranch className="h-3 w-3" />
                                <span>Bracket</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))
              )}
            </SidebarMenu>
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
            <h1 className="text-sm font-medium text-admin-muted">Panel de Administración</h1>
          </div>
          <main className="h-full overflow-y-auto pt-4">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
