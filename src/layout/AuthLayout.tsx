import florin from '@/assets/imgs/florin.jpg'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <main className="grid grid-cols-2 h-screen" >
      <section>
        <Outlet />
      </section>
      <section>
        <img src={florin} className='h-full object-cover' alt="imagen" />
      </section>
    </main>
  )
}

export default AuthLayout