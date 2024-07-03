import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import LogoUJED from '../../img/logo-banner-red.png';


const Index = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <aside className="text-black w-80 h-screen flex flex-col">
      <div className="p-4">
        <img src={LogoUJED} alt="Logo UJED" className="w-56 mx-auto" />
      </div>
      <nav className="flex-1 border-r border-gray-300">
        <ul className="space-y-4 flex flex-col">
          <li>
            <Link to="/profile" className="block font-semibold rounded-lg mx-5 py-2 px-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out">Profile</Link>
          </li>
          <li>
            <Link to="/settings" className="block font-semibold rounded-lg mx-5 ml-5 py-2 px-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out">Settings</Link>
          </li>
          {/* Agrega más enlaces según sea necesario */}
        </ul>
      </nav>
      <div className="mt-auto p-4">
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Index;
