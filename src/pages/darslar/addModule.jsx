import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function AddModule() {
  const dark = useSelector((state) => state.darkMode.dark);

  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const getModules = async () => {
    try {
      const res = await axios.get("https://testpsyedu.limsa.uz/course-module");
      setModules(res?.data?.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Ma'lumotlarni yuklashda xatolik.");
    }
  };

  const handleAddOrEditModule = async () => {
    if (!title  || !order ) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    try {
      if (isEditing) {
        await axios.patch(`https://testpsyedu.limsa.uz/course-module/${editId}`, {
          title: title,
          order: order,
        });
        toast.success("Modul muvaffaqiyatli yangilandi.");
      } else {
        await axios.post("https://testpsyedu.limsa.uz/course-module", {
          title: title,
          order: order,
        });
        toast.success("Yangi modul qo‘shildi.");
      }

      setTitle("");
      setOrder("");
      setIsEditing(false);
      setEditId(null);
      setShowModal(false);
      getModules();
    } catch (err) {
      console.error("Xatolik:", err);
      toast.error("Saqlashda xatolik yuz berdi.");
    }
  };

  const handleEditClick = (module) => {
    setIsEditing(true);
    setEditId(module.id);
    setTitle(module.title);
    setOrder(module.order.toString());
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteModule = async () => {
    setLoadingDelete(true);
    try {
            console.log("Deleting module with ID:", deleteId);

      await axios.delete(`https://testpsyedu.limsa.uz/course-module/${deleteId}`);
      toast.success("Modul o‘chirildi.");
      getModules();
    } catch (err) {
      console.error(err);
      toast.error("Modulni o‘chirishda xatolik yuz berdi.");
    } finally {
      setLoadingDelete(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen py-10 px-4 sm:px-6 lg:px-8`}>
      <Toaster position="top-right" />

      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-8 mt-5">Modullar</h1>

      <div className={`shadow-md rounded-xl p-4 sm:p-6 max-w-6xl mx-auto ${dark ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Modullarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`border px-4 py-2 rounded-md w-full sm:w-2/3 ${dark ? "bg-gray-700 text-white border-gray-600" : "border-gray-300"}`}
          />
          <button
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setTitle("");
              setOrder("");
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
          >
            Modul qo'shish
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className={`${dark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}>
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Module</th>
                <th className="py-3 px-4 text-left">Order</th>
                <th className="py-3 px-4 text-left">Boshqarish</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((module, i) => (
                <tr className={`${dark ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t"}`} key={module.id}>
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4">{module.title}</td>
                  <td className="py-3 px-4 text-green-500">{module.order}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-4">
                      <button className="text-green-400 hover:text-green-500" onClick={() => handleEditClick(module)}>
                        <FaPen />
                      </button>
                      <button className="text-red-400 hover:text-red-500" onClick={() => confirmDelete(module.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredModules.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Mos modul topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

       {showModal && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"} p-6 rounded-xl w-full max-w-md shadow-lg relative`}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              {isEditing ? "Modulni Tahrirlash" : "Yangi Modul Qo'shish"}
            </h2>
            <input
              type="text"
              placeholder="Modul nomi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full border rounded-md px-4 py-2 mb-4 ${dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
            />
            <input
              type="number"
              placeholder="Order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={`w-full border rounded-md px-4 py-2 mb-4 ${dark ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
            />
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setTitle("");
                  setOrder("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddOrEditModule}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {isEditing ? "Yangilash" : "Qo'shish"}
              </button>
            </div>
          </div>
        </div>
      )}
 
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"} p-6 rounded-xl max-w-sm w-full`}>
            <h2 className="text-lg font-semibold mb-4">Modulni o‘chirishni tasdiqlaysizmi?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteId(null);
                }}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleDeleteModule}
                className={`px-4 py-2 rounded-md text-white ${loadingDelete ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"}`}
                disabled={loadingDelete}
              >
                {loadingDelete ? "O‘chirilmoqda..." : "Ha, o‘chirish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
