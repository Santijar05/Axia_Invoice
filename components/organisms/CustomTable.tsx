import React from "react";

export default function CustomTable() {
  const products = Array(8).fill({
    distributor: "Test",
    product: "Test",
    brand: "Test",
    presentation: "Test",
    batch: "Test",
    stock: "Test",
    price: "Test",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <h2 className="text-lg font-semibold p-4 border-b">Latest products</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">Distributor</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Presentation</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Price</th>
            </tr>
          </thead>

         
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{product.distributor}</td>
                <td className="p-3">{product.product}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">{product.presentation}</td>
                <td className="p-3">{product.batch}</td>
                <td className="p-3 bg-blue-400 text-white">{product.stock}</td>
                <td className="p-3">{product.price}</td>
              </tr>
            ))}
          </tbody>

        </table>
        
      </div>
    </div>
  );
}


