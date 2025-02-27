"use client"

import type React from "react"
import {Search} from "lucide-react"

import Input from "../atoms/Input"

const SearchBar: React.FC = () => {
    return (
        <div className="flex">
            <Input 
                icon={Search}
                placeholder="Search..." 
            />
        </div>
    )
}

export default SearchBar

