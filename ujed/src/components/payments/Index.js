import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Index";
import { Link, useNavigate } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import { toast } from "sonner";

const Index = () => {
  const [cursos, setCursos] = useState([]);
  const [matricula, setMatricula] = useState(localStorage.getItem('matricula') || "");
  const [nombreCompleto, setNombreCompleto] = useState(localStorage.getItem('nombreCompleto') || "");
  const [telefono, setTelefono] = useState(localStorage.getItem('telefono') || "");
  const [fechaNacimiento, setFechaNacimiento] = useState(localStorage.getItem('fechaNacimiento') || "");
  const [comentarios, setComentarios] = useState(localStorage.getItem('comentarios') || "");
  const [cursoSeleccionado, setCursoSeleccionado] = useState(localStorage.getItem('cursoSeleccionado') || "");
  const [costoSeleccionado, setCostoSeleccionado] = useState(localStorage.getItem('costoSeleccionado') || "");

  const navigate = useNavigate();

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

  useEffect(() => {
    localStorage.setItem('matricula', matricula);
    localStorage.setItem('nombreCompleto', nombreCompleto);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('fechaNacimiento', fechaNacimiento);
    localStorage.setItem('comentarios', comentarios);
    localStorage.setItem('cursoSeleccionado', cursoSeleccionado);
    localStorage.setItem('costoSeleccionado', costoSeleccionado);
  }, [matricula, nombreCompleto, telefono, fechaNacimiento, comentarios, cursoSeleccionado, costoSeleccionado]);

  const handlePagoEnLinea = (e) => {
    if (!matricula || !nombreCompleto || !telefono || !fechaNacimiento || !cursoSeleccionado) {
      e.preventDefault();
      toast.error("Por favor, complete todos los campos obligatorios.");
    }
  };

  const handlePagoEnLineaConTarjeta = (e) => {
    e.preventDefault();
    if (!matricula || !nombreCompleto || !telefono || !fechaNacimiento || !cursoSeleccionado) {
      toast.error("Por favor, complete todos los campos obligatorios.");
    } else {
      navigate("/template");
    }
  };

  const phoneMask = [
    /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ];

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          <h1 className="text-2xl font-bold">Inscripción</h1>
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="nombreCompleto"
                className="block text-md font-medium text-gray-700"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombreCompleto"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="matricula"
                className="block text-md font-medium text-gray-700"
              >
                Matricula
              </label>
              <input
                type="text"
                name="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="telefono"
                className="block text-md font-medium text-gray-700"
              >
                Teléfono
              </label>
              <MaskedInput
                mask={phoneMask}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fechaNacimiento"
                className="block text-md font-medium text-gray-700"
              >
                Fecha de Nacimiento 
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="cursoSeleccionado"
                className="block text-md font-medium text-gray-700"
              >
                Cursos
              </label>
              <select
                name="cursoSeleccionado"
                value={cursoSeleccionado}
                onChange={(e) => {
                  setCursoSeleccionado(e.target.value);
                  setCostoSeleccionado(e.target.value.split("/")[1]);
                }}
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              >
                <option value="" disabled>
                  Selecciona un curso
                </option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.nombre + "/" + curso.costo}>
                    {curso.nombre} - ${curso.costo}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="comentarios"
                className="block text-md font-medium text-gray-700"
              >
                Comentarios
              </label>
              <textarea
                name="comentarios"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                rows="4"
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-2 lg:px-4 mx-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handlePagoEnLinea}
            >
              Pago en línea
            </button>
            <Link
              to="#"
              className="px-2 lg:px-4 mx-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handlePagoEnLineaConTarjeta}
            >
              Pago en línea con tarjeta
            </Link>
            <button
              type="submit"
              className="px-2 mt-2 lg:px-4 mx-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => localStorage.clear()}
            >
              Limpiar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
