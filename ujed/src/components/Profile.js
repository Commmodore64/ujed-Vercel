// Profile.js

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [matricula, setMatricula] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  useEffect(() => {
    const obtenerDatosAlumno = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/alumnos/${user.sub}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Incluir aquí el token JWT si es necesario para la autenticación
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setMatricula(data.matricula || "");
            setNombreCompleto(data.nombre_completo || "");
            setTelefono(data.telefono || "");
            setFechaNacimiento(data.fecha_nacimiento.split('T')[0]);
          }
        } else {
          console.error(
            "Error al obtener datos del alumno:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    if (isAuthenticated) {
      obtenerDatosAlumno();
    }
  }, [isAuthenticated]);

  // Función para enviar datos al servidor
  const enviarDatos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          id: user.sub,
          matricula: matricula,
          nombre_completo: nombreCompleto,
          telefono: telefono,
          fecha_nacimiento: fechaNacimiento,
        }),
      });
      console.log("Datos del alumno:", {
        email: user.email,
        id: user.sub,
        matricula: matricula,
        nombre_completo: nombreCompleto,
        telefono: telefono,
        fecha_nacimiento: fechaNacimiento,
      });

      if (response.ok) {
        console.log("Datos del alumno enviados correctamente");
        // Aquí podrías mostrar un mensaje de éxito o actualizar el estado de tu componente
      } else {
        console.error("Error al enviar datos del alumno");
        // Manejar el error, mostrar mensaje al usuario, etc.
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col mt-28 h-auto m-8 bg-[#D9D9D9] rounded-xl p-5 text-black mx-20">
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
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Número de Teléfono</p>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Nombre Completo</p>
          <input
            type="text"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700 mb-2">Fecha de Nacimiento</p>
          <div className="p-2 border border-gray-300 rounded-lg bg-[#b3b3b3] text-black flex items-center">
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="bg-transparent text-black"
            />
          </div>
        </div>
      </div>
      {/* Botón para enviar datos al servidor */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-80 rounded-lg mt-4"
        onClick={enviarDatos}
      >
        Guardar Cambios
      </button>
      {/* Línea separadora */}
      <hr className="mt-10 border-gray-400 w-full" />
    </div>
  );
};

export default Profile;
