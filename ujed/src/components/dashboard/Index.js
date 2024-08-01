import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Index";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import  logo  from "../../img/logo-banner-red.png";

const Index = () => {
  const { user, isAuthenticated } = useAuth0();
  const [, setMatricula] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [, setTelefono] = useState("");
  const [, setFechaNacimiento] = useState("");
  const [cursos, setCursos] = useState([]);
  const [ultimaFechaActualizacion, setUltimaFechaActualizacion] = useState("");

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
          //console.log("Cursos obtenidos:", data);
          //console.log(
          //   "Fecha de actualización:",
          //   data.map((data) => data.date)
          // );
          setCursos(data);
          if (data.length > 0) {
            // Encontrar la fecha más reciente
            const fechas = data.map((data) => new Date(data.date));
            const ultimaFecha = new Date(Math.max(...fechas));
            setUltimaFechaActualizacion(ultimaFecha.toLocaleDateString());
          }
        } else {
          console.error("Error al obtener los cursos:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchCursos();
  }, []);
  //console.log("Ultima fecha de actualización:", ultimaFechaActualizacion);

  return (
    <>
      <Sidebar />
      <div className="flex justify-end mr-5">
        <img src={logo} alt="logo ujed" className="w-24 lg:w-36 mt-4 lg:mt-4" />
      </div>
      <div className="flex flex-col mt-1 lg:mt-8 h-auto m-4 lg:m-8 bg-[#c06870] rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        {/* Primera fila */}
        <div className="flex flex-col lg:flex-row w-full mt-3 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col h-auto w-full lg:w-2/3 bg-[#f6f8fe] rounded-xl p-5 text-black shadow-sm font-semibold">
            <h2 className="text-2xl font-bold justify-start">
              Bienvenido {nombreCompleto || ""} !
            </h2>
          </div>
          <div className="flex flex-col h-auto w-full lg:w-1/3 bg-[#f6f8fe] rounded-xl p-5 text-black shadow-sm font-semibold">
            <h1 className="text-2xl font-bold mb-4">Cursos disponibles</h1>
            <div className="grid grid-cols-1 gap-4">
              {cursos.map((curso) => (
                <div key={curso.id} className="">
                  <li className="text-sm text-gray-700">{curso.nombre}</li>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3">
              <Link
                to="/courseinfo"
                className="flex text-gray-900 hover:text-[#B11830] transition duration-300 ease-in-out items-center text-sm m-1 mt-1"
              >
                Más información <IoIosArrowForward className="ml-1 text-sm " />
              </Link>
              {ultimaFechaActualizacion && (
                <p className="text-xs mt-3 text-gray-500">
                  Última actualización:{" "}
                  {ultimaFechaActualizacion || "No disponible"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Segunda fila */}
        <div className="flex flex-col lg:flex-row w-full mt-10 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col h-auto w-full lg:w-1/3 bg-[#f6f8fe] rounded-xl p-5 text-black shadow-sm font-semibold">
            <h2 className="text-2xl font-bold">Especialidades</h2>
            <li className="text-sm p-2 text-gray-700 mt-4">
              Especialidad en Enfermería Quirúrgica
            </li>
            <li className="text-sm p-2 text-gray-700">
              Especialidad en Enfermería en Salud Mental y Psiquiatría
            </li>
            <li className="text-sm p-2 text-gray-700">
              Especialidad en Enfermería en Salud Pública
            </li>
            <li className="text-sm p-2 text-gray-700">
              Especialidad en Enfermería Infantil
            </li>
            <li className="text-sm p-2 text-gray-700">
              Especialidad en Enfermería en Medicina Interna y Terapia Intensiva
            </li>
          </div>
          <div className="flex flex-col h-auto w-full lg:w-2/3 bg-[#f6f8fe] rounded-xl p-5 text-black shadow-sm font-semibold">
            <h2 className="text-2xl font-bold justify-start">
              Información general
            </h2>
            <p className="text-md text-gray-800 mt-4 mb-1">Dirección:</p>
            <p className="text-sm text-gray-700 ">
              Prolongación Blvd. Juan Pablo II 512.
              <br /> Col. Masié. C.P. 34217.
              <br />
              Durango, Dgo. México.
            </p>
            <p className="text-md text-gray-800 mt-4 mb-1">Datos de contacto:</p>
            <p className="text-sm text-gray-700 ">
              Tel. (618) 827 13 70.
              <br />
              E-mail: feo@ujed.mx
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
