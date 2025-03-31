import * as Dialog from "@radix-ui/react-dialog";
import { ClipboardPenLine } from 'lucide-react';
import React, { useRef, ReactElement, cloneElement,} from "react";
import CustomButton from "../atoms/CustomButton";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string; 
    children: ReactElement;
}

export default function CustomModal({ isOpen, onClose, title, children }: CustomModalProps) {
    const formRef = useRef<HTMLFormElement>(null); 

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                
                <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">

                    <div className="w-full border max-w-lg bg-black rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-row gap-x-3">
                            <ClipboardPenLine color="white" />
                            <Dialog.Title className="text-lg font-bold border-b pb-2 mb-4 text-homePrimary-200">{title}</Dialog.Title>
                        </div>

                        {/* Clonamos el formulario y le pasamos la ref */}
                        {React.isValidElement(children) &&
                            React.cloneElement(children, { ref: formRef } as any)
                        }
                
                        <div className="col-span-2 flex justify-end gap-2 mt-4">
                            <CustomButton text="Close" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onClose} />
                            <CustomButton text="Keep" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" onClickButton={handleSubmit} />
                        </div>
                    </div>

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}
