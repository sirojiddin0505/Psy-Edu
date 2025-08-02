import React from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../store/changeTheme'

const Header = ({collapsed, setCollapsed}) => {

  const dispatch = useDispatch()
  const store = useSelector((state) => state.darkMode.dark)

  return (
    <section className={`${store ? "bg-[#212130] border border-[#212130]" : "bg-[white] border border-gray-700"} fixed top-0 left-0 right-0 `}>
      <div className={`py-4 px-4 ${collapsed ? 'pl-[90px]' : 'pl-[254px]'} transition-all duration-300`}>
          <div className='flex justify-between items-center'>
            <span onClick={() => setCollapsed(!collapsed)}><CgMenuLeft className={`${store ? "text-4xl text-white cursor-pointer" : "text-gray-700 text-4xl cursor-pointer"}`} /></span>
            <span onClick={() => dispatch(changeTheme())}>{store}{store ? <FaSun className='text-white text-3xl cursor-pointer'/> : <FaMoon className='text-gray-700 text-3xl cursor-pointer'/> }</span>
          </div>
        </div>
    </section>
  )
}

export default Header 