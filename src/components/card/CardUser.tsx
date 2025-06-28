"use client"

import { Bell, ChevronsUpDown, LogOut, User, Home, Settings, Crown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useSelector } from "react-redux"
import { type RootState, useAppDispatch } from "@/app/store"
import Image from "../ui/Image"
import { authLogout } from "@/app/redux/auth/authSlice"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export function CardUser() {
  const { isMobile } = useSidebar()
  const { user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group hover:bg-purple-900/30 hover:text-white transition-all duration-200 data-[state=open]:bg-purple-900/40 data-[state=open]:text-white rounded-lg border border-transparent hover:border-purple-700/30"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <Image
                  src={user.image || "/placeholder.svg"}
                  className="relative w-8 h-8 rounded-lg shadow-md border border-purple-700/30"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-950 shadow-sm"></div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-white">{user.firstName}</span>
                  <Badge variant="outline" className="text-xs border-purple-600/50 text-purple-300 px-1.5 py-0">
                    <Crown className="h-2 w-2 mr-1" />
                    Admin
                  </Badge>
                </div>
                <span className="truncate text-xs text-purple-300">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-purple-400 group-hover:text-white transition-colors duration-200 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className=" bg-gradient-to-br from-purple-950/95 to-black/95 backdrop-blur-sm border border-purple-800/50 min-w-56 rounded-xl shadow-2xl shadow-purple-900/20"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* User Header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 bg-purple-900/20 rounded-t-xl border-b border-purple-800/30">
                <div className="relative">
                  <Image
                    src={user.image || "/placeholder.svg"}
                    className="w-10 h-10 rounded-lg shadow-lg border border-purple-700/30"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-purple-950 shadow-sm"></div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold text-white">{user.firstName}</span>
                    <Badge variant="outline" className="text-xs border-purple-600/50 text-purple-300 px-1.5 py-0">
                      <Crown className="h-2 w-2 mr-1" />
                      Admin
                    </Badge>
                  </div>
                  <span className="truncate text-xs text-purple-300">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-purple-800/30" />

            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem
                asChild
                className="hover:bg-purple-900/30 hover:text-white transition-colors duration-200 rounded-lg cursor-pointer md:p-4 focus:bg-purple-900/30 focus:text-white"
              >
                <Link to="/usuario" className="flex items-center gap-3 px-2 py-2">
                  <div className="w-6 h-6 bg-purple-600/20 rounded-md flex items-center justify-center">
                    <User className="h-3 w-3 text-purple-400" />
                  </div>
                  <span className="font-medium">Mi Cuenta</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="hover:bg-purple-900/30 hover:text-white transition-colors duration-200 rounded-lg cursor-pointer md:p-4 focus:bg-purple-900/30 focus:text-white"
              >
                <Link to="/" className="flex items-center gap-3 px-2 py-2">
                  <div className="w-6 h-6 bg-indigo-600/20 rounded-md flex items-center justify-center">
                    <Home className="h-3 w-3 text-indigo-400" />
                  </div>
                  <span className="font-medium">Volver al sitio</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:bg-purple-900/30 hover:text-white transition-colors duration-200 rounded-lg cursor-pointer focus:bg-purple-900/30 focus:text-white">
                <div className="flex items-center gap-3 px-2 py-2 w-full">
                  <div className="w-6 h-6 bg-pink-600/20 rounded-md flex items-center justify-center relative">
                    <Bell className="h-3 w-3 text-pink-400" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="font-medium">Notificaciones</span>
                  <Badge variant="outline" className="ml-auto text-xs border-red-600/50 text-red-400 px-1.5 py-0">
                    3
                  </Badge>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:bg-purple-900/30 hover:text-white transition-colors duration-200 rounded-lg cursor-pointer focus:bg-purple-900/30 focus:text-white">
                <div className="flex items-center gap-3 px-2 py-2 w-full">
                  <div className="w-6 h-6 bg-gray-600/20 rounded-md flex items-center justify-center">
                    <Settings className="h-3 w-3 text-gray-400" />
                  </div>
                  <span className="font-medium">Configuración</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-purple-800/30" />

            <div className="p-1">
              <DropdownMenuItem
                className="hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200 rounded-lg cursor-pointer focus:bg-red-900/30 focus:text-red-300 text-red-400"
                onClick={() => dispatch(authLogout())}
              >
                <div className="flex items-center gap-3 px-2 py-2 w-full">
                  <div className="w-6 h-6 bg-red-600/20 rounded-md flex items-center justify-center">
                    <LogOut className="h-3 w-3 text-red-400" />
                  </div>
                  <span className="font-medium">Cerrar sesión</span>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
