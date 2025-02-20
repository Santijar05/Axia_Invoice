"use client"

import type React from "react"

import Input from "../atoms/Input"

const SearchBar: React.FC = () => {
    return (
        <div className="flex">
            <Input placeholder="Search..." />
        </div>
    )
}

export default SearchBar

