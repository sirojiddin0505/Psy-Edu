import React from 'react'
import Header from '../header/Index'
import { Outlet } from 'react-router-dom'
import Sitebar from '../sitebar/Index'

const Adminlayout = () => {
  return (
    <>
      <Header />
      <Sitebar />
      <div>
        <main className='mt-[90px] ml-[320px]'>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default Adminlayout