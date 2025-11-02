"use client"

import { getMyTournamentThunk } from "@/app/redux/tournament/tournamentSlice"
import { type RootState, useAppDispatch } from "@/app/store"
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
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"
import logo from "@/assets/imgs/logos/logomandar.png"
import { CardUser } from "@/components/card/CardUser"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, Plus, Trophy, Users, Swords, GitBranch, Info, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function AdminLayout() {
  const dispatch = useAppDispatch()
  const { myTournaments } = useSelector((state: RootState) => state.tournament)

  useEffect(() => {
    dispatch(getMyTournamentThunk())
  }, [dispatch])

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-purple-800/30 bg-gradient-to-b from-purple-950/95 to-black/95 backdrop-blur-sm"
      >
        <SidebarHeader className="flex-row items-center py-6 px-4 gap-4 border-b border-purple-800/30">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-sm"></div>
            <Image src={logo || "/placeholder.svg"} className="relative w-10 h-10 rounded-lg shadow-lg" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Dime Legends
            </h3>
            <p className="text-xs text-purple-300/70">Panel de administración</p>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 space-y-4">
          <div className="px-1">
            <Button
              asChild
              className="w-full justify-start gap-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg hover:shadow-purple-500/25 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
            >
              <NavLink to="/torneo/create">
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">Crear Torneo</span>
              </NavLink>
            </Button>
          </div>

          <Separator className="bg-purple-800/30" />

          {/* Tournaments Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-purple-300 font-semibold text-xs uppercase tracking-wider px-2 py-2 flex items-center gap-2">
              <Crown className="h-3 w-3 flex-shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">Administración</span>
              {myTournaments.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-auto text-xs border-purple-600/50 text-purple-300 group-data-[collapsible=icon]:hidden"
                >
                  {myTournaments.length}
                </Badge>
              )}
            </SidebarGroupLabel>

            <SidebarMenu className="space-y-1">
              {myTournaments.length === 0 ? (
                <div className="px-2 py-8 text-center">
                  <Trophy className="h-8 w-8 text-purple-400/50 mx-auto mb-2" />
                  <p className="text-purple-400/70 text-sm">No tienes torneos</p>
                  <p className="text-purple-500/50 text-xs">Crea tu primer torneo</p>
                </div>
              ) : (
                myTournaments.map((item) => (
                  <Collapsible key={item._id} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.name}
                          className="group hover:bg-purple-900/30 hover:text-white transition-colors duration-200 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-md flex items-center justify-center">
                            <Trophy className="h-3 w-3 text-purple-400" />
                          </div>
                          <span className="font-medium capitalize truncate">
                            {item.name?.toLowerCase().slice(0, 30)}
                          </span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-purple-400" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-6 mt-1 space-y-1">
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-purple-900/20 hover:text-white transition-colors duration-200 rounded-md"
                            >
                              <NavLink
                                to={`/admin/torneo/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-purple-900/40 text-white border-l-2 border-purple-500"
                                    : "text-purple-300 hover:text-white"
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
                              className="hover:bg-purple-900/20 hover:text-white transition-colors duration-200 rounded-md"
                            >
                              <NavLink
                                to={`/admin/torneo/equipos/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-purple-900/40 text-white border-l-2 border-purple-500"
                                    : "text-purple-300 hover:text-white"
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
                              className="hover:bg-purple-900/20 hover:text-white transition-colors duration-200 rounded-md"
                            >
                              <NavLink
                                to={`/admin/torneo/versus/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-purple-900/40 text-white border-l-2 border-purple-500"
                                    : "text-purple-300 hover:text-white"
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
                              className="hover:bg-purple-900/20 hover:text-white transition-colors duration-200 rounded-md"
                            >
                              <NavLink
                                to={`/admin/torneo/bracket/${item._id}`}
                                className={({ isActive }) =>
                                  isActive
                                    ? "bg-purple-900/40 text-white border-l-2 border-purple-500"
                                    : "text-purple-300 hover:text-white"
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

        <SidebarFooter className="border-t border-purple-800/30 p-3">
          <CardUser />
        </SidebarFooter>

        <SidebarRail className="bg-purple-800/20" />
      </Sidebar>

      <SidebarInset>
        <div className="p-3 md:p-5 h-screen overflow-hidden grid grid-rows-[auto_1fr] bg-gradient-to-br from-purple-950/5 to-black/5">
          <div className="flex items-center gap-3 pb-3 border-b border-purple-800/20">
            <SidebarTrigger className="hover:bg-purple-900/30 hover:text-white transition-colors duration-200" />
            <div className="h-4 w-px bg-purple-800/30" />
            <h1 className="text-lg font-semibold text-white">Panel de Administración</h1>
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
