import React, { useState } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { FaMoon, FaSun } from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const [openSitebar, setOpenSitebar] = useState(false)
  return (
    <section className='bg-gray-700'>
        <div className='container mx-auto py-[22.5px] px-4 pl-[254px] max-w-[100%] '>
          <div className='flex justify-between items-center'>
            <span onClick={() => setOpenSitebar(!openSitebar)}><CgMenuLeft className='text-4xl text-white cursor-pointer'/></span>
            <span> <FaSun className='text-white text-3xl cursor-pointer'/> </span>
            {openSitebar && (
              <div className='fixed top-0 left-0 z-100'>
                <main className='w-[75px] text-center min-h-screen bg-gray-800'>
                <NavLink to={'/'} className='flex items-center text-4xl text-white font-[600] h-20 py-2 bg-[#6a73fa]'><p className='text-6xl'>🎓</p>PsyEdu</NavLink>
                <div className='flex flex-col p-3 text-white text-xl gap-3'>
                  <NavLink to={'/statictics'}>s</NavLink>
                  <NavLink to={'/statictics'}>m</NavLink>
                  <NavLink to={'/statictics'}>k</NavLink>
                  <NavLink to={'/statictics'}>t</NavLink>
                  <NavLink to={'/statictics'}>t</NavLink>
                  <NavLink to={'/statictics'}>t</NavLink>
                  <NavLink to={'/statictics'}>t</NavLink>
                  <span onClick={logOut} className='flex items-center gap-2 border py-3 px-4 rounded-md text-gray-700 bg-white font-[600] hover:opacity-90 cursor-pointer active:scale-95 duration-620'>
                    <MdExitToApp className='text-2xl'/>
                  </span>
                </div>
               </main>
              </div>
            )}
          </div>
        </div>
    </section>
  )
}

export default Header