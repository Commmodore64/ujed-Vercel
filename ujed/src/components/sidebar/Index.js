import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import LogoUJED from "../../img/logo-banner-red.png";
import { IoIosHome, IoIosSettings, IoIosCash } from "react-icons/io";
import { IoShare, IoMenu } from "react-icons/io5";

const Index = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (location.pathname === "/") {
    return null;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-black bg-gray-300"
      : "text-black hover:bg-gray-300";
  };

  return (
    <div className="flex">
      <button
        className="lg:hidden p-4 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <IoMenu size={30} />
      </button>
      <aside
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
        style={{
          backdropFilter: isOpen ? "blur(8px)" : "none", // Aplica el efecto de vidrio difuminado solo cuando isOpen es true
          backgroundColor: isOpen ? "rgba(255, 255, 255, 0.8)" : "transparent", // Fondo semi-transparente
        }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Link to="/dashboard">
              <img
                src={LogoUJED}
                alt="Logo UJED"
                className="w-56 mx-auto cursor-pointer"
                onClick={closeSidebar}
              />
            </Link>
          </div>
          <nav className="flex-1 border-r border-gray-300">
            <ul className="space-y-4 flex flex-col">
              <li>
                <Link
                  to="/dashboard"
                  className={`flex flex-row items-center font-semibold rounded-lg mx-5 py-2 px-4 transition duration-300 ease-in-out ${getLinkClass(
                    "/dashboard"
                  )}`}
                  onClick={closeSidebar}
                >
                  <IoIosHome className="mr-4" size={25} color="#B11830" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/payments"
                  className={`flex flex-row font-semibold rounded-lg mx-5 ml-5 py-2 px-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out ${getLinkClass(
                    "/payments"
                  )}`}
                  onClick={closeSidebar}
                >
                  <IoIosCash className="mr-4" size={24} color="#B11830" />
                  Pagos
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`flex flex-row items-center font-semibold rounded-lg mx-5 py-2 px-4 text-black hover:bg-gray-300 transition duration-300 ease-in-out ${getLinkClass(
                    "/profile"
                  )}`}
                  onClick={closeSidebar}
                >
                  <IoIosSettings className="mr-4" size={25} color="#B11830" />
                  Perfil
                </Link>
              </li>
              {/* Agrega más enlaces según sea necesario */}
            </ul>
          </nav>
          <div className="mt-auto p-4 font-semibold">
            <Link
              to="https://www.ujed.mx/"
              className="flex flex-row font-semibold ml-3 py-2 px-1 text-black"
              onClick={closeSidebar}
            >
              <IoShare className="mr-4" size={24} color="#B11830" />
              UJED
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Index;
