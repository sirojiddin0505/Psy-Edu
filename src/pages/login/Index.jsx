import axios from 'axios'
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [phone, setPhone] = useState('')
    const [password, setPasword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post('https://testpsyedu.limsa.uz/auth/login',{
                phone: phone,
                password: password
            })
            console.log(res.data);
            
        }catch(err){
            console.error(err)
        }
    }

  return (
    <section className='min-h-screen flex justify-center items-center w-full bg-cover bg-center' style={{ backgroundImage: 'url("../../../public/miya_rasmi.jpg")' }}>
        <div className='container mx-auto ml-220'>
            <div className='bg-opacity-95 backdrop-blur-md flex flex-col justify-center items-center max-w-[350px] shadow-md border-white rounded-xl py-8 '>
               <FaUserCircle className='text-white text-6xl'/>
               <h1 className='text-2xl text-white font-semibold py-4 pb-6'>Login</h1>
               <form onSubmit={handleSubmit} className='space-y-1 w-full px-4'>
                  <label className='block text-white font-[600]'>Phone Number</label>
                  <input  type="text" placeholder='+998*********'  className='border border-white py-2 px-2 rounded-md focus:ring-1 focus:ring-[#204d74] focus:border-[#204d74] outline-none  w-full mb-4'/>
                  <label className='block text-white font-[600]'>Password</label>
                  <input type="password" placeholder='********' className='border block border-white py-2 px-2 rounded-md focus:ring-1 focus:ring-[#204d74] focus:border-[#204d74] w-full outline-none '/>
                  <button type='submit' className='py-2 px-6 w-full rounded-md text-white font-bold mt-3 cursor-pointer bg-gradient-to-r from-[#204d74] to-[rgb(55, 55, 55)] hover:from-[#104d74] active:scale-95 duration-575'>Login</button>
               </form>
            </div>
        </div>
    </section>
  )
}

export default LoginPage