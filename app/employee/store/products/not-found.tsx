import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white p-8">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-homePrimary mb-4 animate-pulse">404</h1>
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
  );
};

export default NotFoundPage;