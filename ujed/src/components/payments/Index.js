import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Index";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { toast } from "sonner";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

const Index = () => {
  const [cursos, setCursos] = useState([]);
  const [matricula, setMatricula] = useState(
    localStorage.getItem("matricula") || ""
  );
  const [nombreCompleto, setNombreCompleto] = useState(
    localStorage.getItem("nombreCompleto") || ""
  );
  const [telefono, setTelefono] = useState(
    localStorage.getItem("telefono") || ""
  );
  const [fechaNacimiento, setFechaNacimiento] = useState(
    localStorage.getItem("fechaNacimiento") || ""
  );
  const [comentarios, setComentarios] = useState(
    localStorage.getItem("comentarios") || ""
  );
  const [cursoSeleccionado, setCursoSeleccionado] = useState(
    localStorage.getItem("cursoSeleccionado") || ""
  );
  const [costoSeleccionado, setCostoSeleccionado] = useState(
    localStorage.getItem("costoSeleccionado") || ""
  );
  const [vigencia, setVigencia] = useState("");
  const [cupo, setCupo] = useState("");
  const [useAltID, setUseAltID] = useState(false);
  const [rfc, setRFC] = useState(localStorage.getItem("rfc") || "");
  const [curp, setCURP] = useState(localStorage.getItem("curp") || "");
  const [codigoAcceso, setCodigoAcceso] = useState(""); // Inicializa con cadena vacía
  const [codigoValido, setCodigoValido] = useState(null);

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
    localStorage.setItem("matricula", matricula);
    localStorage.setItem("nombreCompleto", nombreCompleto);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("fechaNacimiento", fechaNacimiento);
    localStorage.setItem("comentarios", comentarios);
    localStorage.setItem("cursoSeleccionado", cursoSeleccionado);
    localStorage.setItem("costoSeleccionado", costoSeleccionado);
    localStorage.setItem("rfc", rfc);
    localStorage.setItem("curp", curp);
  }, [
    matricula,
    nombreCompleto,
    telefono,
    fechaNacimiento,
    comentarios,
    cursoSeleccionado,
    costoSeleccionado,
    rfc,
    curp,
  ]);

  useEffect(() => {
    if (cursoSeleccionado) {
      const selectedCurso = cursos.find(
        (curso) => curso.nombre === cursoSeleccionado.split("/")[0]
      );
      if (selectedCurso) {
        setVigencia(selectedCurso.vigencia);
        setCupo(selectedCurso.cupo);
        // No establecer el código de acceso aquí
      }
    }
  }, [cursoSeleccionado, cursos]);

  const handlePagoEnLinea = (e) => {
    e.preventDefault();
    if (
      (!matricula && !rfc && !curp) ||
      !nombreCompleto ||
      !telefono ||
      !fechaNacimiento ||
      !cursoSeleccionado
    ) {
      toast.error("Por favor, complete todos los campos obligatorios.");
    } else if (useAltID && !rfc && !curp) {
      toast.error("Por favor, proporcione RFC o CURP.");
    } else {
      // Manejar la lógica de pago en línea
    }
  };

  const handlePagoEnLineaConTarjeta = (e) => {
    e.preventDefault();
    if (
      (!matricula && !rfc && !curp) ||
      !nombreCompleto ||
      !telefono ||
      !fechaNacimiento ||
      !cursoSeleccionado
    ) {
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
    /[1-9]/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const isCursoDisponible = () => {
    const hoy = new Date();
    const vigenciaDate = new Date(vigencia);
    return cupo > 0 && hoy <= vigenciaDate;
  };

  const validarCodigoAcceso = async () => {
    try {
      // Encontrar el ID del curso seleccionado
      const selectedCurso = cursos.find(
        (curso) => curso.nombre + "/" + curso.costo === cursoSeleccionado
      );

      if (!selectedCurso) {
        setCodigoValido(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/validar-codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: codigoAcceso,
          id: selectedCurso.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCodigoValido(data.valido);
      } else {
        setCodigoValido(false);
      }
    } catch (error) {
      console.error("Error en la validación del código:", error);
      setCodigoValido(false);
    }
  };

  const mostrarCampoCodigo = () => {
    // Verifica si el curso seleccionado tiene un código asociado
    const selectedCurso = cursos.find(
      (curso) => curso.nombre === cursoSeleccionado.split("/")[0]
    );
    return selectedCurso && selectedCurso.codigo;
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
                    onClick={() => {
                      setUseAltID(true);
                      localStorage.removeItem("matricula");
                      setMatricula("");
                    }}
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
                  Tienes una matrícula?{" "}
                  <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={() => {
                      setUseAltID(false);
                      localStorage.removeItem("rfc");
                      localStorage.removeItem("curp");
                      setRFC("");
                      setCURP("");
                    }}
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
                guide={false}
                type="text"
                name="telefono"
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
                Curso Seleccionado
              </label>
              <select
                name="cursoSeleccionado"
                value={cursoSeleccionado}
                onChange={(e) => setCursoSeleccionado(e.target.value)}
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              >
                <option value="">Selecciona un curso</option>
                {cursos.map((curso) => (
                  <option
                    key={curso.id}
                    value={curso.nombre + "/" + curso.costo}
                  >
                    {curso.nombre} - ${curso.costo}
                  </option>
                ))}
              </select>
              {cursoSeleccionado && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>
                    Vigencia: {new Date(vigencia).toLocaleDateString("es-ES")}
                  </p>
                  <p>Cupo: {cupo}</p>
                </div>
              )}
            </div>
            <div>
              {mostrarCampoCodigo() && (
                <div className="mb-4">
                  <label
                    htmlFor="codigoAcceso"
                    className="block text-md font-medium text-gray-700 mb-2"
                  >
                    Código de Acceso
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="codigoAcceso"
                      value={codigoAcceso}
                      onChange={(e) => setCodigoAcceso(e.target.value)}
                      onBlur={validarCodigoAcceso}
                      className="px-4 py-2 w-1/12 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                    />
                    {codigoValido === false && (
                      <IoMdClose size={25} className="text-red-600" />
                    )}
                    {codigoValido === true && (
                      <IoMdCheckmark size={25} className="text-green-600" />
                    )}
                  </div>
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
                rows="4"
                className="mt-1 px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`text-white px-2 lg:px-4 mx-2 py-2 rounded-md ${
                  codigoValido
                    ? isCursoDisponible()
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handlePagoEnLinea}
                disabled={!codigoValido || !isCursoDisponible()}
              >
                Pago en línea
              </button>
              <button
                className={`text-white px-2 lg:px-4 mx-2 py-2 rounded-md ${
                  codigoValido
                    ? isCursoDisponible()
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handlePagoEnLineaConTarjeta}
                disabled={!codigoValido || !isCursoDisponible()}
              >
                Pago en línea con tarjeta
              </button>
              <button
                type="button"
                className="px-2 mt-2 lg:px-4 mx-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleLimpiarCampos}
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
