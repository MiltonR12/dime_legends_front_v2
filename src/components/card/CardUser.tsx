"use client"

import { Bell, ChevronsUpDown, LogOut, User, Home, Settings } from "lucide-react"

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
import { useAuth, useLogout } from "@/hooks/auth"
import Image from "../ui/Image"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export function CardUser() {
  const { isMobile } = useSidebar()
  const { user } = useAuth()
  const logout = useLogout()

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-lg border border-transparent text-admin-text hover:border-admin-border hover:bg-admin-surface data-[state=open]:bg-admin-surface data-[state=open]:text-admin-text"
            >
              <div className="relative">
                <Image
                  src={user.image || "/placeholder.svg"}
                  className="h-8 w-8 rounded-md border border-admin-border"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-admin-sidebar bg-emerald-500"></div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-admin-text">{user.firstName}</span>
                  <Badge variant="outline" className="border-admin-border px-1.5 py-0 text-xs text-admin-muted">
                    Admin
                  </Badge>
                </div>
                <span className="truncate text-xs text-admin-muted">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-admin-muted group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg border border-admin-border bg-admin-surface shadow-none"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* User Header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 border-b border-admin-border px-3 py-3">
                <div className="relative">
                  <Image
                    src={user.image || "/placeholder.svg"}
                    className="h-10 w-10 rounded-md border border-admin-border"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-admin-sidebar bg-emerald-500"></div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-admin-text">{user.firstName}</span>
                  <span className="truncate text-xs text-admin-muted">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-admin-border" />

            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-md text-admin-text hover:bg-admin-input hover:text-admin-text focus:bg-admin-input focus:text-admin-text"
              >
                <Link to="/usuario" className="flex items-center gap-3 px-2 py-2">
                  <User className="h-4 w-4 text-admin-muted" />
                  <span className="font-medium">Mi Cuenta</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-md text-admin-text hover:bg-admin-input hover:text-admin-text focus:bg-admin-input focus:text-admin-text"
              >
                <Link to="/" className="flex items-center gap-3 px-2 py-2">
                  <Home className="h-4 w-4 text-admin-muted" />
                  <span className="font-medium">Volver al sitio</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer rounded-md text-admin-text hover:bg-admin-input hover:text-admin-text focus:bg-admin-input focus:text-admin-text">
                <div className="flex w-full items-center gap-3 px-2 py-2">
                  <Bell className="h-4 w-4 text-admin-muted" />
                  <span className="font-medium">Notificaciones</span>
                  <Badge variant="outline" className="ml-auto text-xs border-red-600/50 text-red-400 px-1.5 py-0">
                    3
                  </Badge>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer rounded-md text-admin-text hover:bg-admin-input hover:text-admin-text focus:bg-admin-input focus:text-admin-text">
                <div className="flex w-full items-center gap-3 px-2 py-2">
                  <Settings className="h-4 w-4 text-admin-muted" />
                  <span className="font-medium">Configuración</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-admin-border" />

            <div className="p-1">
              <DropdownMenuItem
                className="cursor-pointer rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
                onClick={() => logout()}
              >
                <div className="flex items-center gap-3 px-2 py-2 w-full">
                  <LogOut className="h-4 w-4" />
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
