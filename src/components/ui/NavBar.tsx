import { Link } from 'react-router-dom'
import { Button } from './button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet'
import { RxHamburgerMenu } from "react-icons/rx";

function NavBar() {

  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className="fixed bg-fondo w-screen py-4" >
      <div className='container mx-auto flex items-center justify-between px-5' >

        <h2>
          <Link to="/" className="text-white text-2xl font-semibold">
            Dime Legends
          </Link>
        </h2>

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
          </SheetContent>
        </Sheet>

        <div className='hidden md:flex gap-10' >

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