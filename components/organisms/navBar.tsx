import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
        <Link href="/home" className="flex space-x-3">
          <Image 
            src="/Images/logo_blanco.png"  
            alt="Axia logo" 
            width={50} 
            height={50} 
          />
        </Link>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 font-medium">
            <li><Link href="/home" className="font-semibold text-white hover:text-homePrimary">Inicio</Link></li>
            <li><Link href="/aboutus" className="font-semibold text-white hover:text-homePrimary">Sobre Nosotros</Link></li>
            <li><Link href="#" className="font-semibold text-white hover:text-homePrimary">Contactanos</Link></li>
          </ul>
        </div>

        <div className="flex md:order-2">
            <Link href="/login">
            <button 
              type="button" 
              className="bg-homePrimary px-5 py-2 rounded-lg text-white font-semibold"
            >
              Plataforma
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
