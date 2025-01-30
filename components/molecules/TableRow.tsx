import React from 'react';
import TableCell from '../atoms/TableCell';

interface TableRowProps {
  data: string[];
}

export default function TableRow({ data }: TableRowProps) {
  return (
    <tr>
      {data.map((item, index) => (
        <TableCell key={index}>{item}</TableCell>
      ))}
    </tr>
  );
}

