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
    paymentAmount: "",
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
    navigate("/template");
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col mt-16 lg:mt-20 h-auto m-4 lg:m-8 rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <div>
          <h1 className="text-2xl font-bold">Generar Ticket de Consulta</h1>
          <p className="mt-2 text-md text-gray-600">
            Completa la información necesaria para generar un ticket de consulta
            médica.
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
              <div className="mt-1 relative flex items-center">
                <input
                  type="number"
                  name="paymentAmount"
                  value={formData.paymentAmount}
                  placeholder="$"
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-1/12 border-gray-300 rounded-md shadow-sm"
                  min="0"
                  step="0.01"
                />
              </div>
              {/* <div>
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
              </div> */}
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
                className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-2xl shadow-sm hover:bg-blue-700"
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
