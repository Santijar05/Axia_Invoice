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
      <h2 className="text-2xl font-semibold p-4 border-b text-black">Latest products</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-medium text-black">Distributor</th>
              <th className="p-3 text-left text-medium text-black">Product</th>
              <th className="p-3 text-left text-medium text-black">Brand</th>
              <th className="p-3 text-left text-medium text-black">Presentation</th>
              <th className="p-3 text-left text-medium text-black">Batch</th>
              <th className="p-3 text-left text-medium text-black">Stock</th>
              <th className="p-3 text-left text-medium text-black">Price</th>
            </tr>
          </thead>

         
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 text-black">{product.distributor}</td>
                <td className="p-3 text-black">{product.product}</td>
                <td className="p-3  text-black">{product.brand}</td>
                <td className="p-3  text-black">{product.presentation}</td>
                <td className="p-3  text-black">{product.batch}</td>
                <td className="p-3 bg-blue-400  text-black">{product.stock}</td>
                <td className="p-3  text-black">{product.price}</td>
              </tr>
            ))}
          </tbody>

        </table>
        
      </div>
    </div>
  );
}


