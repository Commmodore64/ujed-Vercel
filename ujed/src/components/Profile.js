import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? (
    <div className="flex flex-col mt-28 h-auto m-8 bg-[#D9D9D9] rounded-xl p-5 text-black  mx-20">
      <h1 className="text-2xl font-semibold mb-8">Perfil de Usuario</h1>
      <div className="flex">
        <img
          className="rounded-full w-32 h-32 mr-4"
          src={user.picture}
          alt={user.name}
        />
        <div className="flex flex-col ml-4">
          <p className="text-gray-700 mb-2">Correo Electrónico</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <p className="">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-gray-700 mb-2">Nombre de usuario</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <p className="">{user.nickname}</p>
          </div>
        </div>
      </div>
      {/* Línea separadora */}
      <hr className="mt-10 border-gray-400 w-full" />

      {/* Datos del Alumno */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Datos del Alumno</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Matrícula</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <p className="">12345678</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Número de Teléfono</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <p className="">+52 123 456 7890</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Nombre Completo</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <p className="">Juan Pérez</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Fecha de Nacimiento</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <p className="">01/01/2000</p>
          </div>
        </div>
      </div>
      {/* Línea separadora */}
      <hr className="mt-10 border-gray-400 w-full" />
    </div>
  ) : null;
};

export default Profile;
