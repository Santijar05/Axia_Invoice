"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  variant?: "navbar" | "sidebar";
  isCollapsed?: boolean;
}

export default function LanguageSelector({ 
  variant = "navbar", 
  isCollapsed = false 
}: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // Función para cambiar el idioma
  const handleLanguageChange = (languageCode: string) => {
    if (languageCode === locale) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split("/");
    segments[1] = languageCode; // Reemplazar el segmento de idioma
    const newPath = segments.join("/");
    
    router.push(newPath);
    setIsOpen(false);
  };

  // Estilos específicos según la variante
  const buttonStyles = variant === "navbar"
    ? "flex items-center space-x-1 text-gray-300 hover:text-white px-2 py-1 rounded-md"
    : "flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition-all text-gray-500";

  const dropdownStyles = variant === "navbar"
    ? "absolute mt-1 right-0 z-50 bg-gray-800 rounded-md shadow-lg overflow-hidden min-w-[120px]"
    : "absolute left-12 mt-1 z-50 bg-gray-800 rounded-md shadow-lg overflow-hidden min-w-[120px]";

  // Si es sidebar colapsado, mostrar solo el icono
  if (variant === "sidebar" && isCollapsed) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          <Globe className="h-5 w-5 text-gray-500" />
        </button>
        
        {isOpen && (
          <div className="absolute left-12 mt-1 z-50 bg-gray-800 rounded-md shadow-lg overflow-hidden min-w-[120px]">
            {languages.map(language => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                  language.code === locale ? 'bg-gray-700 text-white' : 'text-gray-300'
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={buttonStyles}
      >
        <Globe className="h-5 w-5" />
        {(variant === "navbar" || !isCollapsed) && (
          <>
            <span>{currentLanguage.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>
      
      {isOpen && (
        <div className={dropdownStyles}>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                language.code === locale ? 'bg-gray-700 text-white' : 'text-gray-300'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}