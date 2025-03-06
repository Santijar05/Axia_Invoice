import React, { useState } from "react";
import Switch from "react-switch";

import Input from "@/components/atoms/Input";

export default function BrandForm() {
    const [isCurrent, setIsCurrent] = useState(true);

    return (
        <div className="grid">

            <div className="pb-2">
                <label className="text-sm text-gray-500 font-semibold">Product</label>
                <label className="text-lg text-red-600 font-semibold"> *</label>
            </div>
            <Input 
                placeholder="EJ. SAMSUNG" 
                type="text" 
            />

            <div className="pt-6">
                <div className="col-span-2 gap-x-3 flex mt-2">
                    <label className="text-sm text-gray-500 font-semibold py-1">CURRENT</label>
                    <Switch checked={isCurrent} onChange={setIsCurrent} />
                </div>
            </div>
        </div>
    );
}
