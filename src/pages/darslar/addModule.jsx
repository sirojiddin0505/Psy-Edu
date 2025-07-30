import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function AddModule() {
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");

  const getModules = async () => {
    try {
      const res = await axios.get("https://testpsyedu.limsa.uz/course-module");
      setModules(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddModule = async () => {
    if (!title.trim() || !order.trim()) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    try {
      await axios.post("https://testpsyedu.limsa.uz/course-module", {
        title: title.trim(),
        order: Number(order),
      });

      // Reset form, close modal, and refresh data
      setTitle("");
      setOrder("");
      setShowModal(false);
      getModules();
    } catch (err) {
      console.error("Modulni qo‘shishda xatolik:", err);
      alert("Modulni qo‘shishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Modullar</h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Modullarni qidirish..."
            className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-2/3"
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
          >
            Modul qo'shish
          </button>
        </div>

        <table className="mt-6 w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Module</th>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Boshqarish</th>
            </tr>
          </thead>
          <tbody>
            {modules?.map((module, i) => (
              <tr className="bg-white border-t" key={module.id}>
                <td className="py-3 px-4">{i + 1}</td>
                <td className="py-3 px-4">{module.title}</td>
                <td className="py-3 px-4 text-green-600">{module.order}</td>
                <td className="py-3 px-4 flex gap-4">
                  <button className="text-green-600 hover:text-green-800">
                    <FaPen />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Yangi Modul Qo'shish
            </h2>
            <input
              type="text"
              placeholder="Modulni kiriting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            />
            <input
              type="number"
              placeholder="Orderni kiriting"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddModule}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Yangi Modulni qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
