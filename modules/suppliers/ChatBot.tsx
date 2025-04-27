import { useState } from 'react';
import { TrendingUp, PackageSearch, BadgeDollarSign, CreditCard, Truck, Star, ArrowLeft, MessageSquare } from 'lucide-react'; 

import { ProductDAO } from '@/types/Api';
import CustomButton from '../../components/atoms/CustomButton';
import SearchBarUniversal from '../../components/molecules/SearchBar';
import { findBetterSuppliers } from '@/lib/api-suppliers';

type Filters = "Mejor precio" | "Mejores condiciones de pago" | "Mejor tiempo de entrega" | "Mejor reputación";
type Answers = {
    searchType: "Tendencias de proveedores en el sector" | "Buscar proveedores con mejores precios o planes" | null;
    product: ProductDAO | null;
    filters: Filters[];
};

export default function ChatBot() {
    const [supplierResults, setSupplierResults] = useState<any[]>([]);
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1); 
    const [answers, setAnswers] = useState<Answers>({
        searchType: null,
        product: null,
        filters: [],
    });

    const searchTypeOptions = [
        {
            label: "Tendencias de proveedores en el sector",
            value: "Tendencias de proveedores en el sector" as const,
            icon: TrendingUp,
        },
        {
            label: "Buscar proveedores con mejores precios o planes",
            value: "Buscar proveedores con mejores precios o planes" as const,
            icon: PackageSearch,
        },
    ];

    const filtersOptions = [
        { label: "Mejor precio", value: "Mejor precio" as Filters, icon: BadgeDollarSign },
        { label: "Mejores condiciones de pago", value: "Mejores condiciones de pago" as Filters, icon: CreditCard },
        { label: "Mejor tiempo de entrega", value: "Mejor tiempo de entrega" as Filters, icon: Truck },
        { label: "Mejor reputación", value: "Mejor reputación" as Filters, icon: Star },
    ];    

    const toggleChatWindow = () => {
        if (isChatOpen) {
            resetChat();
        }
        setIsChatOpen((prev) => !prev);
    };

    const resetChat = (): void => {
        setAnswers({
            searchType: null,
            product: null,
            filters: [],
        });

        setStep(1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleAnswer = async (question: keyof Answers, answer: any): Promise<void> => {  
        const newAnswers = { ...answers, [question]: answer }; // crear una copia actualizada
    
        setAnswers(newAnswers); // actualizar el estado
    
        if (question === "searchType") {
            if (answer === "Buscar proveedores con mejores precios o planes") {
                setStep(2); // continuar flujo normal
            } else {
                setStep(4); // directamente ir al final si es tendencias
            }
            return;
        }
    
        if (newAnswers.searchType === "Buscar proveedores con mejores precios o planes") {
            if (question === "product") {
                setStep(3);
            } else if (question === "filters") {
                setStep(4);
    
                if (newAnswers.product && newAnswers.product.id) {
                    setIsLoadingResults(true);
                    try {
                        const results = await findBetterSuppliers(newAnswers.product.id, answer[0]);
                        setSupplierResults(results);
                        console.log("hola", results)
                    } catch (error) {
                        console.error('Error buscando proveedores:', error);
                        setSupplierResults([]);
                    } finally {
                        setIsLoadingResults(false);
                    }
                }
            }
        }
    };    

    return (
        <div className="fixed bottom-4 right-4">

            <button 
                onClick={toggleChatWindow} 
                className="bg-homePrimary-400 text-white p-4 rounded-full shadow-lg focus:outline-none"
            >
                <span className="text-lg">💬</span>
            </button>

            {isChatOpen && (
                <div className="fixed bottom-16 right-12 bg-black shadow-lg rounded-lg w-80 h-96 border">
                    <div className="p-4">
                        <h3 className="text-lg font-bold">ChatBot</h3>
                        <div className="overflow-y-auto h-72 mb-2 mt-2">
                            
                            {step === 1 && (
                                <div className='space-y-3'>
                                    <p>1. ¿Qué tipo de búsqueda deseas realizar?</p>

                                    {searchTypeOptions.map((option) => (
                                        <CustomButton
                                            key={option.value}
                                            text={option.label}
                                            onClickButton={() => handleAnswer("searchType", option.value)}
                                            style="bg-homePrimary text-white w-full hover:bg-blue-800"
                                            icon={option.icon}
                                        />
                                    ))}
                                </div>
                            )}

                            {step === 2 && answers.searchType === "Buscar proveedores con mejores precios o planes" && (
                                <div className='space-y-3'>
                                    <p> 2. ¿Qué producto deseas consultar?</p>
                                    
                                    <SearchBarUniversal
                                        searchType="products"
                                        onAddToCart={(item) => handleAnswer("product", item as ProductDAO)}
                                        showResults={true}
                                        placeholder="Productos disponibles"
                                    />

                                    <CustomButton
                                        text="Volver"
                                        onClickButton={handleBack}
                                        style="text-gray-500 w-full"
                                        icon={ArrowLeft}
                                    />
                                </div>
                            )}

                            {step === 3 && answers.searchType === "Buscar proveedores con mejores precios o planes" && answers.product && (
                                <div className='space-y-3'>
                                    <p>3. ¿Prefieres que busquemos proveedores que ofrezcan...?</p>

                                    {filtersOptions.map((option) => (
                                        <CustomButton
                                            key={option.value}
                                            text={option.label}
                                            onClickButton={() => handleAnswer("filters", [option.value])}
                                            style="bg-homePrimary text-white w-full hover:bg-blue-800"
                                            icon={option.icon}
                                        />
                                    ))}

                                    <CustomButton
                                        text="Volver"
                                        onClickButton={handleBack}
                                        style="text-gray-500 w-full"
                                        icon={ArrowLeft}
                                    />
                                </div>
                            )}


                            {step === 4 && (
                                <div className="space-y-2">
                                    {answers.searchType === "Buscar proveedores con mejores precios o planes" ? (
                                        <>
                                            {isLoadingResults ? (
                                                <p>Buscando proveedores ideales para ti...</p>
                                            ) : supplierResults.length > 0 ? (
                                                <div className="space-y-2">
                                                    <p className="font-bold">Proveedores encontrados:</p>
                                                    {supplierResults.map((supplier, index) => (
                                                        <div key={index} className="p-2 border rounded">
                                                            <p><strong>Nombre:</strong> {supplier.name}</p>
                                                            <p><strong>Precio:</strong> {supplier.price}</p>
                                                            <p><strong>Tiempo de entrega:</strong> {supplier.deliveryTime}</p>
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No encontramos proveedores que cumplan con tu búsqueda.</p>
                                            )}
                                        </>
                                    ) : (
                                        <p>Gracias por tu respuesta. Estamos procesando tu búsqueda...</p>
                                    )}
                                </div>
                            )}

                        </div>

                        {step !== 4 && (
                            <CustomButton
                                text="Cerrar chat"
                                onClickButton={() => setIsChatOpen(false)}
                                style="text-gray-500 w-full"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};