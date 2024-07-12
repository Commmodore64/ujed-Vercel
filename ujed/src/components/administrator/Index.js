import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "../sidebar/Index";

const Index = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-28 h-auto m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96 ">
        <h1 className="text-2xl font-semibold mb-3">Panel de administrador</h1>
        <h2 className="mb-3">Gestionar cursos</h2>
        <li>Curso 1</li>
        <li>Curso 2</li>
        <li>Curso 3</li>
        <li>Curso 4</li>
      </div>
    </>
  );
};

export default Index;
