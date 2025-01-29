import { deleteTournamentThunk, getMyTournamentThunk } from '@/app/redux/tournament/tournamentSlice'
import { RootState, useAppDispatch } from '@/app/store'
import MenuTable from '@/components/menu/MenuTable'
import ModalDelete from '@/components/modals/ModalDelete'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'

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

  return <main className='pt-20 grid grid-cols-[auto_1fr] h-screen bg-three-800' >

    {tournament && <ModalDelete
      title='Eliminar Torneo'
      description='Esta acción no se puede deshacer y se eliminará permanentemente.'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSuccess={() => { handleDelete(tournament) }}
    />}

    <nav className='bg-three-800 border-r border-three-300/20 grid grid-rows-[auto_1fr] w-72' >

      <div>
        <h2 className='text-white text-2xl font-bold text-center' >
          Dime Legenes
        </h2>
        <div className='p-2 px-5' >
          <Button variant="rose" asChild>
            <Link to='/torneo/create' className='w-full h-full0' >
              Crear Nuevo Torneo
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <ul className='flex flex-col' >
          {
            myTournaments.map(tournament => (
              <li key={tournament._id} className='px-4' >
                <NavLink to={`/admin/torneo/${tournament._id}`}
                  className={({ isActive }) =>
                    `flex items-center border-l-4 justify-between text-lg px-4 py-2 rounded-lg font-semibold capitalize
                    ${isActive ?
                      'border-rosePrimary bg-three-700 text-white' :
                      'border-transparent text-three-400 text-lg'}
                  `
                  }
                >
                  <span className='line-clamp-1' >{tournament.name}</span>
                  <MenuTable
                    onDelete={() => {
                      setTournament(tournament._id)
                      setIsOpen(true)
                    }}
                  />
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
    <section>
      <Outlet />
    </section>
  </main>
}

export default AdminLayout