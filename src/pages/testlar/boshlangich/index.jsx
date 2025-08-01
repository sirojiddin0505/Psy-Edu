import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaSquareCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

function BoshlangichTestPage() {
  const [tests, setTests] = useState([]);
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState([]);
  const [quiz, setQuiz] = useState("");
  const [variant1, setVariant1] = useState("");
  const [variant2, setVariant2] = useState("");
  const [variant3, setVariant3] = useState("");
  const [variant4, setVariant4] = useState("");
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(null);
  const [testId, setTestId] = useState([]);
  const [edit, setEdit] = useState(null);
  const [isEdit, SetIsEdit] = useState(false);
  const token = localStorage.getItem("token");

  const resetForm = () => {
    setQuiz("");
    setVariant1("");
    setVariant2("");
    setVariant3("");
    setVariant4("");
    setSelected(null);
    setSelect(null);
    setEdit(null);
    SetIsEdit(false);
  };
  const AddTest = async (e) => {
    if (!quiz || !variant1 || !variant2 || !variant3 || !variant4 || !select) {
      toast.info("Barcha maydonlarni to‘ldiring!");
      return;
    }
    const data = {
      text: quiz,
      answers: [
        {
          text: variant1,
          isCorrect: selected === "A",
        },
        {
          text: variant2,
          isCorrect: selected === "B",
        },
        {
          text: variant3,
          isCorrect: selected === "C",
        },
        {
          text: variant4,
          isCorrect: selected === "D",
        },
      ],
      testId: testId,
      subcategoryId: select.id,
      lessonId: null,
    };
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.patch(
          `https://testpsyedu.limsa.uz/questions/update/${edit}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Savol muvaffaqiyatli o'zgartirildi.");
      } else {
        await axios.post("https://testpsyedu.limsa.uz/questions", data);
        toast.success("Savol muvaffaqiyatli qo'shildi");
      }
      setOpen(false);
      getTest();
    } catch (err) {
      toast.error("Savol qo'shishni imkoni bo'lmadi");
    }
  };
  const editTest = async (test) => {
    setEdit(test.id);
    setOpen(true);
    SetIsEdit(true);
    setQuiz(test.text);
    setVariant1(test.answers[0].text);
    setVariant2(test.answers[1].text);
    setVariant3(test.answers[2].text);
    setVariant4(test.answers[3].text);

    const correctIndex = test.answers.findIndex((a) => a.isCorrect);
    const options = ["A", "B", "C", "D"];
    setSelected(options[correctIndex] || null);

    const foundTopic = topic.find((t) => t.id === test.subcategory.id);
    setSelect(foundTopic || null);
  };
  const getTestCategory = async () => {
    try {
      const res = await axios.get(
        "https://testpsyedu.limsa.uz/tests/category-type?category=first"
      );
      console.log(res.data.data);
      setTestId(res.data.data.id);
    } catch (err) {
      console.log(err);
    }
  };
  const getTopics = async () => {
    try {
      const res = await axios.get("https://testpsyedu.limsa.uz/subcategories");
      console.log(res.data.data);
      setTopic(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getTest = async () => {
    try {
      const res = await axios.get(
        "https://testpsyedu.limsa.uz/tests/category-type?category=first"
      );
      console.log(res?.data?.data?.questions);
      setTests(res?.data?.data?.questions);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTest = async (id) => {
    try {
      await axios.delete(`https://testpsyedu.limsa.uz/questions/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Test muvaffaqiyatli o'chirildi.");
      setOpen(false);
      getTest();
    } catch (error) {
      toast.error("Testni o'chirishni imkoni bo'lmadi.");
    }
  };
  useEffect(() => {
    getTest();
    getTopics();
    getTestCategory();
  }, []);
  return (
    <div className=" ">
      <ToastContainer />
      <div className="container mx-auto">
        <h2 className="text-[24px] text-white font-[700] text-center py-[10px] ">
          Boshlang'ich testlar
        </h2>
        <div className="px-[15px]  ">
          <form className="flex justify-between items-center rounded-[10px] bg-gray-800 py-[20px] px-[20px] ">
            <input
              className="w-[800px] px-[20px] h-[50px] border-2 border-gray-700 outline-none rounded-[10px] text-white "
              placeholder="Testlarni qidirish..."
              type="text"
            />
            <button
              type="button"
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
              className="bg-blue-500 px-[25px] py-[10px] rounded-[10px] text-white "
            >
              Test yaratish
            </button>
          </form>
        </div>
        <div className="overflow-x-auto px-[15px] rounded-[10px] overflow-hidden py-[15px] ">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-600 text-gray-700">
              <tr className="text-center">
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  №
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  Savol
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  A javob
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  B javob
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  C javob
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  D javob
                </th>
                <th className=" text-white border-2 border-gray-400 px-2 py-2">
                  To'g'ri javob
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  Mavzu
                </th>
                <th className=" text-white border-2 border-gray-400 px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, i) => (
                <tr key={test.id} className="bg-gray-600  ">
                  <td className="text-white border-2 text-center border-gray-400 px-4 py-2">
                    {i + 1}
                  </td>
                  <td className="text-white border-2 border-gray-400 px-4 py-2">
                    {test.text}
                  </td>
                  <td className="text-white border-2 text-center border-gray-400 px-4 py-2">
                    {test.answers[0].text}
                  </td>
                  <td className="text-white border-2 text-center border-gray-400 px-4 py-2">
                    {test.answers[1].text}
                  </td>
                  <td className="text-white border-2 text-center border-gray-400 px-4 py-2">
                    {test.answers[2].text}
                  </td>
                  <td className="text-white border-2 text-center border-gray-400 px-4 py-2">
                    {test.answers[3].text}
                  </td>
                  <td className="text-white border-2 border-gray-400 px-4 py-2 ">
                    {(() => {
                      const correctIndex = test.answers.findIndex(
                        (a) => a.isCorrect
                      );
                      const options = ["A", "B", "C", "D"];
                      return correctIndex !== -1 ? (
                        <span className="flex items-center font-bold justify-center gap-1">
                          <FaSquareCheck className="text-green-400 " />
                          {options[correctIndex]}
                        </span>
                      ) : (
                        "—"
                      );
                    })()}
                  </td>
                  <td className="text-white text-center border-2 border-gray-400 px-4 py-2">
                    {test.subcategory.name}
                  </td>
                  <td className="text-white border-2 border-gray-400 px-4 py-2">
                    <button
                      onClick={() => editTest(test)}
                      className="px-[5px] "
                    >
                      <CiEdit className="text-green-400 text-[20px] " />
                    </button>
                    <button
                      onClick={() => deleteTest(test.id)}
                      className="px-[5px]"
                    >
                      <MdDeleteOutline className="text-red-500 text-[20px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[90%] max-w-[500px] p-6 rounded-2xl shadow-xl"
              >
                <h2 className="text-xl font-bold text-center mb-4">
                  {isEdit ? "Testni tahrirlash" : "Yangi test qo'shish"}
                </h2>
                <form onSubmit={AddTest} className="flex flex-col gap-4">
                  <input
                    onChange={(e) => setQuiz(e.target.value)}
                    type="text"
                    value={quiz}
                    placeholder="Savolni kiriting"
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      value={variant1}
                      onChange={(e) => setVariant1(e.target.value)}
                      type="text"
                      placeholder="A javob"
                      className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      value={variant2}
                      onChange={(e) => setVariant2(e.target.value)}
                      type="text"
                      placeholder="B javob"
                      className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={variant3}
                      onChange={(e) => setVariant3(e.target.value)}
                      type="text"
                      placeholder="C javob"
                      className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      value={variant4}
                      onChange={(e) => setVariant4(e.target.value)}
                      type="text"
                      placeholder="D javob"
                      className="w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      To'g'ri javob:
                    </label>
                    <div className="flex gap-4">
                      {["A", "B", "C", "D"].map((option) => (
                        <label key={option} className="flex items-center gap-1">
                          <input
                            checked={selected === option}
                            onChange={() => setSelected(option)}
                            type="radio"
                            value={option}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Subkategoriya tanlang:
                    </label>
                    <select
                      value={select?.id || ""}
                      onChange={(e) =>
                        setSelect(topic.find((t) => t.id === e.target.value))
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Subkategoriya tanlang</option>
                      {topic.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    {isEdit ? "Tahrirlash" : "Yangi test qo'shish"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoshlangichTestPage;
