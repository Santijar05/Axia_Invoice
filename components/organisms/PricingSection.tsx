'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ToggleSwitch } from '../molecules/ToggleSwitch';
import { PricingCard } from '../molecules/PricingCard';
import Image from "next/image";
import pricingBg from '@/public/Images/pricing-bg1.png';

export const PricingSection: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'mo' | 'yr'>('mo');
  const [activeToggleIndex, setActiveToggleIndex] = useState(0);

  // Estado y referencia para Intersection Observer
  const [rotate, setRotate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Creamos el observador
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si la sección está en pantalla, rotamos la imagen
        if (entry.isIntersecting) {
          setRotate(true);
        } else {
          setRotate(false);
        }
      },
      { threshold: 0.2 } // Ajusta el porcentaje de visibilidad que activa la rotación
    );

    // Observamos el contenedor de la sección
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleToggleChange = (index: number) => {
    setActiveToggleIndex(index);
    setBillingPeriod(index === 0 ? 'mo' : 'yr');
  };

  // Calcula el precio según el periodo (mensual o anual)
  const getPrice = (monthlyPrice: number) => {
    return billingPeriod === 'mo'
      ? monthlyPrice
      : Math.round(monthlyPrice * 10); // Ejemplo: anual = 10 meses
  };

  const plans = [
    {
      title: 'Basic Plan',
      price: getPrice(19),
      features: [
        'Herramientas de facturación e inventario básicas',
        'Gestión de proveedores y clientes',
        'Facturación electrónica básica',
        'Reportes de ventas mensuales',
        'Soporte vía email'
      ],
    },
    {
      title: 'Pro Plan',
      price: getPrice(49),
      features: [
        'Todo lo del Plan Básico',
        'Gestión avanzada de clientes y proveedores',
        'Análisis de datos en tiempo real',
        'Integración básica de IA para pronósticos de ventas e inventario',
        'Soporte prioritario vía email',
        'Reportes de ventas semanales'
      ],
      highlighted: true,
    },
    {
      title: 'All-in Plan',
      price: getPrice(99),
      features: [
        'Todo lo del Plan Pro',
        'Integración completa de IA con inteligencia predictiva',
        'Alertas inteligentes y detección de anomalías',
        'Automatización de reordenes de inventario',
        'Soporte 24/7 premium',
        'Chatbot con IA para consultas y soporte'
      ],
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen text-white flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Fondo con imagen (rotación en base al estado 'rotate') */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: rotate ? 'rotate(55deg)' : 'rotate(0deg)',
          transition: 'transform 2s ease-in-out',
        }}
      >
        <Image
          src={pricingBg}
          alt="Background Image"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="opacity-60"
        />
      </div>

      {/* Contenido de la sección */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Elige tu Plan<br />¡Crece sin Límites!
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Precios claros y honestos para cada etapa de tu negocio. Sin sorpresas, solo crecimiento.
          </p>

          <div className="mt-8">
            <ToggleSwitch
              options={['Monthly', 'Yearly']}
              activeIndex={activeToggleIndex}
              onChange={handleToggleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={billingPeriod}
              features={plan.features}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
