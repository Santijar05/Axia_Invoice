    'use client';
    import { useEffect, useState } from "react";
    import Image from "next/image";

    const Hero = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative w-full h-screen text-white flex flex-col justify-center items-center">
        <Image 
            src="/Images/fondoHerooo.png" 
            alt="Background Image" 
            fill 
            priority 
            style={{ objectFit: "cover" }} 
        />
        
        <div className="text-center z-10">
            <h1 className={`text-5xl font-bold transition-opacity duration-1000 ease-in-out ${
            isMounted ? 'opacity-100' : 'opacity-0'
            }`}>
            Contabilidad clara y sin complicaciones
            </h1>
            
            <p className={`text-gray-300 mt-4 max-w-2xl mx-auto transition-opacity duration-1000 ease-in-out delay-300 ${
            isMounted ? 'opacity-100' : 'opacity-0'
            }`}>
            Axia Invoice te ayuda a mantener tus finanzas en orden de manera sencilla. Menos tiempo en trámites, más tiempo para tu negocio.
            </p>
            
            <div className={`mt-6 space-x-4 transition-opacity duration-1000 ease-in-out delay-500 ${
            isMounted ? 'opacity-100' : 'opacity-0'
            }`}>
            <button className="bg-homePrimary px-6 py-2 rounded-lg text-white font-semibold">
                Empezar
            </button>
            <button className="border border-homePrimary px-6 py-2 rounded-lg text-homePrimary font-semibold">
                Learn More
            </button>
            </div>
        </div>
        </section>
    );
    };

    export default Hero;