"use client"

import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CustomButton from "@/components/atoms/CustomButton";
import { standardLinkHome } from "@/utils/tokens";

const Navbar = () => {
  const router = useRouter();

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
            <li><a href="#" className={`${standardLinkHome}`}>Home</a></li>
            <li><a href="#" className={`${standardLinkHome}`}>About</a></li>
            <li><a href="#" className={`${standardLinkHome}`}>Services</a></li>
            <li><a href="#" className={`${standardLinkHome}`}>Contact</a></li>
          </ul>
        </div>

        <div className="flex md:order-2">
          <CustomButton
            text="Platform" 
            style="bg-homePrimary text-white font-semibold" 
            onClickButton={() => router.push('/login')}
          />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
