import React from 'react'

export default function TableHeader({
    children
}: {
    children: React.ReactNode;
}) {  
    return <th className="p-2 border-b bg-gray-200 font-bold">{children}</th>;
}
