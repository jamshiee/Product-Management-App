import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import api from '../../lib/axios';
import { toast } from 'react-toastify';
import useProductStore from '../../store/useProductStore';
import { useNavigate } from 'react-router-dom';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setProductDetails, searchQuery, markedSubCategories, newProductCreated } = useProductStore();
  const navigate = useNavigate();

  const listProducts = async () => {
    try {
      const res = await api.get("/products/getall");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error loading products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listProducts();
    }, [newProductCreated]);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    console.log("markedSubCategories:",markedSubCategories);
    
    if (markedSubCategories.length > 0) {
      result = result.filter(product => 
        markedSubCategories.includes(product.subcategory)
      );
    }

    setFilteredProducts(result);
  }, [products, searchQuery,markedSubCategories]);

  if (loading) {
    return <div className="flex justify-center items-center p-4">Loading products...</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="flex justify-center items-center p-4">No products found.</div>;
  }

  const handleProductClick = (product) => {
    setProductDetails(product);
    navigate(`/product`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredProducts.map((product, index) => (
          <ProductCard 
            product={product}
            key={product._id || index} 
            name={product.title} 
            price={product.variants[0].price} 
            handleProductClick={() => handleProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;