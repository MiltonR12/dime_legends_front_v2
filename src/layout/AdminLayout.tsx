import { getMyTournamentThunk } from '@/app/redux/tournament/tournamentSlice'
import { RootState, useAppDispatch } from '@/app/store'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom'

function AdminLayout() {

  const dispatch = useAppDispatch()
  const { myTournaments } = useSelector((state: RootState) => state.tournament)

  useEffect(() => {
    dispatch(getMyTournamentThunk())
  }, [dispatch])

  return <main className='pt-20 grid grid-cols-[auto_1fr] h-screen bg-neutral-800' >
    <nav className='bg-neutral-800 grid grid-rows-[50px_1fr] w-64' >
      <div className='flex items-center justify-center' >
        <Button asChild >
          <Link to='/torneo/create' >
            Crear Torneo
          </Link>
        </Button>
      </div>
      <div>
        <ul className='flex flex-col ' >
          {
            myTournaments.map(tournament => (
              <li key={tournament._id} className='px-4' >
                <NavLink to={`/admin/torneo/${tournament._id}`}
                  className={({ isActive }) =>
                    isActive ?
                      'bg-neutral-700 border-l-4 border-rosePrimary px-4 py-2 rounded-lg block font-semibold text-white text-lg' :
                      'px-4 py-2  block text-neutral-400 text-lg'
                  }
                >
                  {tournament.name}
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