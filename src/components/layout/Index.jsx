import React from 'react'
import Header from '../header/Index'
import { Outlet } from 'react-router-dom'
import Sitebar from '../sitebar/Index'

const Adminlayout = () => {
  return (
    <>
     <Header/>
     <div className='flex gap-2 border'>
     <main>
        <Outlet/>
     </main>
     <Sitebar/>
     </div>
    </>
  )
}

export default Adminlayout