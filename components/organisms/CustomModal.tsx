import * as Dialog from "@radix-ui/react-dialog";
import { ClipboardPenLine } from 'lucide-react';
import React from "react";
import CustomButton from "../atoms/CustomButton";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string; 
    children: React.ReactNode;
}

export default function CustomModal({ isOpen, onClose, title, children }: CustomModalProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                
                <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">

                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                        <div className="flex flex-row gap-x-3">
                            <ClipboardPenLine color="black" />
                            <Dialog.Title className="text-lg font-bold border-b pb-2 mb-4 text-black">{title}</Dialog.Title>
                        </div>

                        {children}

                        <div className="col-span-2 flex justify-end gap-2 mt-4">
                            <CustomButton text="Close" style="border text-gray-500 bg-white hover:bg-gray-300" typeButton="button" onClickButton={onClose} />
                            <CustomButton text="Keep" style="border bg-white text-gray-500 hover:bg-gray-300" typeButton="submit" onClickButton={onClose} />
                        </div>
                    </div>

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}
