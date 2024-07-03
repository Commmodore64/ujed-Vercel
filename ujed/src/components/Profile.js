import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? (
    <div className="flex mt-28 h-96 m-8 bg-[#D9D9D9] rounded-xl p-5 text-black">
      <img className="rounded-full w-32 h-32 mr-4" src={user.picture} alt={user.name} />
      <div className="flex flex-col ml-4">
        <p className="text-gray-700 mb-2">Email:</p>
        <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
          <p className="">{user.email}</p>
        </div>
        {/* Aquí puedes agregar más información del usuario si lo deseas */}
      </div>
      <div className="flex flex-col ml-4">
        <p className="text-gray-700 mb-2">Nickname:</p>
        <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
          <p className="">{user.nickname}</p>
        </div>
        {/* Aquí puedes agregar más información del usuario si lo deseas */}
      </div>
    </div>
  ) : null;
};

export default Profile;
