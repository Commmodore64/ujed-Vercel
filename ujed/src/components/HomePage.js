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
        <div className="flex items-center gap-4">
          <img src={LogoPNG} className="h-14" />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-white hover:underline">
            FAQ
          </a>
          <a href="#" className="text-sm font-medium text-white hover:underline">
            About
          </a>
          <button onClick={handleLoginClick} className="bg-white text-[#B11830] py-2 px-4 rounded">Login</button>
        </div>
      </div>
    </header>
    <main className="flex-1 bg-background px-4 py-12 md:px-6 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">Bienvenido</h1>
          <p className="text-muted-foreground md:text-xl">
            Welcome to our modern and innovative home page. Explore our products and services, and get in touch with
            us for more information.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <button>Learn More</button>
            <button variant="secondary">Contact Us</button>
          </div>
        </div>
      </div>
    </main>
    <footer className="bg-muted px-4 py-6 md:px-6 md:py-8">
      <div className="container flex items-center justify-between">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="#" className="text-xs text-muted-foreground hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-muted-foreground hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  </div>
  )
}

export default HomePage