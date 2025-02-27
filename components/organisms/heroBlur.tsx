'use client';
import { useEffect, useState, useRef } from "react";
import { FaFileInvoiceDollar, FaMoneyCheckAlt, FaChartLine, FaUniversity } from 'react-icons/fa';
import CardHeroBlur from '../atoms/cardHeroBlur';

export default function HeroBlur() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
  const features = [
      {
        icon: <FaFileInvoiceDollar className="text-3xl text-homePrimary-200 mb-4" />,
        title: "Facturación Electrónica",
        description: "Emite facturas electrónicas cumpliendo con la normativa, de forma rápida.",
      },
      {
        icon: <FaMoneyCheckAlt className="text-3xl text-homePrimary-200 mb-4" />,
        title: "Gestión de Cobros",
        description: "Administra tus cobros y pagos de manera centralizada y automatizada.",
      },
      {
        icon: <FaChartLine className="text-3xl text-homePrimary-200 mb-4" />,
        title: "Contabilidad en Tiempo Real",
        description: "Genera reportes y analiza tu contabilidad al instante..",
      },
      {
        icon: <FaUniversity className="text-3xl text-homePrimary-200 mb-4" />,
        title: "Integración Bancaria",
        description: "Conecta y concilia tus transacciones bancarias de forma automática y segura.",
      },
    ];

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)');
        setIsMobile(mediaQuery.matches);
        
        const handleResize = (e: MediaQueryListEvent) => {
          setIsMobile(e.matches);
        };
    
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
      }, []);
    
      useEffect(() => {
        const threshold = isMobile ? 0.3 : 0.4; 
    
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(entry.isIntersecting);
          },
          { 
            threshold
          }
        );
    
        if (sectionRef.current) observer.observe(sectionRef.current);
        
        return () => {
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
      }, [isMobile]); 
    
  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-20 flex flex-col items-center justify-center"
    >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-homePrimary/30 via-black/90 to-black opacity-95 blur-[100px]" />

      <div className="relative z-10 max-w-4xl text-center px-4 ml">
        <h1 className={`text-5xl font-bold text-white mb-8 transition-all duration-700 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          Axia Invoice Simplifica tu facturación y contabilidad
        </h1>
        
        <p className={`text-gray-300 mb-16 transition-all duration-700 ease-out transform delay-150 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          Emite facturas electrónicas, gestiona tus cobros y lleva tu contabilidad de forma intuitiva y eficiente.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out transform delay-300 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <div>
            <div className="max-w-6xl mx-auto">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <CardHeroBlur
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    />
                ))}
                </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
