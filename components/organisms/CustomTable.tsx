import React from 'react'
import TableHeader from '../../components/atoms/TableHeader';
import TableRow from '../../components/molecules/TableRow';

interface ExerciseTableProps {
    headers: string[];
    rows: string[][];
}

export default function CustomTable({ headers, rows }: ExerciseTableProps) {
    return (
        <table className="min-w-full border-collapse border">
            <thead>
                <tr>
                {headers.map((header, index) => (
                    <TableHeader key={index}>{header}</TableHeader>
                ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                <TableRow key={index} data={row} />
                ))}
            </tbody>
        </table>
    );
}
