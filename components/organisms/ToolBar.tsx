import React from "react";
import { CirclePlus, Printer} from "lucide-react";

import SearchBar from "../molecules/SearchBar";

export default function Toolbar() {
    return (
        <div className="p-4 bg-white shadow">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Proveedores</h2>
                <div className="flex gap-3">
                    <button className="flex items-center bg-[#1e3c8b] text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                        <CirclePlus className="mr-2" /> Agregar Nuevo/a
                    </button>
                    <button className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                        <Printer className="mr-2" /> Imprimir Reporte
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center rounded-lg py-1 w-72">
                    <SearchBar/>
                </div>
            </div>
        </div>
    );
}
