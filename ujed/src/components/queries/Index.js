import Sidebar from "../sidebar/Index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    consultationDate: "",
    consultationReason: "",
    symptoms: "",
    medicalHistory: "",
    insuranceCompany: "",
    policyNumber: "",
    termsAccepted: false,
    consentGiven: false,
    paymentAmount: 100,
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías los datos del formulario a tu backend y redirigirías a la pasarela de pago
    // Por ejemplo:
    navigate("/template"); // Redirige a la pasarela de pago
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          <h1 className="text-2xl font-bold">Generar Ticket de Consulta</h1>
          <p className="mt-2 text-md text-gray-600">
            Completa la información necesaria para generar un ticket de consulta médica.
          </p>
          <div className="container mx-auto p-4 mt-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Datos del Paciente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre del Paciente
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sexo
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Seleccione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              {/* Información de la Consulta */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha y Hora de la Consulta
                </label>
                <input
                  type="datetime-local"
                  name="consultationDate"
                  value={formData.consultationDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Motivo de la Consulta
                </label>
                <textarea
                  type="text"
                  name="consultationReason"
                  value={formData.consultationReason}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              {/* Consentimiento y Términos */}
              <div>
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                  className="mr-2 p-2"
                />
                <label className="text-sm text-gray-700">
                  Acepto los{" "}
                  <a href="/terms" className="text-blue-600">
                    términos y condiciones
                  </a>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="consentGiven"
                  checked={formData.consentGiven}
                  onChange={handleChange}
                  required
                  className="mr-2 p-2"
                />
                <label className="text-sm text-gray-700">
                  Doy mi consentimiento para el tratamiento de datos personales
                </label>
              </div>

              

              <button
                type="submit"
                className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
              >
                Generar Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
