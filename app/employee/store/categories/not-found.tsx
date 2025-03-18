import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import pricingBg from '@/public/Images/pricing-bg1.png';

export default function NotFoundPage() {
  return (
    <div className='min-h-screen w-full flex bg-black relative py-2'>
      <div className="relative w-full min-h-screen text-white flex flex-col justify-center items-center overflow-hidden">

        <div className="absolute inset-0 z-0 animate-[spin_10s_linear_infinite]">
          <Image
            src={pricingBg}
            alt="Background Image"
            fill
            priority
            className="opacity-60 object-cover"
          />
        </div>

        <div className="text-center space-y-6 relative z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-homePrimary mb-4 animate-pulse">404</h1>
          <p className="text-2xl md:text-3xl"> Sorry we couldnt find this product</p>
          <p className="text-lg md:text-xl">But dont worry, you can find plenty of other products on our homepage</p>
          <p className="text-sm md:text-base">Maybe you were looking for something specific? Return to the main page and explore all our options.</p>
          <Link href="/admin/store/products" passHref>
            <button className="mt-6 inline-block bg-homePrimary hover:bg-primary text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-110 transition duration-300">
              Return Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};
