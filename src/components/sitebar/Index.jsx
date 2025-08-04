import React, { useState } from 'react'
import { FaAd } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { MdExitToApp, MdOutlineAddLocationAlt, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { TbCategory2 } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

const Sitebar = ({collapsed}) => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState(null)

  const toggleMenu = (menu) => {
    setActiveMenu(prev => (prev === menu ? null : menu))
  }

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const isDark = useSelector((state) => state.darkMode.dark)

  return (
    <aside className='fixed top-0 left-0 z-10'>
      <main className={`${collapsed ? 'w-[80px]' : 'w-[250px]'} min-h-screen transition-all duration-300 ${isDark ? 'bg-gray-800' : "bg-white"}`}>
        <NavLink to='/statistics'
          className='flex items-center text-3xl text-white font-[600] h-17 bg-[#6a73fa]'>
          <p className='text-5xl'>🎓</p> {!collapsed && <span>Psy Edu</span>}
        </NavLink>

        <div className={`flex flex-col py-4 text-xl gap-1 ${isDark ? 'text-white' : "text-gray-800"} `}>
          <NavLink to='/statistics' 
            className={`flex items-center gap-3 py-3 px-4 text-center ${isDark ? 'hover:bg-white hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'} `}>
            <IoStatsChart /> {!collapsed && <span>Statictics</span>}
          </NavLink>

          <div>
            <div onClick={() => toggleMenu('natijalar')}
              className={` flex items-center justify-between py-3 px-4 cursor-pointer ${isDark ? 'hover:bg-white  hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'} `}>
              <span className='flex gap-2 items-center'>📊 {!collapsed && <span>Natijalar</span>} </span>
              <MdOutlineKeyboardArrowRight className={`transform transition duration-300 ${activeMenu === 'natijalar' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'natijalar' && (
              <div className='flex flex-col text-[15px]'>
                <NavLink to='/results/start' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Boshlang'ich test natijalari</NavLink>
                <NavLink to='/results/lesson' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Darsdagi test natijalari</NavLink>
                <NavLink to='/results/result-finish' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Yakuniy test natijalari</NavLink>
                <NavLink to='/results/category' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Kategoriy test natijalari</NavLink>
              </div>
            )}
          </div>

          <NavLink to='/categories' 
            className={`flex items-center gap-3 py-3 px-4 ${isDark ? 'hover:bg-white  hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'} `}>
            <TbCategory2 /> {!collapsed && <span>Kategoriyalar</span>}
          </NavLink>

          <div>
            <div onClick={() => toggleMenu('testlar')}
              className={`flex items-center justify-between py-3 px-4 cursor-pointer ${isDark ? 'hover:bg-white  hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'}`}>
              <span className='flex gap-2 items-center'>🧪 {!collapsed && <span>Testlar</span>}</span>
              <MdOutlineKeyboardArrowRight className={`transform transition duration-300 ${activeMenu === 'testlar' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'testlar' && (
              <div className='flex flex-col text-[15px]'>
                <NavLink to='/tests/boshlangich' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' } text-[15px] font-[700] `}>- Boshlang'ich test</NavLink>
                <NavLink to='/tests/doimiy' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' } text-[15px] font-[700]`}>- Doimiy test</NavLink>
                <NavLink to='/tests/yakuniy' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' } text-[15px] font-[700]`}>- Yakuniy test</NavLink>
              </div>
            )}
          </div>

          <div>
            <div onClick={() => toggleMenu('darslar')} className={`flex items-center justify-between py-3 px-4 cursor-pointer ${isDark ? 'hover:bg-white  hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'} `}>
              <span className='flex gap-2 items-center'>📚 {!collapsed && <span>Darslar</span>}</span>
              <MdOutlineKeyboardArrowRight className={`transform transition duration-300 ${activeMenu === 'darslar' ? 'rotate-90' : ''}`} />
            </div>
            {activeMenu === 'darslar' && (
              <div className='flex flex-col text-[15px]'>
                <NavLink to='/lessons/1' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Modul qo'shish</NavLink>
                <NavLink to='/lessons/2' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Dars qo'shish</NavLink>
                <NavLink to='/lessons/3' className={`hover:text-gray-800 py-3 pl-8 ${isDark ? 'hover:bg-white' : 'hover:bg-gray-500 hover:text-white' }`}>- Test qo'shish</NavLink>
              </div>
            )}
          </div>

          <NavLink to='/ads'
            className={`flex items-center gap-3 py-3 px-4 ${isDark ? 'hover:bg-white  hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'}`}>
            <FaAd /> {!collapsed && <span>Reklamalar</span>}
          </NavLink>

          <NavLink to='/regions'
            className={`flex items-center gap-3 py-3 px-4 ${isDark ? 'hover:bg-white  hover:text-gray-800' : 'hover:bg-gray-500 hover:text-white'}`}>
            <MdOutlineAddLocationAlt /> {!collapsed && <span>Viloyatlar</span>}
          </NavLink>
      
          <span onClick={logOut} className={`flex items-center gap-2 border py-3 px-4 mx-1 rounded-md text-gray-700 bg-white font-[600] hover:bg-[#dad9d9] cursor-pointer active:scale-95 duration-620`}>
            <MdExitToApp className='text-2xl' /> {!collapsed && <span>Chiqish</span>}
          </span>
        </div>
      </main>
    </aside>
  )
}

export default Sitebar
