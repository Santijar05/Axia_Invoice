import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
        <a href="/home" className="flex space-x-3">
          <Image 
            src="/Images/logo_blanco.png"  
            alt="Axia logo" 
            width={50} 
            height={50} 
          />
        </a>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 font-medium">
            <li><a href="#" className="font-semibold text-white hover:text-homePrimary">Home</a></li>
            <li><a href="#" className="font-semibold text-white hover:text-homePrimary">About</a></li>
            <li><a href="#" className="font-semibold text-white hover:text-homePrimary">Services</a></li>
            <li><a href="#" className="font-semibold text-white hover:text-homePrimary">Contact</a></li>
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
