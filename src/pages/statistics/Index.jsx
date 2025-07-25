import React, { useEffect, useState } from "react";
import { API } from "../../../../../psy-edu3/Psy-Edu/src/components/api/api";
import ChartGraph from "../../../../../psy-edu3/Psy-Edu/src/components/ChartGraph";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const [statistic, setStatistic] = useState([]);
  const [region, setRegion] = useState([]);
  const [boshlangich, setBoshlangich] = useState([]);
  const [yakuniy, setYakuniy] = useState([]);
  const [natija, setNatija] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      getStatistics();
    } else {
      navigate("/login");
    }
  }, []);

  const getStatistics = async (e) => {
    try {
      const res = await API.get("/statistics/regions");
      console.log(res.data.data);
      setStatistic(res.data.data);
      setRegion(res.data.data.map((item) => item.regionName));
      setBoshlangich(
        res.data.data.map((item) => item.averageInitialPercentage)
      );
      setYakuniy(res.data.data.map((item) => item.averageFinalPercentage));
      setNatija(res.data.data.map((item) => item.growthPercentage));
    } catch (err) {
      console.error(err);
    }
  };
  const getExelFile = async () => {
    try {
      const response = await API.get("/statistics/export/excel", {
        responseType: "blob",
        withCredentials: true,
      });
      const disposition = response.headers["content-disposition"];
      const fileNameMatch = disposition?.match(/filename="?(.+)"?/);
      const fileName = fileNameMatch ? fileNameMatch[1] : "file.xlsx";

      // Создаем ссылку на blob и кликаем
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="bg-[#e0e0e08d]">
        <div className="p-4 max-w-full overflow-x-auto">
          <table className="min-w-full border text-sm text-center border-gray-200 shadow rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">VILOYATLAR</th>
                <th className="p-3 border">BOSHLANGICH %</th>
                <th className="p-3 border">YAKUNIY %</th>
                <th className="p-3 border">NATIJA %</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {statistic.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 == 0 ? "border-t" : "bg-gray-50 border-t"}
                >
                  <td className="p-2 border">{row.regionName}</td>
                  <td className="p-2 border ">
                    {row.averageInitialPercentage}%
                  </td>
                  <td className="p-2 border">{row.averageFinalPercentage}%</td>
                  <td
                    className={`p-2 border ${
                      row.growthPercentage == "0"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {row.growthPercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-center">
            <button
              onClick={getExelFile}
              className="bg-white cursor-pointer text-green-600 border border-green-400 rounded-md w-full py-2 hover:bg-green-50"
            >
              Excel formatda olish
            </button>
          </div>
        </div>
        <div className="p-4 max-w-full overflow-x-auto">
          <ChartGraph
            region={region}
            boshlangich={boshlangich}
            natija={natija}
            yakuniy={yakuniy}
          />
        </div>
      </div>
    </>
  );
};

export default Statistics;
