import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { user, isAuthenticated } = useAuth0();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col mt-28 h-auto m-8 bg-[#c06870] rounded-xl p-5 text-black mx-20">
      <div className="flex flex-col h-auto mt-3 bg-[#f6f8fe] rounded-xl p-5 text-black mx-20 shadow-md font-semibold">
        Dashboard
      </div>
    </div>
  );
};

export default Index;
