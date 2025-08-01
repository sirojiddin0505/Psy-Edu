import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilePdf, FaFilePowerpoint, FaEdit, FaTrash, FaYoutube } from 'react-icons/fa';

export default function AddLesson() {
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    videoUrl: '',
    moduleName: '',
    lessonName: '',
    order: '',
    pdfFile: null,
    pptFile: null,
  });

  const getLessons = async () => {
    try {
      const res = await axios.get('https://testpsyedu.limsa.uz/lessons');
      setLessons(res.data?.data?.data || []);
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  const getMaterial = (materials, type) =>
    materials?.find((m) => m.materialType === type);

  const getYouTubeThumbnail = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ videoUrl: '', moduleName: '', lessonName: '', order: '', pdfFile: null, pptFile: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      await axios.post('https://testpsyedu.limsa.uz/lessons', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      getLessons();
      closeModal();
    } catch (err) {
      console.error('Xatolik:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-6 mt-6">Darslar qo'shish</h1>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Darslarni qidirish..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-md border shadow-sm focus:outline-none"
        />
        <button onClick={openModal} className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2 rounded-md shadow">
          Dars yaratish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {lessons.map((lesson, i) => {
          const pdf = getMaterial(lesson.lessonMaterials, 'pdf');
          const ppt = getMaterial(lesson.lessonMaterials, 'pptx');
          const thumbnail = getYouTubeThumbnail(lesson.videoUrl);

          return (
            <div key={lesson.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                {thumbnail ? (
                  <img src={thumbnail} alt="thumbnail" className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-gray-300 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                {lesson.videoUrl && (
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
                  >
                    <FaYoutube />
                  </a>
                )}
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Module:</strong> {lesson.courseModul?.title || 'Nomaʼlum modul'}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>🎓 Dars:</strong>{' '}
                  <span className="text-purple-600 font-medium">{lesson.title}</span>
                </p>

                {pdf ? (
                  <a
                    href={pdf.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded-md mb-2"
                  >
                    <FaFilePdf /> {pdf.title}
                  </a>
                ) : (
                  <div className="bg-gray-100 text-gray-500 p-2 rounded-md mb-2">
                    PDF mavjud emas
                  </div>
                )}

                {ppt ? (
                  <a
                    href={ppt.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-orange-100 text-orange-700 p-2 rounded-md"
                  >
                    <FaFilePowerpoint /> {ppt.title}
                  </a>
                ) : (
                  <div className="bg-gray-100 text-gray-500 p-2 rounded-md">
                    PPT mavjud emas
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <FaEdit /> Tahrirlash
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <FaTrash /> O‘chirish
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="text-gray-600 hover:text-black"
        >
          &lt;
        </button>
        <span className="text-gray-700 font-medium">Sahifa {currentPage} / 1</span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="text-gray-600 hover:text-black"
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Video yaratish</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="videoUrl"
                placeholder="Video URL"
                value={formData.videoUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <select
                name="moduleName"
                value={formData.moduleName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Modul tanlang</option>
                <option value="psixologiyaa">Psixologiyaa</option>
                <option value="redux">Redux</option>
              </select>
              <input
                type="text"
                name="lessonName"
                placeholder="Dars nomi"
                value={formData.lessonName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                name="order"
                placeholder="Tartib raqami"
                value={formData.order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="file"
                name="pdfFile"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="file"
                name="pptFile"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}