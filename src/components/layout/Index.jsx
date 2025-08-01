import { React } from "react";
import Header from "../header/Index";
import { Outlet } from "react-router-dom";
import Sitebar from "../sitebar/Index";

const Adminlayout = () => {

  return (
    <>
      <Header />
      <Sitebar />
      <div>
        <main className='mt-[80px] ml-65 '>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Adminlayout;
