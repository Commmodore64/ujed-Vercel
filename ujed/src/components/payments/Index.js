import React from 'react'
import Sidebar from '../sidebar/Index'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';


const Index = () => {
    const [cursos, setCursos] = useState([]);
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
    <div className="flex flex-col mt-16 lg:mt-28 h-auto m-4 lg:m-8 bg-gray-200 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
            <h1 className="text-2xl font-bold">Inscripción</h1>
            <form className="mt-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-md font-medium text-gray-700">Nombre Completo</label>
                    <input type="text" id="nombre" className="mt-1 px-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400" />
                </div>
                <div className="mb-4">
                    <label htmlFor="matricula" className="block text-md font-medium text-gray-700">Matricula</label>
                    <input type="text" id="matricula" className="mt-1 px-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400" />
                </div>
                <div className="mb-4"> 
                    <label htmlFor="matricula" className="block text-md font-medium text-gray-700">Matricula</label>
                    <select className="mt-1 px-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400">
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-md font-medium text-gray-700">Message</label>
                    <textarea id="message" rows="4" className="mt-1 px-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-gray-400 focus:border-gray-400"></textarea>
                </div>
                <button type="submit" className="px-4 mx-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Pago en linea</button>
                <Link to="/template" type="submit" className="px-4 mx-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Pago en linea con tarjeta</Link>
            </form>
        </div>
    </div>
    </>
    
  )
}

export default Index