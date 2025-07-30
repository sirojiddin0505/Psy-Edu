import React, { useState } from 'react'
import { FaAd } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { MdExitToApp, MdOutlineAddLocationAlt, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { TbCategory2 } from 'react-icons/tb'
import { NavLink, useNavigate } from 'react-router-dom'

const Sitebar = () => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState(null)

  const toggleMenu = (menu) => {
    setActiveMenu(prev => (prev === menu ? null : menu))
  }

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <aside className='fixed top-0 left-0 z-10'>
      <main className='w-[250px] min-h-screen bg-gray-800'>
        <NavLink to='/' className='flex items-center text-3xl text-white font-[600] h-17 bg-[#6a73fa]'><p className='text-5xl'>🎓</p>PsyEdu</NavLink>
        <div className='flex flex-col py-4 text-white text-xl gap-1'>
          <NavLink to='/statictics' className='flex items-center gap-3 py-3 px-4 hover:bg-white hover:text-gray-800'><IoStatsChart /> Statictics</NavLink>
          <div>
            <div onClick={() => toggleMenu('natijalar')} className='flex items-center justify-between py-3 px-4 hover:bg-white hover:text-gray-800 cursor-pointer'>
              <span className='flex gap-2 items-center'>📊 Natijalar</span>
              <MdOutlineKeyboardArrowRight className={`transform transition duration-300 ${activeMenu === 'natijalar' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'natijalar' && (
              <div className='flex flex-col text-[15px]'>
                <NavLink to='/results/start' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Boshlang'ich test natijalari</NavLink>
                <NavLink to='/results/lesson' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Darsdagi test natijalari</NavLink>
                <NavLink to='/results/result-finish' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Yakuniy test natijalari</NavLink>
                <NavLink to='/results/category' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Kategoriy test natijalari</NavLink>
              </div>
            )}
          </div>
          <NavLink to='/categories' className='flex items-center gap-3 py-3 px-4 hover:bg-white hover:text-gray-800'><TbCategory2 /> Kategoriyalar</NavLink>
          <div>
            <div onClick={() => toggleMenu('testlar')} className='flex items-center justify-between py-3 px-4 hover:bg-white hover:text-gray-800 cursor-pointer'>
              <span className='flex gap-2 items-center'>🧪 Testlar</span>
              <MdOutlineKeyboardArrowRight className={`transform transition duration-300 ${activeMenu === 'testlar' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'testlar' && (
              <div className='flex flex-col text-[15px]'>
                <NavLink to='/tests/1' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Boshlang'ich test</NavLink>
                <NavLink to='/tests/1' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Doimiy test</NavLink>
                <NavLink to='/tests/1' className={'hover:bg-white hover:text-gray-800 py-3 pl-8'}>- Yakuniy test</NavLink>
              </div>
            )}
          </div>
          <div>
            <div onClick={() => toggleMenu('darslar')} className='flex items-center justify-between py-3 px-4 hover:bg-white hover:text-gray-800 cursor-pointer'>
              <span className='flex gap-2 items-center'>📚 Darslar</span>
              <MdOutlineKeyboardArrowRight className={`transform transition duration-300 ${activeMenu === 'darslar' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'darslar' && (
              <div className='flex flex-col text-[15px]'>
                <NavLink to='/lessons/1' className={'hover:bg-white hover:text-gray-800 py-3 pl-10'}>- Modul qo'shish</NavLink>
                <NavLink to='/lessons/2' className={'hover:bg-white hover:text-gray-800 py-3 pl-10'}>- Dars qo'shish</NavLink>
                <NavLink to='/lessons/3' className={'hover:bg-white hover:text-gray-800 py-3 pl-10'}>- Test qo'shish</NavLink>
              </div>
            )}
          </div>
          <NavLink to='/ads' className='flex items-center gap-3 py-3 px-4 hover:bg-white hover:text-gray-800'><FaAd /> Reklamalar</NavLink>
          <NavLink to='/regions' className='flex items-center gap-3 py-3 px-4 hover:bg-white hover:text-gray-800'><MdOutlineAddLocationAlt /> Viloyatlar</NavLink>
          <span onClick={logOut} className='flex items-center gap-2 border py-3 px-4 mx-1 rounded-md text-gray-700 bg-white font-[600] hover:bg-[#dad9d9] cursor-pointer active:scale-95 duration-620'>
            <MdExitToApp className='text-2xl' /> Chiqish
          </span>
        </div>
      </main>
    </aside>
  )
}

export default Sitebar
