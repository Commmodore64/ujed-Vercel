import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Index";
import { useNavigate } from "react-router-dom";
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
  const [vigencia, setVigencia] = useState("");
  const [cupo, setCupo] = useState("");
  const [useAltID, setUseAltID] = useState(false);
  const [rfc, setRFC] = useState(localStorage.getItem('rfc') || "");
  const [curp, setCURP] = useState(localStorage.getItem('curp') || "");

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
    localStorage.setItem('rfc', rfc);
    localStorage.setItem('curp', curp);
  }, [matricula, nombreCompleto, telefono, fechaNacimiento, comentarios, cursoSeleccionado, costoSeleccionado, rfc, curp]);

  useEffect(() => {
    if (cursoSeleccionado) {
      const selectedCurso = cursos.find(curso => curso.nombre === cursoSeleccionado.split("/")[0]);
      if (selectedCurso) {
        setVigencia(selectedCurso.vigencia);
        setCupo(selectedCurso.cupo);
      }
    }
  }, [cursoSeleccionado, cursos]);

  const handlePagoEnLinea = (e) => {
    e.preventDefault();
    if ((!matricula && !rfc && !curp) || !nombreCompleto || !telefono || !fechaNacimiento || !cursoSeleccionado) {
      toast.error("Por favor, complete todos los campos obligatorios.");
    } else if (useAltID && !rfc && !curp) {
      toast.error("Por favor, proporcione RFC o CURP.");
    } else {
      // Manejar la lógica de pago en línea
    }
  };

  const handlePagoEnLineaConTarjeta = (e) => {
    e.preventDefault();
    if ((!matricula && !rfc && !curp) || !nombreCompleto || !telefono || !fechaNacimiento || !cursoSeleccionado) {
      toast.error("Por favor, complete todos los campos obligatorios.");
    } else if (useAltID && !rfc && !curp) {
      toast.error("Por favor, proporcione RFC o CURP.");
    } else {
      navigate("/template");
    }
  };

  const handleLimpiarCampos = () => {
    setMatricula("");
    setNombreCompleto("");
    setTelefono("");
    setFechaNacimiento("");
    setComentarios("");
    setCursoSeleccionado("");
    setCostoSeleccionado("");
    setRFC("");
    setCURP("");
    setUseAltID(false);
    toast.success("Campos limpiados.");
  };

  const phoneMask = [
    /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
  ];

  const isCursoDisponible = () => {
    const hoy = new Date();
    const vigenciaDate = new Date(vigencia);
    return cupo > 0 && hoy <= vigenciaDate;
  };

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
            {!useAltID ? (
              <div className="mb-4">
                <label
                  htmlFor="matricula"
                  className="block text-md font-medium text-gray-700"
                >
                  Matrícula
                </label>
                <input
                  type="text"
                  name="matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                />
                <p className="mt-2 text-sm text-gray-600">
                  No cuentas con matrícula?{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => setUseAltID(true)}
                  >
                    Haz clic aquí
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="rfc"
                    className="block text-md font-medium text-gray-700"
                  >
                    RFC
                  </label>
                  <input
                    type="text"
                    name="rfc"
                    value={rfc}
                    onChange={(e) => setRFC(e.target.value)}
                    className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="curp"
                    className="block text-md font-medium text-gray-700"
                  >
                    CURP
                  </label>
                  <input
                    type="text"
                    name="curp"
                    value={curp}
                    onChange={(e) => setCURP(e.target.value)}
                    className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Tienes matrícula?{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => setUseAltID(false)}
                  >
                    Haz clic aquí
                  </button>
                </p>
              </>
            )}
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
              {cursoSeleccionado && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Vigencia: {new Date(vigencia).toLocaleDateString('es-ES')}</p>
                  <p>Cupo: {cupo}</p>
                </div>
              )}
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
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                rows="3"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePagoEnLinea}
                className="bg-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Pago en Línea
              </button>
              <button
                onClick={handlePagoEnLineaConTarjeta}
                className="bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Pago con Tarjeta
              </button>
              <button
                onClick={handleLimpiarCampos}
                className="bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
