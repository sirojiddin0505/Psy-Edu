import React, { useState } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { FaAd, FaMoon, FaSun } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { MdExitToApp, MdOutlineAddLocationAlt } from 'react-icons/md'
import { TbCategory2 } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { changeTheme } from '../store/changeTheme'

const Header = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const [openSitebar, setOpenSitebar] = useState(false)
  const dispatch = useDispatch()
  const store = useSelector((state) => state.darkMode.dark)

  return (
    <section className={`${store ? "bg-[#212130] border border-[#212130]" : "bg-[white] border border-gray-700"}`}>
        <div className='container mx-auto py-4 px-4 pl-[254px] max-w-[100%] '>
          <div className='flex justify-between items-center'>
            <span onClick={() => setOpenSitebar(!openSitebar)}><CgMenuLeft className={`${store ? "text-4xl text-white cursor-pointer" : "text-gray-700 text-4xl cursor-pointer"}`} /></span>
            <span onClick={() => dispatch(changeTheme())}>{store}{store ? <FaSun className='text-white text-3xl cursor-pointer'/> : <FaMoon className='text-gray-700 text-3xl cursor-pointer'/> }</span>
            {openSitebar && (
              <div className='fixed top-0 left-0 z-100'>
                <main className='w-[80px] text-center min-h-screen bg-gray-800'>
                <NavLink to={'/'} className='flex items-center text-3xl text-white font-[600] h-17 bg-[#6a73fa]'><p className='text-5xl'>🎓</p>PsyEdu</NavLink>
                <div className='flex flex-col py-[22px] text-white text-center text-xl gap-3'>
                  <NavLink to={'/statictics'}><IoStatsChart className='h-10 py-2 w-full hover:text-gray-800 hover:bg-white'/></NavLink>
                  <NavLink to={'/'} className='h-12 py-2 w-full hover:text-gray-800 hover:bg-white'>📊</NavLink>
                  <NavLink to={'/'}><TbCategory2 className='h-10 py-2 w-full hover:text-gray-800 hover:bg-white'/></NavLink>
                  <NavLink to={'/'} className='h-12 py-2 w-full hover:text-gray-800 hover:bg-white'>🧪</NavLink>
                  <NavLink to={'/'} className='h-12 py-2 w-full hover:text-gray-800 hover:bg-white'>📚</NavLink>
                  <NavLink to={'/'}><FaAd className='h-10 py-2 w-full hover:text-gray-800 hover:bg-white'/></NavLink>
                  <NavLink to={'/'}><MdOutlineAddLocationAlt className='h-10 py-2 w-full hover:text-gray-800 hover:bg-white'/></NavLink>
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