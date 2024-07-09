import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import card1 from "../../img/card-form/cards1.png";
import card2 from "../../img/card-form/cards2.png";
import cvv from "../../img/card-form/cvv.png";
import openpay from "../../img/card-form/openpay.png";
import security from "../../img/card-form/security.png";

const Index = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col mt-16 lg:mt-28 h-auto m-8 bg-[#D9D9D9] rounded-xl p-5 text-black lg:mx-20 lg:ml-96">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="flex flex-col w-full ">
          <form action="#" method="POST" id="payment-form">
            <input type="hidden" name="token_id" id="token_id" />
            <div className="w-full">
              <h2 className="bg-gray-200 text-2xl py-7 px-5 rounded-t-xl">
                Tarjeta de crédito o débito
              </h2>
              <div className="bg-gray-100 p-8 rounded-b-xl">
                <div className="flex w-full mt-5">
                  <div className="flex flex-col w-1/3 border-r border-gray-300">
                    <h4 className="text-md p-2">Tarjetas de crédito</h4>
                    <img
                      src={card1}
                      alt="Tarjetas de crédito"
                      className="w-48"
                    />
                  </div>
                  <div className="flex flex-col w-2/3 px-5">
                    <h4 className="text-md p-2">Tarjetas de débito</h4>
                    <img
                      src={card2}
                      alt="Tarjetas de débito"
                      className="w-[500px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-5">
                  <div className="flex flex-col lg:flex-row mb-5">
                    <div className="w-full lg:w-1/2 px-2">
                      <label className="block text-md mb-2">
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
                    <div className="w-full lg:w-1/2 px-2">
                      <label className="block text-md mb-2">
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        data-openpay-card="card_number"
                        className="bg-gray-200 w-full border border-gray-300 p-3 text-lg rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row mb-5">
                    <div className="w-full lg:w-1/2 px-2">
                      <label className="block text-md mb-2">
                        Fecha de expiración
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Mes"
                          data-openpay-card="expiration_month"
                          className="bg-gray-200 w-1/2 border border-gray-300 p-3 text-lg mr-2 rounded-xl"
                        />
                        <input
                          type="text"
                          placeholder="Año"
                          data-openpay-card="expiration_year"
                          className="bg-gray-200 w-1/2 border border-gray-300 p-3 text-lg ml-2 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-2">
                      <label className="block text-md mb-2">
                        Código de seguridad
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="3 dígitos"
                          autoComplete="off"
                          data-openpay-card="cvv2"
                          className="bg-gray-200 flex-grow border border-gray-300 p-3 text-lg rounded-xl"
                        />
                        <img
                          src={cvv}
                          alt="Código de seguridad"
                          className="ml-2 h-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-5 px-2">
                    <div className="flex items-center">
                      <div
                        className="w-20 h-10 bg-no-repeat bg-left-bottom"
                        style={{
                          backgroundImage: 'url("./openpay.png")',
                        }}
                      ></div>
                      <span className="text-xs ml-3">
                        Transacciones realizadas vía:
                      </span>
                      <img src={openpay} alt="Openpay" className="ml-2 h-6" />
                    </div>
                    <div className="flex items-center ml-8">
                      <div className="border-l border-gray-300 h-12 mx-3"></div>
                      <img src={security} alt="Seguridad" className="h-10 mr-2" />
                      <span className="text-xs">
                        Tus pagos se realizan de forma segura con encriptación
                        de 256 bits
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end px-2">
                    <a
                      className="inline-block bg-red-600 hover:bg-red-700 text-white text-center text-xl py-2 px-6 rounded-lg cursor-pointer"
                      id="pay-button"
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
    </div>
  );
};

export default Index;
