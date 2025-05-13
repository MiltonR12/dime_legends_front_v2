
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/app/store"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Gamepad2, Trophy, Users, Calendar, Menu, ChevronDown, LogOut, User, Settings, Crown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "./sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import logo from '@/assets/imgs/logomandar.png'
import { authLogout } from "@/app/redux/auth/authSlice"

interface NavLinkProps {
  to: string
  label: string
  icon: React.ReactNode
  isActive: boolean
  onClick?: () => void
}

function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-purple-950/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              DIME LEGENDS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/torneos"
              label="Torneos"
              icon={<Trophy className="h-4 w-4" />}
              isActive={isActive("/torneos")}
            />
            <NavLink
              to="/sobre-nosotros"
              label="Sobre Nosotros"
              icon={<Users className="h-4 w-4" />}
              isActive={isActive("/equipos")}
            />
            <NavLink
              to="/contacto"
              label="Contacto"
              icon={<Calendar className="h-4 w-4" />}
              isActive={isActive("/calendario")}
            />

            {isAuthenticated && (
              <NavLink
                to="/mis-torneos"
                label="Mis Torneos"
                icon={<Crown className="h-4 w-4" />}
                isActive={isActive("/mis-torneos")}
              />
            )}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-purple-900/30">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-700">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white hidden sm:inline-block">{user?.firstName}</span>
                      <ChevronDown className="h-4 w-4 text-purple-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-purple-950 border-purple-800 text-white">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-purple-300">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-purple-800/50" />
                    <DropdownMenuItem asChild>
                      <Link to="/perfil" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4 text-purple-400" />
                        <span>Mi Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/mis-torneos" className="flex items-center gap-2 cursor-pointer">
                        <Trophy className="h-4 w-4 text-purple-400" />
                        <span>Mis Torneos</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/configuracion" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4 text-purple-400" />
                        <span>Configuración</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-purple-800/50" />
                    <DropdownMenuItem
                      onClick={() => dispatch(authLogout())}
                      className="flex items-center gap-2 text-red-400 focus:text-red-400 cursor-pointer">
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-900/50">
                  <Link to="/login">Iniciar Sesión</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Link to="/register">Registrarse</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-purple-950 border-purple-800 text-white p-0">
                <SheetHeader className="p-4 border-b border-purple-800/50">
                  <SheetTitle className="text-white flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-purple-400" /> Menú
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <MobileNavigation isAuthenticated={isAuthenticated} />

                  {!isAuthenticated && (
                    <div className="mt-6 px-4 flex flex-col gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="border-purple-700 text-purple-300 w-full justify-start"
                      >
                        <Link to="/login" className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Iniciar Sesión
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-full justify-start"
                      >
                        <Link to="/register" className="flex items-center gap-2">
                          <Users className="h-4 w-4" /> Registrarse
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>

                {isAuthenticated && (
                  <div className="mt-auto border-t border-purple-800/50 p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={user?.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-700">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-purple-300">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        dispatch(authLogout())
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ to, label, icon, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "relative px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors",
        isActive ? "text-white bg-purple-800/50" : "text-purple-300 hover:text-white hover:bg-purple-900/30",
      )}
    >
      {icon}
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  )
}

function MobileNavigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  const location = useLocation()

  // Check if the current route matches the link
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <nav className="flex flex-col">
      <MobileNavLink
        to="/torneos"
        label="Torneos"
        icon={<Trophy className="h-5 w-5" />}
        isActive={isActive("/torneos")}
      />
      <MobileNavLink
        to="/sobre-nosotros"
        label="Sobre Nosotros"
        icon={<Users className="h-5 w-5" />}
        isActive={isActive("/equipos")}
      />
      <MobileNavLink
        to="/contacto"
        label="Contacto"
        icon={<Calendar className="h-5 w-5" />}
        isActive={isActive("/calendario")}
      />

      {isAuthenticated && (
        <>
          <MobileNavLink
            to="/mis-torneos"
            label="Mis Torneos"
            icon={<Crown className="h-5 w-5" />}
            isActive={isActive("/mis-torneos")}
          />
          <MobileNavLink
            to="/perfil"
            label="Mi Perfil"
            icon={<User className="h-5 w-5" />}
            isActive={isActive("/perfil")}
          />
          <MobileNavLink
            to="/configuracion"
            label="Configuración"
            icon={<Settings className="h-5 w-5" />}
            isActive={isActive("/configuracion")}
          />
        </>
      )}
    </nav>
  )
}

function MobileNavLink({ to, label, icon, isActive }: NavLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 px-4 py-3 transition-colors",
          isActive
            ? "bg-purple-800/50 text-white border-l-4 border-pink-500"
            : "text-purple-300 hover:bg-purple-900/30 hover:text-white",
        )}
      >
        {icon}
        <span className="font-medium">{label}</span>
      </Link>
    </SheetClose>
  )
}

export default Header
