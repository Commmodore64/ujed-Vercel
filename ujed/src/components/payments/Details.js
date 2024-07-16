import React from "react";

const Details = () => {
  const matricula = localStorage.getItem("matricula");
  const nombreCompleto = localStorage.getItem("nombreCompleto");
  const telefono = localStorage.getItem("telefono");
  const fechaNacimiento = localStorage.getItem("fechaNacimiento");
  const comentarios = localStorage.getItem("comentarios");
  const cursoSeleccionado = localStorage.getItem("cursoSeleccionado");
  return (
    <div className="flex flex-col gap-4 p-1 lg:p-8 bg-gray-200 rounded-xl text-black ml-20">
      <p className="text-lg font-bold">Detalles:</p>
      <ul>
        <li className="mb-2">
          <span className="font-semibold">Matrícula:</span> <br /> {matricula}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Nombre Completo:</span> <br />{" "}
          {nombreCompleto}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Teléfono:</span> <br /> {telefono}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Fecha de Nacimiento:</span> <br />{" "}
          {fechaNacimiento}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Comentarios:</span> <br />{" "}
          {comentarios}
        </li>
        <li className="mb-2">
          <span className="font-semibold">Curso Seleccionado:</span> <br />{" "}
          {cursoSeleccionado}
        </li>
      </ul>
    </div>
  );
};

export default Details;
