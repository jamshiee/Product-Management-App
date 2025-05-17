import React, { useEffect, useState } from "react";
import Header from "../components/dashboard/Header";
import useProductStore from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import EditProductModal from "../components/EditProductModal";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const { productDetails } = useProductStore();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (productDetails && productDetails.variants && productDetails.variants.length > 0) {
      setSelectedVariant(productDetails.variants[0]);
    }
  }, [productDetails]);

  useEffect(() => {
    if (!productDetails) {
      navigate('/');
    }
  }, [productDetails, navigate]);

  if (!productDetails || !productDetails.variants || !selectedVariant) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="text-xl">Loading product details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-30 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <span className="cursor-pointer" onClick={() => navigate("/")}>
            Home
          </span>{" "}
          {">"}{" "}
          <span onClick={() => navigate("/products")}>Product details</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            {/* Product Main Thumbnail */}
            <div className="border w-[100%] rounded-xl p-4 flex justify-center">
              <img
                src={productDetails.images[0]}
                alt="product"
                className="w-[350px] h-[350px] object-contain"
              />
            </div>

            {/* Product Thumbnails */}
            {productDetails.images && productDetails.images.length > 2 && (
              <div className="flex justify-between">
                <div className="flex mt-4 gap-4">
                  <div className="w-45 h-35 border rounded-xl p-2 flex items-center justify-center cursor-pointer">
                    <img
                      src={productDetails.images[1]}
                      alt="thumbnail"
                      className="object-contain h-full"
                    />
                  </div>
                </div>

                <div className="flex mt-4 gap-4">
                  <div className="w-45 h-35 border rounded-xl p-2 flex items-center justify-center cursor-pointer">
                    <img
                      src={productDetails.images[2]}
                      alt="thumbnail"
                      className="object-contain h-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-semibold text-[#003f62] my-2">
              {productDetails.title}
            </h1>
            <p className="text-2xl font-semibold text-gray-500 my-2">
              ${selectedVariant.price}
            </p>

            <p className="text-sm font-medium text-gray-700 my-1">
              Description: {productDetails.description}
            </p>

            <p className="text-sm font-medium text-gray-700 my-1">
              Availability:{" "}
              <span className="text-green-600">
                {selectedVariant.quantity > 0 ? "In stock" : "Out of stock"}
              </span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {selectedVariant.quantity > 0
                ? `Hurry up! only ${selectedVariant.quantity} product left in stock!`
                : "Currently out of stock"}
            </p>

            <div className="bg-gray-300 rounded-full my-5 h-[2px] w-[100%]"></div>
            <div className="mb-4">
              <p className="font-medium text-gray-700 mb-2">Ram:</p>
              <div className="flex gap-2">
                {productDetails.variants.map((variant, i) => (
                  <button
                    key={i}
                    className={`px-4 py-1 border rounded-md text-sm ${
                      selectedVariant.ram === variant.ram
                        ? "bg-[#003f62] text-white"
                        : "bg-white text-[#003f62] border-[#003f62]"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.ram}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-medium text-gray-700 mb-2">Quantity:</p>
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 border rounded-md flex justify-center items-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-sm font-medium px-2">{quantity}</span>
                <button
                  className="w-7 h-7 border rounded-md flex justify-center items-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsProductModalOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-300 text-white cursor-pointer font-medium px-6 py-3 rounded-2xl"
              >
                Edit product
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-300 text-white cursor-pointer font-medium px-6 py-3 rounded-2xl">
                Buy it now
              </button>
              <button className="rounded-full p-1">
                <svg
                  className="w-11 h-11 p-2 rounded-full bg-gray-300 cursor-pointer hover:bg-red-400 hover:text-white text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          if (productDetails?.variants?.length > 0) {
            setSelectedVariant(productDetails.variants[0]);
          }
        }}
      />
    </div>
  );
};

export default Product;
