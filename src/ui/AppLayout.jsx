import React from 'react'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
import Loader from './Loader'

function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <Loader />}
      {/* {true && <Loader/>} */}
      <Header />
      <div className=''>
        <main className='mx-auto  max-w-3xl border'>
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  )
}

export default AppLayout
