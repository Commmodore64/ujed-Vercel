import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdLastPage } from "react-icons/md";

const Index = () => {
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
            setFechaNacimiento(data.fecha_nacimiento.split("T")[0]);
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

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col mt-16 lg:mt-28 h-auto m-8 bg-[#c06870] rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
      <div className="flex flex-col h-auto mt-3 bg-[#f6f8fe] rounded-xl p-5 text-black lg:mx-20 shadow-md font-semibold">
        <h2 className="text-2xl font-normal justify-start">Bienvenido <br/> {nombreCompleto} !</h2>
      </div>
    </div>
  );
};

export default Index;
