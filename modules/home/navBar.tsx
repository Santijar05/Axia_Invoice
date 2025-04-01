"use client"

import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CustomButton from "@/components/atoms/CustomButton";
import { standardLinkHome } from "@/utils/tokens";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-black dark:bg-gray-900 fixed w-full z-20 top-0">
      <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
        <Link href="/" className="flex space-x-3">
          <Image 
            src="/Images/logo_blanco.png"  
            alt="Axia logo" 
            width={50} 
            height={50} 
          />
        </Link>

        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-8 font-medium">
            <li><Link href="/" className={`${standardLinkHome}`}>Inicio</Link></li>
            <li><Link href="/aboutus" className={`${standardLinkHome}`}>Sobre Nosotros</Link></li>
            <li><Link href="/contactus" className={`${standardLinkHome}`}>Contactanos</Link></li>
          </ul>
        </div>

        <div className="flex md:order-2">
          <CustomButton
            text="Plataforma" 
            style="bg-homePrimary text-white font-semibold" 
            onClickButton={() => router.push('/login')}
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
