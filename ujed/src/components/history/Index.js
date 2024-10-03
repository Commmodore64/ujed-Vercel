import { useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Index";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import SwitchButton from "../SwitchButton";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importa la extensión para las tablas

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [inscriptionsData, setInscriptionsData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const dropdownRef = useRef(null);
  const [isCard, setIsCard] = useState(true); // Switch for Efectivo (false) or Tarjeta (true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReferencia, setSelectedReferencia] = useState(null);
  const [pagos, setPagos] = useState([]);

  const fetchCoursesData = async () => {
    const response = await fetch("http://localhost:5000/api/cursos");
    const data = await response.json();
    setCoursesData(data);
  };

  const fetchInscriptionsData = async () => {
    const allInscriptions = [];
    try {
      if (isCard) {
        // Fetch inscripciones normales si isCard es true
        for (const course of coursesData) {
          const response = await fetch(
            `http://localhost:5000/api/inscripciones/${course.id}`
          );
          if (response.ok) {
            const data = await response.json();
            allInscriptions.push(...data);
          } else {
            console.error("Error fetching inscriptions:", response.status);
          }
        }
      } else {
        // Fetch adeudos si isCard es false
        const response = await fetch("http://localhost:5000/api/adeudos");
        if (response.ok) {
          const data = await response.json();
          allInscriptions.push(...data);
        } else {
          console.error("Error fetching adeudos:", response.status);
        }
      }
      setInscriptionsData(allInscriptions);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const combineData = () => {
    console.log("Inscriptions Data:", inscriptionsData);
    console.log("Courses Data:", coursesData);
    const combined = inscriptionsData.map((inscription) => {
      const course = coursesData.find(
        (course) => course.id === inscription.id_curso
      );

      if (!course) {
        return {
          ...inscription,
          nombre: inscription.Nombre || "No encontrado",
          fecha_inscripcion: inscription.Fecha_Adeudo || "No encontrado",
          forma_pago: "0" || "No encontrado",
          nombreCompleto: inscription.nombre || "No encontrado",
          referencia: inscription.referencia || "No encontrado",
        };
      }

      return {
        ...inscription,
        nombre: course.nombre,
        nombreCompleto: inscription.nombre,
        referencia: inscription.referencia,
      };
    });
    setCombinedData(combined);
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  useEffect(() => {
    if (coursesData.length) {
      fetchInscriptionsData();
    }
  }, [coursesData, isCard]);

  useEffect(() => {
    if (coursesData.length && inscriptionsData.length) {
      combineData();
    }
  }, [coursesData, inscriptionsData]);

  const filteredData = combinedData.filter((item) => {
    const searchTermLower = searchTerm?.toLowerCase() || "";

    const nameMatch =
      (typeof item.nombreCompleto === "string" &&
        item.nombreCompleto.toLowerCase().includes(searchTermLower)) ||
      (typeof item.nombre === "string" &&
        item.nombre.toLowerCase().includes(searchTermLower)) ||
      (typeof item.estado_pago === "string" &&
        item.estado_pago.toLowerCase().includes(searchTermLower)) ||
      (typeof item.fecha_inscripcion === "string" &&
        item.fecha_inscripcion.toLowerCase().includes(searchTermLower)) ||
      ((typeof item.referencia === "bigint" ||
        typeof item.referencia === "number") &&
        item.referencia === parseInt(searchTerm)) ||
      (typeof item.Fecha_Pago === "string" &&
        item.Fecha_Pago.toLowerCase().includes(searchTermLower)) ||
      (typeof item.Fecha_Adeudo === "string" &&
        item.Fecha_Adeudo.toLowerCase().includes(searchTermLower)) ||
      (typeof item.Descripcion === "string" &&
        item.Descripcion.toLowerCase().includes(searchTermLower)) ||
      (typeof item.Monto === "string" &&
        item.Monto.toLowerCase().includes(searchTermLower)) ||
      (typeof item.ID_Adeudo === "number" &&
        item.ID_Adeudo === parseInt(searchTerm));

    const fieldMatch = fieldFilter === "all" || item[fieldFilter];

    return nameMatch && fieldMatch;
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejador para el archivo CSV
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Función para conciliar el pago
  const handleConciliar = (referencia) => {
    setSelectedReferencia(referencia);
    handleOpenModal();
  };

  const handleDelete = async (referencia) => {
    // Eliminar el pago de la base de datos
    try {
      const response = await fetch(
        `http://localhost:5000/api/eliminarpago/${referencia}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el pago");
      }

      // Aquí llamas a la API para actualizar el pago a Pagado: 1
      const responseUpdate = await fetch(
        "http://localhost:5000/api/actualizarpago",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Pagado: 1,
            referencia: selectedReferencia, // Usar la referencia seleccionada
          }),
        }
      );

      if (!responseUpdate.ok) {
        throw new Error("Error al actualizar el pago");
      }

      const dataUpdate = await responseUpdate.json();
      console.log(dataUpdate.message);
      toast.success("Pago conciliado correctamente");

      // Opcional: Actualiza el estado local o vuelve a cargar los datos
      // fetchPagos(); // Si tienes una función para obtener los pagos

      // Cierra el modal
      setIsModalOpen(false);

            // Espera 1 segundo antes de recargar la página
            setTimeout(() => {
              window.location.reload(); // Recarga la página
            }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al conciliar el pago");
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          "http://localhost:5000/api/subir-archivo",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Archivo subido exitosamente");
          toast.success("Archivo subido exitosamente");
          setUploadSuccess(true); // Cambiar el estado a verdadero
          setTimeout(() => {
            setUploadSuccess(false);
            location.reload();
          }, 3200);
        } else {
          console.error("Error al subir el archivo");
          toast.error("Error al subir el archivo");
        }
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    } else {
      console.error("Por favor, selecciona un archivo antes de subir.");
      toast.error("Por favor, selecciona un archivo antes de subir.");
    }
  };

  const generateReport = async (combinedData) => {
    try {
      // Si combinedData no es un array, mostrar un error y salir
      if (!Array.isArray(combinedData)) {
        console.error("combinedData no es un array:", combinedData);
        return;
      }

      // Verificar si los datos de adeudos están presentes
      let adeudosData = combinedData.filter((item) => item.ID_Adeudo);
      if (adeudosData.length === 0) {
        // Si no hay datos de adeudos, hacer fetch a la API
        const responseAdeudos = await fetch(
          "http://localhost:5000/api/adeudos"
        );
        adeudosData = await responseAdeudos.json();
      }

      // Verificar si los datos de pagos están presentes
      let pagosData = combinedData.filter((item) => item.ID_Pago);
      if (pagosData.length === 0) {
        // Si no hay datos de pagos, hacer fetch a la API
        const responsePagos = await fetch("http://localhost:5000/api/pagos");
        pagosData = await responsePagos.json();
      }

      // Crear el PDF
      const doc = new jsPDF();

      // **Reporte de Adeudos (Efectivo)**
      doc.setFontSize(18);
      doc.text("Reporte de pagos en Efectivo", 14, 22);
      doc.setFontSize(12);
      doc.text("Generado el: " + new Date().toLocaleString(), 14, 30);

      // Generar tabla de Adeudos (Efectivo)
      doc.autoTable({
        startY: 35,
        head: [
          ["ID", "Nombre", "Descripción", "Monto", "Fecha Adeudo", "Pagado"],
        ],
        body: adeudosData.map((item) => [
          item.ID_Adeudo,
          item.Nombre,
          item.Descripcion,
          `$${item.Monto}`,
          item.Fecha_Adeudo,
          item.Pagado ? "Sí" : "No",
        ]),
      });

      // **Reporte de Pagos en Línea**
      doc.addPage();
      doc.setFontSize(18);
      doc.text("Reporte de Pagos en Línea", 14, 22);
      doc.setFontSize(12);
      doc.text("Generado el: " + new Date().toLocaleString(), 14, 30);

      // Generar tabla de Pagos en Línea
      doc.autoTable({
        startY: 35,
        head: [
          [
            "ID",
            "Nombre Usuario",
            "Nombre",
            "Monto",
            "Fecha Pago",
            "Método de Pago",
            "Descripción",
          ],
        ],
        body: pagosData.map((item) => [
          item.ID_Pago,
          item.Nombre_usuario,
          item.Nombre,
          `$${item.Monto}`,
          item.Fecha_Pago,
          item.Metodo_Pago,
          item.Descripcion,
        ]),
      });

      // Guardar el PDF
      doc.save("reportes.pdf");
    } catch (error) {
      console.error("Error generando el reporte:", error);
    }
  };
  const fetchPagosNoConciliados = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/pagosnoconciliados"
      ); // Cambia esta URL si es necesario
      const data = await response.json();
      setPagos(data); // Ajusta según la estructura de respuesta de tu API
    } catch (error) {
      console.error("Error al cargar los pagos no conciliados:", error);
    }
  };
  const handleOpenModal = async () => {
    await fetchPagosNoConciliados();
    setIsModalOpen(true);
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Subir archivo bancario</h2>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleFileUpload}
                className={`${
                  uploadSuccess ? "bg-green-500" : "bg-blue-500"
                } hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-300`}
              >
                {uploadSuccess ? (
                  <div className="flex items-center">
                    <FaCheckCircle className="mr-2 animate-pulse" />
                    Subido
                  </div>
                ) : (
                  "Subir"
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center mb-5 hover:text-slate-700">
            <Link to={"/admin"} className="text-lg">
              <IoIosArrowBack className="inline-block" />
            </Link>
            <h1 className="text-2xl font-bold pl-1">
              Historial de inscripciónes
            </h1>
          </div>
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <div className="flex items-center gap-2 w-full md:w-auto mt-4">
                <input
                  className="flex h-10 w-full sm:w-96 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Buscar..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 mt-4 md:mt-0 w-full justify-center">
                <SwitchButton
                  isChecked={isCard}
                  onToggle={() => setIsCard(!isCard)}
                  className="mb-2 md:mb-0"
                />
                <button
                  onClick={handleOpenModal}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full max-w-xs"
                >
                  Pagos no conciliados
                </button>
                {isModalOpen && (
                  <Modal onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-xl mb-4">Pagos No Conciliados</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 border-b border-gray-300 text-left">
                              Fecha de Pago
                            </th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">
                              Referencia
                            </th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">
                              Monto
                            </th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">
                              Borrar
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                          {pagos.map((pago, index) => (
                            <tr
                              key={`${pago.Referencia}-${index}`}
                              className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <td className="py-3 px-4">{pago.Fecha_Pago}</td>
                              <td className="py-3 px-4">{pago.Referencia}</td>
                              <td className="py-3 px-4">$ {pago.Cargo}</td>
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => handleDelete(pago.Referencia)}
                                  className=" flex items-center justify-center ml-4 text-red-500 hover:text-red-700"
                                >
                                  <IoIosClose size={35} />
                                  {/* Cambia esto por el icono que estés usando */}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Modal>
                )}

                <Link to="/history/details" className="w-full sm:w-auto">
                  <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full max-w-xs">
                    Detalles de pagos con Tarjeta
                  </button>
                </Link>
                <button
                  onClick={() => generateReport(combinedData)}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-full max-w-xs"
                >
                  Generar reporte de todos los pagos
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="relative w-full">
                <table className="caption-bottom text-sm w-full">
                  <thead className="hidden sm:table-header-group">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      {isCard ? (
                        <>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Nombre Completo
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Fecha Inscripción
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Curso
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Estado Pago
                          </th>
                        </>
                      ) : (
                        <>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            ID Adeudo
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Nombre
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Descripción
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Monto
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Fecha Adeudo
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Fecha Pago
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Pagado
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Referencia
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="[&>tr:last-child]:border-0">
                    {filteredData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        {isCard ? (
                          <>
                            <td className="h-12 px-4 align-middle">
                              {item.nombreCompleto}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.fecha_inscripcion}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.nombre}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              <p
                                className={`font-semibold flex items-center space-x-2 ${
                                  item.estado_pago === "Autorizado"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.estado_pago === "Autorizado" ? (
                                  <>
                                    <FaCheckCircle />
                                    <span>{item.estado_pago}</span>
                                  </>
                                ) : (
                                  <>
                                    <FaTimesCircle />
                                    <span>{item.estado_pago}</span>
                                  </>
                                )}
                              </p>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="h-12 px-4 align-middle">
                              {item.ID_Adeudo}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.nombre}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.Descripcion}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              ${item.Monto}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.Fecha_Adeudo}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.Fecha_Pago}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              <p
                                className={`font-semibold flex items-center space-x-2 ${
                                  item.Pagado === 1
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {item.Pagado === 1 ? (
                                  <>
                                    <FaCheckCircle />
                                    <span>Autorizado</span>
                                  </>
                                ) : item.Pagado === 0 ? (
                                  <>
                                    <FaTimesCircle />
                                    <span>Autorizado</span>
                                  </>
                                ) : (
                                  <span>Autorizado</span>
                                )}
                              </p>
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.referencia}
                            </td>
                            <td className="h-12 px-4 align-middle">
                              {item.Pagado === 0 && (
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-full"
                                  onClick={() =>
                                    handleConciliar(item.referencia)
                                  }
                                >
                                  Conciliar
                                </button>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredData.length === 0 && (
                <p className="text-center text-muted-foreground">Sin datos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// Componente del modal
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full transition-transform transform relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Cerrar modal"
        >
          &times; {/* Icono de cerrar */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Index;
