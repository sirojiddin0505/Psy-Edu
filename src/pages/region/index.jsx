import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';

const RegionPage = () => {
  const [modal, setModal] = useState(false);
  const [regions, setRegions] = useState([]);
  const [name, setName] = useState("");
  const [select, setSelect] = useState(null);

  const token = localStorage.getItem('token');
  const getRegions = async () => {
    try {
      const res = await axios.get('https://testpsyedu.limsa.uz/region');
      setRegions(res?.data?.data);
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
        await axios.post(`https://testpsyedu.limsa.uz/region`, {
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

  const editRegion = async (regions) => {
    try{
        await axios.patch('https://testpsyedu.limsa.uz/region', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setName(regions?.name);
        setSelect(regions?.id);
        setName('')
    }catch(error) {
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
      alert("Viloyat muvaffaqiyatli o'chirildi");
      getRegions();
    } catch (error) {
      console.error(error);
      alert("O‘chirishda xatolik yuz berdi");
    }
  };

  return (
    <section className='min-h-screen w-full p-4'>
      <div className='container mx-auto'>
        <h1 className='text-3xl text-white font-[600] text-center'>Viloyatlar</h1>
        <div className='bg-[#212130] text-white mx-auto rounded-md flex justify-between gap-6 py-5 px-6 my-6'>
          <input type="text" className='border border-[#ffff] p-2 rounded-lg outline-none focus:bg-[#484858] max-w-[600px] w-full' placeholder='Qidiring'/>
          <button className='p-3 rounded-lg cursor-pointer bg-[#6a73fa] hover:bg-[#6d74c6] active:scale-95 duration-425' onClick={() => {setModal(true); setSelect(null); setName("");}}>Viloyat Qo'shish</button>
        </div>
        <div className='rounded-xl'>
          <table className='w-full text-center rounded-2xl'>
            <thead className='rounded-2xl'>
              <tr className='bg-[#212130] text-white'>
                <th className='border border-[#ffff] px-4 py-2 text-lg'>№</th>
                <th className='border border-[#ffff] px-4 py-2 text-lg'>Viloyat</th>
                <th className='border border-[#ffff] px-4 py-2 text-lg'>Boshqarish</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((item, index) => (
                <tr key={item.id} className='text-[#ffff] bg-[#212128]'>
                  <td className='border border-[#ffff] px-4 py-2 font-bold'>{index + 1}</td>
                  <td className='border border-[#ffff] px-4 py-2'>{item.name}</td>
                  <td className='border border-[#ffff] px-4 py-2'>
                    <div className='flex justify-center gap-10 items-center'>
                      <span onClick={() => setModal(true)}><RiEdit2Fill className='text-green-600 cursor-pointer' /></span>
                      <span onClick={() => deleteRegion(regions.id)}><MdDelete className='text-red-500 cursor-pointer' /></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modal && (
          <div onClick={() => {setModal(false); setName(""); setSelect(null);}}className='fixed inset-0 bg-black/70 flex justify-center items-center z-50'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white max-w-[500px] w-full py-5 px-6 rounded-lg shadow-lg'>
              <h2 className='text-center pb-3 text-[22px] font-bold'>Viloyat {select ? "tahrirlash" : "qo'shish"}</h2>
              <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Viloyat kiriting' className='w-full border-2 border-gray-300 rounded px-3 py-2 mb-4 outline-none focus:border-[#6a73fa]'/>
              <button onClick={select ? addRegion() : editRegion()} className='w-full bg-[#6a73fa] text-white py-2 rounded hover:bg-[#7278c9] cursor-pointer active:scale-97 duration-325'>{select ? "Tahrirlash" : "Qo'shish"}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegionPage;
