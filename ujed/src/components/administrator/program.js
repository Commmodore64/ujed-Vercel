import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Index";
import { Link } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Program = () => {
  const [programas, setProgramas] = useState([]);
  const [nombrePrograma, setNombrePrograma] = useState("");
  const [programaId, setProgramaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/programa", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProgramas(data);
        } else {
          console.error("Error al obtener los programas:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProgramas();
  }, []);

  const handleAgregarPrograma = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/programa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombrePrograma,
        }),
      });

      if (response.ok) {
        const nuevoPrograma = await response.json();
        toast.success("Programa agregado correctamente");
        setProgramas([...programas, nuevoPrograma]);
        setShowModal(false);
        limpiarCampos();
      } else {
        console.error("Error al agregar el programa:", response.statusText);
        toast.error("Error al agregar el programa");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al agregar el programa");
    }
  };

  const handleEditarPrograma = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/programa/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const programa = await response.json();
        setNombrePrograma(programa.nombre);
        setProgramaId(programa.id);
        setShowModal(true);
      } else {
        console.error(
          "Error al obtener el programa para editar:",
          response.statusText
        );
        toast.error("Error al obtener el programa para editar");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al obtener el programa para editar");
    }
  };

  const handleActualizarPrograma = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/programa/${programaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombrePrograma,
          }),
        }
      );

      if (response.ok) {
        const programaActualizado = await response.json();
        toast.success("Programa actualizado correctamente");
        const updatedProgramas = programas.map((programa) =>
          programa.id === programaId
            ? {
                ...programa,
                nombre: programaActualizado.nombre,
              }
            : programa
        );
        setProgramas(updatedProgramas);
        setShowModal(false);
        limpiarCampos();
      } else {
        console.error("Error al actualizar el programa:", response.statusText);
        toast.error("Error al actualizar el programa");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al actualizar el programa");
    }
  };

  const handleEliminarPrograma = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/programa/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.info("Programa eliminado correctamente");
        const filteredProgramas = programas.filter(
          (programa) => programa.id !== id
        );
        setProgramas(filteredProgramas);
      } else {
        console.error("Error al eliminar el programa:", response.statusText);
        toast.error("Error al eliminar el programa");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al eliminar el programa");
    }
  };

  const limpiarCampos = () => {
    setNombrePrograma("");
    setProgramaId(null);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Consultar Programas</h1>
          {/* Botón de Agregar Programa */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
            onClick={() => {
              setShowModal(true);
              limpiarCampos();
            }}
          >
            Agregar Programa
          </button>
          <Link to="/admin">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md ml-4">
            Cursos
          </button>
          </Link>
          <h2 className="text-lg text-gray-700 font-semibold">
            Programas Disponibles
          </h2>
          {/* Modal de Agregar/Editar Programa */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                  {programaId ? "Actualizar Programa" : "Agregar Programa"}
                </h2>
                <input
                  type="text"
                  value={nombrePrograma}
                  onChange={(e) => setNombrePrograma(e.target.value)}
                  placeholder="Nombre del Programa"
                  className="border p-2 mb-4 w-full"
                />
                <button
                  className="bg-gray-500 hover text-white rounded-md px-4 py-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className=" text-white bg-blue-500 hover:bg-blue-600
rounded-md px-4 py-2 ml-2"
                  onClick={
                    programaId
                      ? handleActualizarPrograma
                      : handleAgregarPrograma
                  }
                >
                  {programaId ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
          )}

          {/* Lista de Programas */}
          <ul className="mt-8 mx-24">
            {programas.map((programa) => (
              <li
                key={programa.id}
                className="flex items-center justify-between p-4 border-b"
              >
                <span className="font-semibold">{programa.nombre}</span>
                <div>
                  <button
                    className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded mr-2"
                    onClick={() => handleEditarPrograma(programa.id)}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEliminarPrograma(programa.id)}
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Program;
