import React from 'react'
import ProductCard from './ProductCard';

const ProductGrid = () => {
    const products = [
        { name: "HP AMD Ryzen 3", price: "529.99" },
        { name: "HP AMD Ryzen 3", price: "529.99" },
        { name: "HP AMD Ryzen 3", price: "529.99" },
        { name: "HP AMD Ryzen 3", price: "529.99" },
        { name: "HP AMD Ryzen 3", price: "529.99" },
        { name: "HP AMD Ryzen 3", price: "529.99" },
      ];
  return (
    <div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {products.map((product, index) => (
            <ProductCard key={index} name={product.name} price={product.price} />
          ))}
        </div>
    </div>
  )
}

export default ProductGrid