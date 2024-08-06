import { useState, useEffect, useRef } from "react";
import Sidebar from "../sidebar/Index";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [inscriptionsData, setInscriptionsData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const dropdownRef = useRef(null);

  const fetchCoursesData = async () => {
    const response = await fetch("http://localhost:5000/api/cursos");
    const data = await response.json();
    console.log("Cursos:", data); // Agregado para depuración
    setCoursesData(data);
  };

  const fetchInscriptionsData = async () => {
    const allInscriptions = [];
    for (const course of coursesData) {
      const response = await fetch(`http://localhost:5000/api/inscripciones/${course.id}`);
      const data = await response.json();
      console.log(`Inscripciones para curso ${course.id}:`, data); // Agregado para depuración
      allInscriptions.push(...data);
    }
    setInscriptionsData(allInscriptions);
  };

  const combineData = () => {
    const combined = inscriptionsData.map((inscription) => {
      const course = coursesData.find((course) => course.id_curso === inscription.id_curso);
      return { ...inscription, ...course };
    });
    console.log("Datos combinados:", combined); // Agregado para depuración
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
    const nameMatch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
    const roleMatch = roleFilter === "all" || item.role === roleFilter;
    return nameMatch && roleMatch;
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

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          <h1 className="text-2xl font-bold">Inscripción</h1>
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <div className="flex items-center gap-2 w-full md:w-auto mt-4">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 md:flex-none"
                  placeholder="Search by name..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
                  >
                    <FilterIcon className="w-4 h-4" />
                    Filter by role
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <div className="p-2">
                        <div
                          onClick={() => {
                            setRoleFilter("all");
                            setIsDropdownOpen(false);
                          }}
                          className={`cursor-pointer px-4 py-2 text-sm ${
                            roleFilter === "all"
                              ? "bg-gray-100 font-semibold"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          All
                        </div>
                        <div
                          onClick={() => {
                            setRoleFilter("Admin");
                            setIsDropdownOpen(false);
                          }}
                          className={`cursor-pointer px-4 py-2 text-sm ${
                            roleFilter === "Admin"
                              ? "bg-gray-100 font-semibold"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          Admin
                        </div>
                        <div
                          onClick={() => {
                            setRoleFilter("Editor");
                            setIsDropdownOpen(false);
                          }}
                          className={`cursor-pointer px-4 py-2 text-sm ${
                            roleFilter === "Editor"
                              ? "bg-gray-100 font-semibold"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          Editor
                        </div>
                        <div
                          onClick={() => {
                            setRoleFilter("User");
                            setIsDropdownOpen(false);
                          }}
                          className={`cursor-pointer px-4 py-2 text-sm ${
                            roleFilter === "User"
                              ? "bg-gray-100 font-semibold"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          User
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="relative w-full overflow-auto">
                <table className="caption-bottom text-sm w-full">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Email
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    {filteredData.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-background" : ""}
                      >
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.email}</td>
                        <td className="px-4 py-2">{item.role}</td>
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

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export default Index;
