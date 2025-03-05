import { getMyTournamentThunk } from '@/app/redux/tournament/tournamentSlice'
import { RootState, useAppDispatch } from '@/app/store'
import Image from '@/components/ui/Image'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '@/assets/imgs/logos/logomandar.png'
import { CardUser } from '@/components/card/CardUser'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { TfiCup } from 'react-icons/tfi'
import { Button } from '@/components/ui/button'

function AdminLayout() {

  const dispatch = useAppDispatch()
  const { myTournaments } = useSelector((state: RootState) => state.tournament)

  useEffect(() => {
    dispatch(getMyTournamentThunk())
  }, [dispatch])

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" >
        <SidebarHeader className='flex-row items-center py-5 gap-5' >
          <Image src={logo} className="w-8 h-8 rounded-lg" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <h3 className='text-2xl truncate font-semibold text-white' >
              Dime Legenes
            </h3>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Button variant="secondary" >
            <NavLink to="/torneo/create" >
              Crear Torneo
            </NavLink>
          </Button>
          <Separator />
          <SidebarGroup>
            <SidebarGroupLabel>
              Administración
            </SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                {myTournaments.map((item) => (
                  <SidebarMenuItem key={item._id}>

                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Torneos" >
                        <TfiCup />
                        <span>
                          {item.name}
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            <NavLink to={`/admin/torneo/${item._id}`} >
                              Información
                            </NavLink>
                          </SidebarMenuSubButton>
                          <SidebarMenuSubButton>
                            <NavLink to={`/admin/torneo/equipos/${item._id}`} >
                              Equipos
                            </NavLink>
                          </SidebarMenuSubButton>
                          <SidebarMenuSubButton>
                            <NavLink to={`/admin/torneo/versus/${item._id}`} >
                              Versus
                            </NavLink>
                          </SidebarMenuSubButton>
                          <SidebarMenuSubButton>
                            <NavLink to={`/admin/torneo/bracket/${item._id}`} >
                              Bracket
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                ))}
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <CardUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className='p-3 md:p-5 h-screen overflow-hidden grid grid-rows-[auto_1fr]' >
          <SidebarTrigger />
          <main className='h-full overflow-y-auto' >
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout