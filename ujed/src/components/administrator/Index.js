import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Index";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Index = () => {
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nombreCurso, setNombreCurso] = useState("");
  const [infoCurso, setInfoCurso] = useState("");
  const [cursoId, setCursoId] = useState(null); // Estado para almacenar el ID del curso seleccionado para editar

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

  const limpiarCampos = () => {
    setNombreCurso("");
    setInfoCurso("");
    setCursoId(null);
  };

  const handleAgregarCurso = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreCurso,
          info: infoCurso,
        }),
      });

      if (response.ok) {
        const nuevoCurso = await response.json();
        console.log("Curso agregado:", nuevoCurso);
        setCursos([...cursos, nuevoCurso]);
        setShowModal(false); // Cerrar el modal después de agregar el curso
        limpiarCampos(); // Limpiar los campos del formulario
      } else {
        console.error("Error al agregar el curso:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditarCurso = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cursos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const curso = await response.json();
        console.log("Curso obtenido para editar:", curso);
        setNombreCurso(curso.nombre);
        setInfoCurso(curso.info);
        setCursoId(id);
        setShowModal(true);
      } else {
        console.error("Error al obtener el curso para editar:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleActualizarCurso = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cursos/${cursoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreCurso,
          info: infoCurso,
        }),
      });

      if (response.ok) {
        const cursoActualizado = await response.json();
        console.log("Curso actualizado:", cursoActualizado);

        const updatedCursos = cursos.map((curso) =>
          curso.id === cursoId ? { ...curso, nombre: cursoActualizado.nombre, info: cursoActualizado.info } : curso
        );
        setCursos(updatedCursos);
        setShowModal(false); // Cerrar el modal después de actualizar el curso
        limpiarCampos(); // Limpiar los campos del formulario
      } else {
        console.error("Error al actualizar el curso:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEliminarCurso = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cursos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Curso eliminado:", id);
        const filteredCursos = cursos.filter((curso) => curso.id !== id);
        setCursos(filteredCursos);
      } else {
        console.error("Error al eliminar el curso:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-28 h-auto m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96 ">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Consultar Cursos</h1>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={() => {
                setShowModal(true);
                limpiarCampos(); // Limpiar los campos al abrir el modal de agregar curso
              }}
            >
              Agregar Curso
            </button>
          </div>
          <h2 className="text-lg text-gray-700 font-semibold">Cursos Disponibles</h2>
          <div className="grid grid-cols-1 gap-4">
            {cursos.map((curso) => (
              <div key={curso.id} className="bg-white p-4 shadow-md rounded-md relative mt-3 mx-20">
                <h2 className="text-lg font-semibold">{curso.nombre}</h2>
                <p className="text-gray-600">{curso.info}</p>
                <div className="absolute top-0 right-0 flex space-x-2 mt-1 mr-2">
                  <button
                    className="text-xs text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded"
                    onClick={() => handleEditarCurso(curso.id)}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="text-xs text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded"
                    onClick={() => handleEliminarCurso(curso.id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para agregar o editar curso */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4">{cursoId ? "Editar Curso" : "Agregar Nuevo Curso"}</h2>
            <form onSubmit={cursoId ? handleActualizarCurso : handleAgregarCurso}>
              <div className="mb-4">
                <label htmlFor="nombreCurso" className="block text-sm font-medium text-gray-700">
                  Nombre del Curso
                </label>
                <input
                  type="text"
                  id="nombreCurso"
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={nombreCurso}
                  onChange={(e) => setNombreCurso(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="infoCurso" className="block text-sm font-medium text-gray-700">
                  Información del Curso
                </label>
                <textarea
                  id="infoCurso"
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={infoCurso}
                  onChange={(e) => setInfoCurso(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mr-5"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  {cursoId ? "Actualizar Curso" : "Guardar Curso"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
