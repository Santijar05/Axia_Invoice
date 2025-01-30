import React from 'react';

interface IconButtonProps {
    iconClass: string;
    action: () => void;
}

export default function IconButton({ iconClass, action }: IconButtonProps) {
    return (
        <button type="button" className="text-3xl" onClick={action}>
            <i className={iconClass}></i>
        </button>
    );
}
