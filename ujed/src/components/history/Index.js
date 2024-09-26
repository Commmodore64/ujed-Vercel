import { useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Index";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [inscriptionsData, setInscriptionsData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Nuevo estado
  const [file, setFile] = useState(null);
  const dropdownRef = useRef(null);

  const fetchCoursesData = async () => {
    const response = await fetch("http://localhost:5000/api/cursos");
    const data = await response.json();
    setCoursesData(data);
  };

  const fetchInscriptionsData = async () => {
    const allInscriptions = [];
    for (const course of coursesData) {
      const response = await fetch(
        `http://localhost:5000/api/inscripciones/${course.id}`
      );
      const data = await response.json();
      allInscriptions.push(...data);
    }
    setInscriptionsData(allInscriptions);
  };

  const combineData = () => {
    const combined = inscriptionsData.map((inscription) => {
      const course = coursesData.find(
        (course) => course.id === inscription.id_curso
      );
      return {
        ...inscription,
        nombre: course.nombre,
        nombreCompleto: inscription.nombre,
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
  }, [coursesData]);

  useEffect(() => {
    if (coursesData.length && inscriptionsData.length) {
      combineData();
    }
  }, [coursesData, inscriptionsData]);

  const filteredData = combinedData.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch =
      item.nombreCompleto.toLowerCase().includes(searchTermLower) ||
      item.nombre.toLowerCase().includes(searchTermLower) ||
      item.estado_pago.toLowerCase().includes(searchTermLower);
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

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/api/subir-archivo", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // La subida fue exitosa
          console.log("Archivo subido exitosamente");
          toast.success("Archivo subido exitosamente");
          setUploadSuccess(true); // Cambiar el estado a verdadero
          setTimeout(() => setUploadSuccess(false), 8000);
        } else {
          console.error("Error al subir el archivo");
          toast.error("Error al subir el archivo");
        }
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    } else {
      console.error("Por favor, selecciona un archivo antes de subir.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          {/* Sección de subir archivo CSV */}
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
              <div className="relative w-full md:w-auto mt-4"></div>
              <Link to="/history/details" className="w-full sm:w-auto">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-3xl w-full sm:w-auto">
                  Detalles de pagos
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="relative w-full">
                <table className="caption-bottom text-sm w-full">
                  <thead className="hidden sm:table-header-group">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Nombre Completo
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Nombre del Curso
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Fecha de Inscripción
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Estado de Pago
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block sm:table-row-group">
                    {filteredData.map((item, index) => (
                      <tr
                        key={index}
                        className={`block sm:table-row border-b transition-colors hover:bg-blue-50 ${
                          index % 2 === 0 ? "bg-blue-100" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-2 block sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Nombre Completo:{" "}
                          </span>
                          {item.nombreCompleto}
                        </td>
                        <td className="px-4 py-2 block sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Nombre del Curso:{" "}
                          </span>
                          {item.nombre}
                        </td>
                        <td className="px-4 py-2 block sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Fecha de Inscripción:{" "}
                          </span>
                          {item.fecha_inscripcion.split("T")[0]}
                        </td>
                        <td className="px-4 py-2 block sm:table-cell">
                          <span className="font-bold sm:hidden">
                            Estado de Pago:{" "}
                          </span>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
