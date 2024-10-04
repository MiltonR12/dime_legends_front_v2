import { Link } from 'react-router-dom'
import { Button } from './button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

function NavBar() {

  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className="fixed bg-fondo w-screen py-4" >
      <div className='container mx-auto flex items-center justify-between px-5' >

        <div>
          <h2>
            <Link to="/" className="text-white text-2xl font-semibold">
              HELL HEIM
            </Link>
          </h2>
        </div>

        <div className='flex gap-10' >

          <ul className="flex text-white justify-between items-center gap-5">
            <li>
              <Link to="/" className="">Home</Link>
            </li>
            <li>
              <Link to="/torneos" className="">Torneos</Link>
            </li>
            <li>
              <Link to="/contacto" className="">Contacto</Link>
            </li>
          </ul>

          {
            user ? <div>
              <Link to="/usuario" className='text-white' >
                <img src={user.avatar} alt="" className='rounded-full overflow-hidden' />
              </Link>
            </div> : <Button asChild variant="outline" className='bg-primary border-primary rounded-xl' >
              <Link to="/login" className='text-white' >
                Iniciar Sesión
              </Link>
            </Button>
          }
        </div>
      </div>
    </nav>
  )
}

export default NavBar