import React from "react";
import LogoPNG from "../img/logo-banner.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Details } from "../components/Details";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import clsx from "clsx";

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      loginWithRedirect();
    }
  };
  const items = [
    {
      title: "¿Los pagos son seguros?",
      content:
        "Contamos con metodo de pago seguro, soportado por BBVA y OpenPay.",
    },
    {
      title: "How to share and watch videos on X?",
      content:
        "Record: You can record, edit and share videos from the X app (X for iPhone or X for Android OS 4.1 and higher).",
    },
    {
      title: "How to post?",
      content:
        "Type your X (up to 280 characters) into the compose box at the top of your Home timeline, or select the X button in the navigation bar.",
    },
    {
      title: "How to add your phone number to your account",
      content:
        "Click the More icon and select Settings and privacy from the drop-down menu. Click on Your account tab and choose Account information. Select Phone from the drop-down menu.",
    },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-[#B11830] px-4 py-6 md:px-6 md:py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src={LogoPNG} className="h-8 lg:h-14" alt="UJED Logo" />
          </div>
          <div className="flex items-center gap-5 lg:gap-10">
            <a
              href="#faq"
              className="text-sm font-medium text-white hover:underline"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-sm font-medium text-white hover:underline"
            >
              Sobre nosotros
            </a>
            <button
              onClick={handleLoginClick}
              className="bg-white text-[#B11830] p-2 lg:py-2 px-4 rounded font-semibold"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 bg-background px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between mx-auto max-w-6xl w-full">
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left lg:items-start">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              Bienvenido a la Facultad de Enfermería y Obstetricia
            </h1>
            <p className="text-muted-foreground text-gray-800 md:text-xl">
              Una nueva plataforma para realizar tus pagos de inscripción y
              cursos de manera rápida y segura.
            </p>
            <p className="text-muted-foreground text-gray-700 md:text-lg">
              Inscribete ahora
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              <Link
                to="/dashboard"
                className="bg-black text-white py-2 px-5 rounded font-semibold hover:bg-gray-800"
              >
                Inscríbete
              </Link>
            </div>
            <hr className="mt-10 border-gray-300 w-full" />
            <p className="text-muted-foreground text-gray-700 md:text-lg">
              Nuestros cursos disponibles
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              <Link
                to="/courseinfo"
                className="bg-black text-white py-2 px-8 rounded font-semibold hover:bg-gray-800"
              >
                Cursos
              </Link>
            </div>
          </div>
          <div class="absolute right-6 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg
                viewBox="0 0 558 558"
                width="558"
                height="558"
                fill="none"
                aria-hidden="true"
                class="animate-spin-slower"
              >
                <defs>
                  <linearGradient
                    id=":Rqqnjfala:"
                    x1="79"
                    y1="16"
                    x2="105"
                    y2="237"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#13B5C8"></stop>
                    <stop
                      offset="1"
                      stop-color="#13B5C8"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
                <path
                  opacity=".2"
                  d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z"
                  stroke="#13B5C8"
                ></path>
                <path
                  d="M1 279C1 125.465 125.465 1 279 1"
                  stroke="url(#:Rqqnjfala:)"
                  stroke-linecap="round"
                ></path>
              </svg>
            </div>
          <div className="hidden lg:w-1/2 mt-16 sm:mt-24 lg:mt-0 lg:flex justify-center lg:justify-end">
            <svg
              viewBox="0 0 366 729"
              role="img"
              className="w-[22.875rem] max-w-full drop-shadow-xl"
            >
              <title>App screenshot</title>
              <defs>
                <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                  <rect width={316} height={684} rx={36} />
                </clipPath>
              </defs>
              <path
                fill="#4B5563"
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
              />
              <path
                fill="#343E4E"
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
              />
              <foreignObject
                width={316}
                height={684}
                transform="translate(24 24)"
                clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
              >
                <img
                  src="https://i.ibb.co/gRLZ5YX/Cursos-UJEDMock-Up.jpg"
                  alt=""
                />
              </foreignObject>
            </svg>
          </div>
        </div>
      </main>

      <section className="bg-white px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl md:text-5xl">
            Características destacadas
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <MdPayments size={60} />
              <h3 className="text-xl font-bold text-gray-900">Pago rápido</h3>
              <p className="mt-2 text-gray-600">
                Realiza tus pagos de manera rápida y eficiente.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <RiSecurePaymentFill size={60} />
              <h3 className="text-xl font-bold text-gray-900">Seguridad</h3>
              <p className="mt-2 text-gray-600">
                Tu información está segura con nosotros.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <IoPeople size={60} />
              <h3 className="text-xl font-bold text-gray-900">
                Inscripción sin filas
              </h3>
              <p className="mt-2 text-gray-600">
                Olvídate de las filas, inscríbete desde nuestra plataforma.
              </p>
            </div>
          </div>
        </div>
        <hr className="my-10 border-gray-300 w-2/3 mx-auto" />
        <div id="#faq" className=" flex pb-20 md:px-0">
          <Details className="mx-auto max-w-2xl space-y-5">
            {items.map((item, index) => (
              <Details.Item
                key={index}
                className="group rounded-2xl border border-red-500 bg-[#B11830] transition duration-300 hover:bg-[#b1182ff5]"
              >
                {({ isActive, toggle }) => (
                  <>
                    <div
                      className="flex cursor-pointer items-center p-4"
                      onClick={toggle}
                    >
                      <div className="text-white/95 transition group-hover:text-white">
                        {item.title}
                      </div>

                      <div className="relative ml-auto">
                        <XMarkIcon
                          className={clsx(
                            { "rotate-180": isActive, "rotate-45": !isActive },
                            "h-6 w-6 text-white/50 transition-transform duration-500"
                          )}
                        />
                      </div>
                    </div>

                    <Details.Content className="overflow-hidden px-4 transition-all duration-500 will-change-[height]">
                      <p className="pb-4 font-light leading-relaxed tracking-wide text-white/85">
                        {item.content}
                      </p>
                    </Details.Content>
                  </>
                )}
              </Details.Item>
            ))}
          </Details>
        </div>
      </section>

      <footer className="bg-[#B11830] text-white  px-4 py-6 md:px-6 md:py-8">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 Soluciones Moviles y Comunicaciones SA de CV. All rights
            reserved.
          </p>
          <nav className="flex items-center gap-4">
            <Link
              to=""
              className="text-xs text-muted-foreground hover:underline"
            >
              Terminos del servicio
            </Link>
            <Link
              to="#"
              className="text-xs text-muted-foreground hover:underline"
            >
              Política de privacidad
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
