import React from 'react'

export default function TableCell({
    children
}: {
    children: React.ReactNode;
}) {  
    return <td className="p-2 border-b">{children}</td>;
}
