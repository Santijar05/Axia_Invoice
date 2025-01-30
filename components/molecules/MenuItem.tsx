import React from 'react';

interface MenuItemProps {
    iconClass: string; 
    label: string;
}

export default function MenuItem({ iconClass, label }: MenuItemProps) {
    return (
        <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
            <span className="text-2xl"><i className={iconClass}></i></span>
            <span>{label}</span>
        </a>
    );
}
