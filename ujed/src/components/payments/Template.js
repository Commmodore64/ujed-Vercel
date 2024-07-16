import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import card1 from "../../img/card-form/cards1.png";
import card2 from "../../img/card-form/cards2.png";
import cvv from "../../img/card-form/cvv.png";
import openpay from "../../img/card-form/openpay.png";
import security from "../../img/card-form/security.png";
import Sidebar from "../sidebar/Index";
import { Link } from "react-router-dom";
import Details from "./Details";

const Index = () => {
  function pay() {
    localStorage.clear();
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col lg:flex-row mt-16 lg:mt-28 h-auto m-8 bg-[#D9D9D9] rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
        <style jsx="true">{`
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}</style>
        <div className="flex flex-col w-full max-w-4xl">
          <div className="flex flex-col w-full ">
            <form action="#" method="POST" id="payment-form">
              <input type="hidden" name="token_id" id="token_id" />
              <div className="w-full">
                <h2 className="bg-gray-200 text-2xl py-7 px-5 rounded-t-xl font-semibold">
                  Tarjeta de crédito o débito
                </h2>
                <div className="bg-gray-100 p-5 rounded-b-xl">
                  <div className="bg-gray-100 p-3 rounded-b-xl">
                    <div className="flex flex-col lg:flex-row w-full mt-5">
                      <div className="flex flex-col w-full lg:w-1/3 border-r border-gray-300">
                        <h4 className="text-md p-2 font-semibold text-gray-900">
                          Tarjetas de crédito
                        </h4>
                        <img
                          src={card1}
                          alt="Tarjetas de crédito"
                          className="w-full xs:w-[300px] sm:w-[400px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]"
                        />
                      </div>
                      <div className="flex flex-col w-full lg:w-2/3 px-5 mt-5 lg:mt-0">
                        <h4 className="text-md p-2 font-semibold text-gray-900">
                          Tarjetas de débito
                        </h4>
                        <img
                          src={card2}
                          alt="Tarjetas de débito"
                          className="w-full xs:w-[300px] sm:w-[400px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <div className="flex flex-col lg:flex-row mb-5">
                      <div className="w-full lg:w-1/2 lg:my-0 px-2 my-2">
                        <label className="block text-md mb-2 font-semibold text-gray-600">
                          Nombre del titular
                        </label>
                        <input
                          type="text"
                          placeholder="Como aparece en la tarjeta"
                          autoComplete="off"
                          data-openpay-card="holder_name"
                          className="bg-gray-200 w-full border border-gray-300 p-3 text-lg rounded-xl"
                        />
                      </div>
                      <div className="w-full lg:w-1/2 lg:my-0 px-2 my-2">
                        <label className="block text-md mb-2 font-semibold text-gray-600">
                          Número de tarjeta
                        </label>
                        <input
                          type="number"
                          placeholder="16 dígitos"
                          autoComplete="off"
                          data-openpay-card="card_number"
                          className="bg-gray-200 w-full border border-gray-300 p-3 text-lg rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row mb-5">
                      <div className="w-full lg:w-1/2 lg:my-0 px-2 my-2">
                        <label className="block text-md mb-2 font-semibold text-gray-600">
                          Fecha de expiración
                        </label>
                        <div className="flex">
                          <input
                            type="number"
                            placeholder="Mes"
                            data-openpay-card="expiration_month"
                            className="bg-gray-200 w-1/2 border border-gray-300 p-3 text-lg mr-2 rounded-xl"
                          />
                          <input
                            type="number"
                            placeholder="Año"
                            data-openpay-card="expiration_year"
                            className="bg-gray-200 w-1/2 border border-gray-300 p-3 text-lg ml-2 rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 lg:my-0 px-2 my-2">
                        <label className="block text-md mb-2 font-semibold text-gray-600">
                          Código de seguridad
                        </label>
                        <div className="flex items-center mr-11">
                          <input
                            type="number"
                            placeholder="3 dígitos"
                            autoComplete="off"
                            data-openpay-card="cvv2"
                            className="bg-gray-200 flex-grow border border-gray-300 p-3 text-lg rounded-xl"
                          />
                          <img
                            src={cvv}
                            alt="Código de seguridad"
                            className="xl:ml-10 h-6 hidden lg:hidden xl:hidden 2xl:block"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-5 px-2 flex-col lg:flex-row lg:items-start">
                      <div className="flex items-center mb-2 lg:mb-0">
                        <div className="w-20 h-10 bg-no-repeat bg-left-bottom"></div>
                        <span className="text-xs ml-3 text-gray-500">
                          Transacciones realizadas vía:
                        </span>
                        <img src={openpay} alt="Openpay" className="ml-2 h-6" />
                      </div>
                      <div className="flex justify-center items-center lg:ml-8">
                        <div className="border-l border-gray-300 h-12 mx-3 mb-2 lg:mb-0 lg:mx-0"></div>
                        <img
                          src={security}
                          alt="Seguridad"
                          className="h-10 mx-2"
                        />
                        <span className=" text-xs text-gray-500">
                          Tus pagos se realizan de forma segura con encriptación
                          de 256 bits
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end px-2">
                    <Link to="/payments">
                        <button
                          type="submit"
                          className="inline-block mx-5 bg-blue-600 hover:bg-blue-700 text-white text-center text-xl py-1.5 px-6 rounded-lg cursor-pointer font-semibold"
                        >
                          Regresar
                        </button>
                      </Link>
                      <a
                        className="inline-block mx-5 bg-red-600 hover:bg-red-700 text-white text-center text-xl py-1.5 px-6 rounded-lg cursor-pointer font-semibold"
                        id="pay-button"
                        onClick={() => pay()}
                      >
                        Pagar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Details />
      </div>
    </>
  );
};

export default Index;
