import React from 'react'

const ProductCard = ({ name, price, product, handleProductClick }) => {
  return (  
    
      <div onClick={() => handleProductClick(product)}>
      <div className="bg-white p-7 py-6 rounded-2xl border border-gray-300 relative">
        <button className="absolute top-2 right-2" >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
        </div>
        <h3 className="mt-6 font-medium truncate">{name}</h3>
        <p className="text-lg font-medium text-gray-800">${price}</p>
        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      </div>
    
  )
}

export default ProductCard