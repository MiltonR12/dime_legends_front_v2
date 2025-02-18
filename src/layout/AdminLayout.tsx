import { deleteTournamentThunk, getMyTournamentThunk } from '@/app/redux/tournament/tournamentSlice'
import { RootState, useAppDispatch } from '@/app/store'
import MenuTable from '@/components/menu/MenuTable'
import ModalDelete from '@/components/modals/ModalDelete'
import Image from '@/components/ui/Image'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '@/assets/imgs/logos/logomandar.png'
import { CardUser } from '@/components/card/CardUser'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronRight } from 'lucide-react'
import { TfiCup } from 'react-icons/tfi'

function AdminLayout() {

  const dispatch = useAppDispatch()
  const { myTournaments } = useSelector((state: RootState) => state.tournament)
  const [tournament, setTournament] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = (id: string) => {
    dispatch(deleteTournamentThunk(id)).then(() => {
      setIsOpen(false)
    })
  }

  useEffect(() => {
    dispatch(getMyTournamentThunk())
  }, [dispatch])

  return (
    <SidebarProvider>

      {tournament && <ModalDelete
        title='Eliminar Torneo'
        description='Esta acción no se puede deshacer y se eliminará permanentemente.'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => { handleDelete(tournament) }}
      />}

      <Sidebar collapsible="icon" className='bg-fondo' >
        <SidebarHeader className='flex-row items-center py-5 gap-5' >
          <Image src={logo} className="w-8 h-8 rounded-lg" />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <h3 className='text-2xl truncate font-semibold text-white' >
              Dime Legenes
            </h3>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Separator />
          <SidebarGroup>
            <SidebarGroupLabel>
              Administración
            </SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible
                asChild
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Torneos" >
                      <TfiCup />
                      <span>Torneos</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className='border-none' >
                      {myTournaments.map((item) => (
                        <SidebarMenuSubItem key={item._id} >
                          <SidebarMenuSubButton asChild >
                            <NavLink key={item._id} to={`/admin/torneo/${item._id}`}
                              className={({ isActive }) =>
                                `flex items-center justify-between text-lg font-semibold capitalize 
                              ${isActive ? 'text-white' : 'text-three-400'}`
                              }
                            >
                              <span className='line-clamp-1' >{item.name}</span>
                              <MenuTable onDelete={() => {
                                setTournament(item._id)
                                setIsOpen(true)
                              }}
                              />
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
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