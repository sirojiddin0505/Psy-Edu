import React from 'react'
import { FaAd } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { MdExitToApp, MdOutlineAddLocationAlt, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { TbCategory2 } from 'react-icons/tb'
import { NavLink, useNavigate } from 'react-router-dom'

const Sitebar = () => {
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
  return (
    <aside className='fixed top-0 left-0 z-10'>
        <main className='w-[250px] min-h-screen bg-gray-800'>
          <NavLink to={'/'} className='flex items-center text-4xl text-white font-[600] h-20 py-2 bg-[#6a73fa]'><p className='text-6xl'>🎓</p>PsyEdu</NavLink>
          <div className='flex flex-col py-4 text-white text-xl gap-3'>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-3 px-4 hover:bg-white hover:text-gray-800'><IoStatsChart /> Statictics</NavLink>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-2 px-4 hover:bg-white hover:text-gray-800'>Natijalar<MdOutlineKeyboardArrowRight className='ml-29 text-12xl'/></NavLink>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-2 px-4 hover:bg-white hover:text-gray-800'><TbCategory2 />Kategoriyalar</NavLink>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-2 px-4 hover:bg-white hover:text-gray-800'>Testlar<MdOutlineKeyboardArrowRight className='ml-32 text-12xl'/></NavLink>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-2 px-4 hover:bg-white hover:text-gray-800'>Darstlar<MdOutlineKeyboardArrowRight className='ml-29 text-xl'/></NavLink>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-2 px-4 hover:bg-white hover:text-gray-800'><FaAd />Reklamalar</NavLink>
            <NavLink to={'/statictics'} className='flex items-center gap-3 py-2 px-4 hover:bg-white hover:text-gray-800'><MdOutlineAddLocationAlt />Viloyatlar</NavLink>
            <span onClick={logOut} className='flex items-center gap-2 border py-3 px-4 mx-1 rounded-md text-gray-700 bg-white font-[600] hover:opacity-80 cursor-pointer active:scale-95 duration-620'>
              <MdExitToApp className='text-2xl'/>Chiqish
            </span>
          </div>
        </main>
    </aside>
  )
}

export default Sitebar