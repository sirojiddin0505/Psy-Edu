import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const {register, handleSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try{
            const res = await axios.post('https://testpsyedu.limsa.uz/auth/login',{
                phone: data.phone,
                password: data.password,
            });
            localStorage.setItem("token", res?.data?.access_token)
            navigate('/')            
        }catch(err){
            console.error(err)
        }
    }
  return (
    <section className='min-h-screen flex justify-center items-center w-full bg-cover bg-center' style={{ backgroundImage: 'url("/miya_rasmi.jpg")' }}>
        <div className='container mx-auto backdrop-blur flex flex-col items-center max-w-[400px] shadow-2xl border-white rounded-xl py-8 px-2 md:mr-40'>
           <div><FaUserCircle className='text-white text-[70px]'/></div>
           <h1 className='text-3xl text-white font-[700] py-4 pb-6'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-1 w-full px-4 relative'>
                <label className='block text-white font-[600]'>Phone Number</label>
                <input type="text" placeholder='+998*********'  className='border border-white py-2 px-2 rounded-md focus:ring-1 focus:ring-[#204d74] focus:border-[#204d74] outline-none w-full mb-4' {...register('phone', {required:"login kiriting", minLength:{message:"kamida 5 ta belgi kiriting", value:5}})} />
                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                <label className='block text-white font-[600]'>Password</label>
                <input type={showPassword ? "text" : "password"} placeholder='********' className='border block border-white py-2 px-2 rounded-md focus:ring-1 focus:ring-[#204d74] focus:border-[#204d74] w-full outline-none' {...register('password', {required:"password kiriting", minLength:{message:"kamida 8 ta belgi kiriting", value:8}})}/>
                <span onClick={() => setShowPassword(!showPassword)} className='absolute top-32 right-7 text-gray-600 cursor-pointer'>{showPassword ? <FaEyeSlash/> : <FaEye/>}</span>
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                <button type='submit' className='py-3 px-6 mt-6 w-full rounded-md text-white font-bold cursor-pointer bg-gradient-to-r from-[#204d74] to-[rgb(55, 55, 55)] hover:from-[#0c4568] active:scale-95 duration-575'>Login</button>
            </form>
        </div>
    </section>
  )
}

export default LoginPage