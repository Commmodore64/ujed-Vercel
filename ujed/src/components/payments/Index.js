import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Index = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col mt-16 lg:mt-28 h-auto m-8 bg-[#D9D9D9] rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
      <h1 className="text-2xl font-semibold mb-8">Pagos</h1>
      <p>Contenido de la sección de pagos</p>
    </div>
  );
};

export default Index;
