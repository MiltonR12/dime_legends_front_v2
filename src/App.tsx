import { Routes, Route } from 'react-router-dom'
import HomePage from './page/HomePage'
import NavBar from './components/ui/NavBar'
import AuthLayout from './layout/AuthLayout'
import LoginPage from './page/auth/LoginPage'
import RegisterPage from './page/auth/RegisterPage'
import ProtectLayout from './layout/ProtectLayout'
import UserPage from './page/admin/UserPage'
import { useAppDispatch } from './app/store'
import { useEffect } from 'react'
import { validateTokenThunk } from './app/redux/auth/authSlice'
import AdminLayout from './layout/AdminLayout'
import CreateTorneoPage from './page/admin/CreateTorneoPage'
import TorneoAdminPage from './page/admin/TorneoAdminPage'
import TorneoListPage from './page/TorneoListPage'
import TorneoPage from './page/TorneoPage'
import CreateTeamPage from './page/team/CreateTeamPage'
import ContactPage from './page/ContactPage'
import AboutPage from './page/public/about/AboutPage'
import ScrollToTop from './components/ScrollToTop'
import NotFoundPage from './page/public/not-found/NotFoundPage'

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(validateTokenThunk())
  }, [dispatch])

  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="sobre-nosotros" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage /> } />
        <Route path="torneos" element={<TorneoListPage />} />
        <Route path='torneo/:id' element={<TorneoPage />} />
        <Route path='torneo/team/create/:id' element={<CreateTeamPage />} />
        <Route element={<ProtectLayout />}>
          <Route path="usuario" element={<UserPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="torneo/:id" element={<TorneoAdminPage />} />
          </Route>
          <Route path="torneo/create" element={<CreateTorneoPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
