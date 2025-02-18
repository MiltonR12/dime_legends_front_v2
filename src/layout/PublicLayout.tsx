import NavBar from "@/components/ui/NavBar"
import { Outlet } from "react-router-dom"

function PublicLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default PublicLayout