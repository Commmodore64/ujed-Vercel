import React from "react";
import Sidebar from "../sidebar/Index";

const Index = () => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          <h1 className="text-2xl font-bold">Consultas</h1>
          <p className="mt-2 text-md text-gray-600">
            En este apartado, podrás gestionar y realizar los pagos de tus consultas médicas de manera rápida y segura.
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
