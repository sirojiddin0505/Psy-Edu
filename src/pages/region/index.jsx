import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const RegionPage = () => {
  const [modal, setModal] = useState(false);
  const [region, setRegion] = useState([]);
  const [name, setName] = useState("");
  const [select, setSelect] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false)
  const [search, setSearch] = useState('')

  const payload = {name: name};
  const token = localStorage.getItem('token');

  const getRegions = async () => {
    try {
      const res = await axios.get('https://testpsyedu.limsa.uz/region');
      setRegion(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  const addRegion = async (e) => {
    e.preventDefault();
    try {
      select 
      ? await axios.post(`https://testpsyedu.limsa.uz/region`, payload)
      : await axios.patch(`https://testpsyedu.limsa.uz/region/${select}`, payload)
      setSelect(null)
      setModal(false);
      setName('');
      getRegions();
    } catch (error) {
      console.error(error);
    }
  };

  const editRegion = async (id) => {
  try {
    await axios.patch(`https://testpsyedu.limsa.uz/region/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setModal(false);
    setSelect(null);
    getRegions();
  } catch (error) {
    console.error(error);
  }
  };

  const deleteRegion = async (id) => {
    try {
      await axios.delete(`https://testpsyedu.limsa.uz/region/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteModal(false);
      alert("Viloyat muvaffaqiyatli o'chirildi");
      getRegions();
    } catch (error) {
      console.error(error);
      alert("O‘chirishda xatolik yuz berdi");
    }
  };

  const filterRegions = region.filter(region => region.name.toLowerCase().includes(search.toLowerCase()))
  const isDark = useSelector((state) => state.darkMode.dark)
  
  return (
    <section className={`${isDark ? 'bg-[#111010a0]' : 'bg-gray-200'} min-h-screen w-full p-5 mt-20 rounded-md`}>
      <div className='container mx-auto'>
        <h1 className={`text-3xl font-[700] text-center ${isDark ? 'text-white' : 'text-gray-800' } `}>Viloyatlar</h1>
        <div className={`${isDark ? 'bg-[#1b1b3a6a]' : 'bg-white shadow-xl'} text-white mx-auto rounded-md flex justify-between gap-6 py-6 px-6 my-6`}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={`border ${isDark ? 'border-[#ffff] focus:bg-[#1414256a]' : 'border-gray-800 focus:bg-[#efefefc9] text-gray-900'} p-2 rounded-lg outline-none max-w-[600px] w-full`} placeholder='Qidiring' />
          <button className='p-3 rounded-lg cursor-pointer bg-[#6a73fa] hover:bg-[#6d74c6] active:scale-95 duration-425' onClick={() => {setModal(true), setSelect(null), setName("")}}>Viloyat Qo'shish</button>
        </div>
        <div className='rounded-xl'>
          <table className='w-full text-center rounded-2xl'>
            <thead className='rounded-2xl'>
              <tr className={`${isDark ? 'bg-[#1e1e2ad8] text-white' : 'bg-white text-gray-800'} `}>
                <th className={`${isDark ? 'border-[#ffff]' : 'border-gray-800'} border px-4 py-2 text-lg`}>№</th>
                <th className={`${isDark ? 'border-[#ffff]' : 'border-gray-800'} border px-4 py-2 text-lg`}>Viloyat</th>
                <th className={`${isDark ? 'border-[#ffff]' : 'border-gray-800'} border px-4 py-2 text-lg`}>Boshqarish</th>
              </tr>
            </thead>
            <tbody>
              {filterRegions.map((regions, index) => (
                <tr key={regions.id} className={`${isDark ? 'text-[#ffff] bg-[#212128aa]' : 'text-gray-700 bg-white'} `}>
                  <td className={`border ${isDark ? 'border-[#ffff]' : 'border-gray-800'} px-4 py-2 font-bold`}>{index + 1}</td>
                  <td className={`border ${isDark ? 'border-[#ffff]' : 'border-gray-800'} px-4 py-2 font-bold`}>{regions.name}</td>
                  <td className={`border ${isDark ? 'border-[#ffff]' : 'border-gray-800'} px-4 py-2 font-bold`}>
                    <div className='flex justify-center gap-10 items-center'>
                      <span onClick={() => setModal(true)}><RiEdit2Fill className='text-green-600 cursor-pointer' /></span>
                      <span onClick={() => setDeleteModal(true)}><MdDelete className='text-red-500 cursor-pointer' /></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modal && (
          <div onClick={() => {setModal(false); setName(""); setSelect(null);}} className='fixed inset-0 bg-black/70 flex justify-center items-center z-50'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white max-w-[500px] w-full py-5 px-6 rounded-lg shadow-lg'>
              <h2 className='text-center pb-3 text-[22px] font-bold'>Viloyat {select ? "tahrirlash" : "qo'shish"}</h2>
              <input value={name} onChange={(e) => setName(e?.target?.value)} type='text' placeholder='Viloyat kiriting' className='w-full border-2 border-gray-300 rounded px-3 py-2 mb-4 outline-none focus:border-[#6a73fa]'/>
              <button onClick={select ? editRegion(region.id) : addRegion()} className='w-full bg-[#6a73fa] text-white py-2 rounded hover:bg-[#7278c9] cursor-pointer active:scale-97 duration-325'>{select ? "Tahrirlash" : "Qo'shish"}</button>
            </div>
          </div>
        )}
        
        {deleteModal && (
          <div onClick={() => setDeleteModal(false)} className='flex justify-center items-center fixed top-0 left-0 bg-black/70 w-[100vw] h-[100vh]'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white w-[400px] p-5 rounded-md'>
              <h1 className='text-center text-2xl text-gray-800 font-bold pb-5'>Viloyat o'chirilsinmi</h1>
              <span className='flex justify-end items-center gap-3'>
                <button onClick={() => deleteRegion(region.id)} className='bg-red-500 text-white px-5 py-2 hover:opacity-75 cursor-pointer rounded-md'>Ha</button>
                <button onClick={() => setDeleteModal(false)} className='bg-green-500 text-white px-5 py-2 hover:opacity-75 cursor-pointer rounded-md'>Yo'q</button>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionPage;
