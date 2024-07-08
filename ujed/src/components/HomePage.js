import React from 'react'
import LogoPNG from '../img/logo-banner.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';



const HomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      loginWithRedirect();
    }
  };
  return (
    <div className="flex flex-col min-h-[100dvh]">
    <header className="bg-[#B11830] px-4 py-6 md:px-6 md:py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={LogoPNG} className= "h-8 lg:h-14" alt='UJED Logo'/>
        </div>
        <div className="flex items-center gap-5 lg:gap-10">
          <a href="#" className="text-sm font-medium text-white hover:underline">
            FAQ
          </a>
          <a href="#" className="text-sm font-medium text-white hover:underline">
            Sobre nosotros
          </a>
          <button onClick={handleLoginClick} className="bg-white text-[#B11830] p-2 lg:py-2 px-4 rounded font-semibold">Iniciar Sesión</button>
        </div>
      </div>
    </header>
    <main className="flex-1 bg-background px-4 py-12 md:px-6 md:py-24">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">Bienvenido</h1>
          <p className="text-muted-foreground md:text-xl">
            Una nueva plataforma para realizar tus pagos de inscripción de manera rápida y segura.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <button variant="secondary">Contactanos</button>
          </div>
      </div>
    </main>
    <footer className="bg-muted px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-xs text-muted-foreground hover:underline">
            Terminos del servicio
          </Link>
          <Link href="#" className="text-xs text-muted-foreground hover:underline">
            Política de privacidad
          </Link>
        </nav>
      </div>
    </footer>
  </div>
  )
}

export default HomePage