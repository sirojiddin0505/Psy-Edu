import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdClose, MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
// import { useNavigate } from 'react-router-dom';

const RegionPage = () => {
    // const navigate = useNavigate("")
    const [modal, setModal] = useState(false)
    const [regions, setRegions] = useState([])
    const fetchRegions = async() => {
        try{
            const res = await axios.get('https://testpsyedu.limsa.uz/region')
            setRegions(res?.data?.data)
        }catch(error){
            console.error(error); 
        }
    }
    useEffect(() => {
        fetchRegions();
    },[])
    const editRegion = async (id) => {
        try{
            const res = await axios.patch(`https://testpsyedu.limsa.uz/region/${id}`)
            if(res?.status){
                fetchRegions()
            }else{
                alert("Viloyat o'zgartirishda xatolik yuz berdi");
            }
        }catch(error){
            console.error(error);
        }
    }
    const token = localStorage.getItem('token')
    const deleteRegion = async (id) => {
        try{
            const res = await axios.delete(`https://testpsyedu.limsa.uz/region/${id}`, {
                headers:{
                    Authorization:`Bearear ${token}`
                }
            })
            if(res?.status){
                fetchRegions()
            }else{
                alert("Viloyat o'chirishda xatolik yuz berdi");
            }
        }catch(error){
            console.error(error);
        }
    }

  return (
    <section className='min-h-screen w-full p-4'>
        <div className='container mx-auto'>
            <h1 className='text-3xl text-white font-[600] text-center'>Viloyatlar</h1>
            <div className='bg-[#212130] text-white  mx-auto rounded-md flex justify-between gap-6 py-5 px-6 my-6'>
                <input type="text" className='border border-[#ffff] p-2 rounded-lg outline-none focus:bg-[#484858] max-w-[600px] w-full ' placeholder='Qidiring'/>
                <button className='p-3 rounded-lg cursor-pointer bg-[#6a73fa] hover:bg-[#6d74c6] active:scale-95 duration-425' onClick={() => setModal(!modal)}>Viloyat Qo'shish</button>
            </div>
            <div className='rounded-xl '>
                <table className='w-full text-center rounded-2xl '>
                    <thead className='rounded-2xl'>
                        <tr className='bg-[#212130] text-white '>
                            <th className='border border-[#ffff] px-4 py-2 text-lg '>№</th>
                            <th className='border border-[#ffff] px-4 py-2 text-lg '>Viloyat</th>
                            <th className='border border-[#ffff] px-4 py-2 text-lg '>Boshqarish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regions && regions.map((item, index) => (
                            <tr key={item.id} className='text-[#ffff] bg-[#212128]'>
                                <td className='border border-[#ffff] px-4 py-2 font-bold'>{index+1}</td>
                                <td className='border border-[#ffff] px-4 py-2'>{item.name}</td>
                                <td className='border flex justify-center gap-10 py-3 items-center'>
                                    <span onClick={() => editRegion(item.id)}><RiEdit2Fill className='text-green-600 cursor-pointer'/></span>
                                    <span onClick={()=> deleteRegion(item.id)}><MdDelete className='text-red-500 cursor-pointer'/></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal && (
               <div className='fixed inset-0 bg-black/70 bg-opacity-30 flex justify-center items-center z-50'>
                <div className='bg-white max-w-[450px] w-full py-5 px-6 rounded-lg shadow-lg'>
                  <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-[22px] font-bold'>Viloyat qo'shish</h2>
                    <p onClick={() => setModal(false)}><MdClose className='cursor-pointer text-2xl font-[900]' /></p>
                  </div>
                  <input type='text' placeholder='Viloyat kiriting' className='w-full border-2 border-gray-300 rounded px-3 py-2 mb-4 outline-none focus:border-2 focus:border-[#6a73fa]'/>
                  <button  className='w-full bg-[#6a73fa] text-white py-2 rounded hover:bg-[#7278c9] cursor-pointer active:scale-96 duration-455'>Qo'shish</button>
                </div>
              </div>
              
            )}
        </div>
    </section>
  )
}

export default RegionPage