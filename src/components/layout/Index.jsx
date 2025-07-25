import { React, useEffect } from "react";
import Header from "../header/Index";
import { Outlet, useNavigate } from "react-router-dom";
import Sitebar from "../sitebar/Index";

const Adminlayout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/statictics");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <Sitebar />
      <div>
        <main className="mt-[90px] ml-[320px]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Adminlayout;
