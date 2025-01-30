import React from 'react';
import MenuItem from '../molecules/MenuItem';

interface SidebarProps {
    asideOpen: boolean;
}

export default function Sidebar({ asideOpen }: SidebarProps) {
    if (!asideOpen) return null;
    return (
        <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{ height: '90.5vh' }}>
            <MenuItem iconClass="bx bx-home" label="Dashboard" />
            <MenuItem iconClass="bx bx-cart" label="Cart" />
            <MenuItem iconClass="bx bx-shopping-bag" label="Shopping" />
            <MenuItem iconClass="bx bx-heart" label="My Favourite" />
            <MenuItem iconClass="bx bx-user" label="Profile" />
        </aside>
    );
}
