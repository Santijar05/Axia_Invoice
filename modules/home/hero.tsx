'use client';

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const t = useTranslations("home");

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
                className="object-cover"
            />
        
            <div className="text-center z-10">
                <h1 className={`text-5xl font-bold transition-opacity duration-1000 ease-in-out ${
                    isMounted ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {t("headline")}
                </h1>
                
                <p className={`text-gray-300 mt-4 max-w-2xl mx-auto transition-opacity duration-1000 ease-in-out delay-300 ${
                    isMounted ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {t("subheadline")}
                </p>
                
                <div className={`mt-6 space-x-4 transition-opacity duration-1000 ease-in-out delay-500 ${
                    isMounted ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Link href={"/register"}> 
                        <button className="bg-homePrimary px-6 py-2 rounded-lg text-white font-semibold">
                            {t("startButton")}
                        </button>
                    </Link>

                    <button className="border border-homePrimary px-6 py-2 rounded-lg text-homePrimary font-semibold">
                        {t("learnMoreButton")}
                    </button>
                </div>
            </div>
        </section>
    );
};
