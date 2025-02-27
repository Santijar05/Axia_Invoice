import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import axiaLogo from '@/public/Images/logo_blanco.png';

export const BrandSection: React.FC = () => {
    return (
        <div className="md:col-span-2">
            <div className="mb-4">
                <Image
                    src={axiaLogo}
                    alt="Axia Invoice"
                    width={70}
                    height={40}
                />
            </div>
            <p className="text-sm text-gray-400">
                Innovando la gestión empresarial: tu aliado <br></br> en facturación, inventario y análisis de datos.
            </p>
            <div className="mt-4 flex space-x-4">
                {/* Iconos de redes sociales */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook 
                        className="w-6 h-6 text-gray-400 hover:text-white transition" 
                    />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter 
                        className="w-6 h-6 text-gray-400 hover:text-white transition" 
                    />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin 
                        className="w-6 h-6 text-gray-400 hover:text-white transition" 
                    />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram 
                        className="w-6 h-6 text-gray-400 hover:text-white transition" 
                    />
                </a>
            </div>
        </div>
    );
}