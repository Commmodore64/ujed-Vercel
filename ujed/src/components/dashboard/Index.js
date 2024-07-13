import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdLastPage } from "react-icons/md";
import Sidebar from "../sidebar/Index";

const Index = () => {
  const { user, isAuthenticated } = useAuth0();
  const [matricula, setMatricula] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cursos, setCursos] = useState([]);
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

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cursos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Cursos obtenidos:", data);
          setCursos(data);
        } else {
          console.error("Error al obtener los cursos:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchCursos();
  }, []);
  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-28 h-auto m-8 bg-[#c06870] rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        {/* Primera fila */}
        <div className="flex flex-col lg:flex-row w-full mt-3">
          <div className="flex flex-col h-auto w-full lg:w-2/3 bg-[#f6f8fe] rounded-xl p-5 text-black lg:mx-2 shadow-md font-semibold">
            <h2 className="text-2xl font-bold justify-start">
              Bienvenido {nombreCompleto} !
            </h2>
          </div>
          <div className="flex flex-col h-auto w-full lg:w-1/3 bg-[#f6f8fe] rounded-xl p-5 text-black lg:mx-2 shadow-md font-semibold">
            {/* Aquí puedes agregar contenido para el nuevo cuadro blanco */}
            <h1 className="text-2xl font-bold mb-4">Cursos disponibles</h1>
            <div className="grid grid-cols-1 gap-4">
              {cursos.map((curso) => (
                <div
                  key={curso.id}
                  className="bg-white p-4 shadow-md rounded-md"
                >
                  <li className="text-sm">{curso.nombre}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Segunda fila */}
        <div className="flex flex-col lg:flex-row w-full mt-10">
          <div className="flex flex-col h-auto w-full lg:w-1/3 bg-[#f6f8fe] rounded-xl p-5 text-black lg:mx-2 shadow-md font-semibold">
            {/* Aquí puedes agregar contenido para el cuadro de 1/3 */}
            <h2 className="text-2xl font-normal justify-start">Cuadro 1/3</h2>
          </div>
          <div className="flex flex-col h-auto w-full lg:w-2/3 bg-[#f6f8fe] rounded-xl p-5 text-black lg:mx-2 shadow-md font-semibold">
            {/* Aquí puedes agregar contenido para el cuadro de 2/3 */}
            <h2 className="text-2xl font-normal justify-start">Cuadro 2/3</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
