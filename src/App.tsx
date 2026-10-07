import { Routes, Route } from 'react-router-dom'
import HomePage from './page/HomePage'
import AuthLayout from './layout/AuthLayout'
import LoginPage from './page/auth/LoginPage'
import RegisterPage from './page/auth/RegisterPage'
import ProtectLayout from './layout/ProtectLayout'
import { useCurrentUser } from './hooks/auth'
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
import PublicLayout from './layout/PublicLayout'
import ProfilePage from './page/public/profile/ProfilePage'
import AdminTeamPage from './page/admin/team/AdminTeamPage'
import AdminBattlePage from './page/admin/battle/AdminBattlePage'
import AdminBracketPage from './page/admin/bracket/AdminBracketPage'
import DashboardPage from './page/admin/dashboard/DashboardPage'
import AdminUsersPage from './page/admin/users/AdminUsersPage'
import MyTeamsPage from './page/admin/teams/MyTeamsPage'
import OrganizerPage from './page/admin/organizer/OrganizerPage'
import TeamPublicPage from './page/public/team/TeamPublicPage'
import OrganizerPublicPage from './page/public/organizer/OrganizerPublicPage'

function App() {

  // Valida el token al iniciar y deja al usuario en la cache de TanStack Query.
  useCurrentUser()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="sobre-nosotros" element={<AboutPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="torneos" element={<TorneoListPage />} />
          <Route path='torneo/:id' element={<TorneoPage />} />
          <Route path="equipo/:id" element={<TeamPublicPage />} />
          <Route path="organizador/:id" element={<OrganizerPublicPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path='torneo/team/create/:id' element={<CreateTeamPage />} />
        <Route element={<ProtectLayout />}>
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="usuarios" element={<AdminUsersPage />} />
            <Route path="equipos" element={<MyTeamsPage />} />
            <Route path="organizador" element={<OrganizerPage />} />
            <Route path="torneo/create" element={<CreateTorneoPage />} />
            <Route path="torneo/:id" element={<TorneoAdminPage />} />
            <Route path='torneo/equipos/:id' element={<AdminTeamPage />} />
            <Route path='torneo/versus/:id' element={<AdminBattlePage />} />
            <Route path="torneo/bracket/:id" element={<AdminBracketPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
