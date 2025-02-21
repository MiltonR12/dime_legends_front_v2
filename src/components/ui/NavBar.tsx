import { Link } from 'react-router-dom'
import { Button } from './button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'
import { RxHamburgerMenu } from "react-icons/rx";
import Image from './Image'
import logo from '@/assets/imgs/logos/logomandar.png'

const enlaces = [
  { name: 'Home', path: '/' },
  { name: 'Torneos', path: '/torneos' },
  { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
  { name: 'Contacto', path: '/contacto' }
]

function NavBar() {

  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className="fixed bg-[#08030e] w-screen py-4 z-50" >
      <div className='container mx-auto flex items-center justify-between px-5' >

        <Link to="/" className='flex items-center gap-5' >
          <Image src={logo} className='rounded-none' alt='logo' />
          <h2 className='text-white text-2xl font-semibold' >
            Dime Legends
          </h2>
        </Link>

        <Sheet>
          <SheetTrigger className='md:hidden' >
            <RxHamburgerMenu />
          </SheetTrigger>
          <SheetContent className='bg-fondo px-4 w-[90%]' >
            <SheetHeader className='hidden' >
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className='flex gap-10 flex-col' >

              <ul className="flex flex-col text-white justify-between items-center gap-5">
                {enlaces.map((enlace, index) => (
                  <li key={index} >
                    <Link to={enlace.path} >{enlace.name}</Link>
                  </li>
                ))}
              </ul>

              {
                user ? <div>
                  <Link to="/usuario" className='text-white' >
                    <Image src={user.image} className='rounded-full overflow-hidden' />
                  </Link>
                </div> : <Button asChild variant="rose" >
                  <Link to="/login" className='text-white' >
                    Iniciar Sesión
                  </Link>
                </Button>
              }
            </div>
          </SheetContent>
        </Sheet>

        <div className='hidden md:flex gap-10' >

          <ul className="flex text-white justify-between items-center gap-5">
            {enlaces.map((enlace, index) => (
              <li key={index} >
                <Link to={enlace.path} className='hover:text-fuchsia-400 transition-colors' >
                  {enlace.name}
                </Link>
              </li>
            ))}
          </ul>

          {
            user ? <div>
              <Link to="/usuario" className='text-white' >
                <Image src={user.image} className='rounded-full overflow-hidden' />
              </Link>
            </div> : <Button asChild variant="rose" >
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