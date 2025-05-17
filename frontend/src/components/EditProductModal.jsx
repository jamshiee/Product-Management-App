import React, { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import api from "../lib/axios.js"; 
import { toast } from "react-toastify";
import useProductStore from "../store/useProductStore.js";

const EditProductModal = ({ isOpen, onClose }) => {
  const { productDetails, setProductDetails, subCategories, getAllSubCategories } = useProductStore();

  const [formData, setFormData] = useState({
    title: '',
    subcategory: '',
    description: '',
    variants: []
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productDetails) {
      setFormData({
        title: productDetails.title || '',
        subcategory: productDetails.subcategory || '',
        description: productDetails.description || '',
        variants: [...(productDetails.variants || [])]
      });
    }
  }, [productDetails]);

  useEffect(() => {
    getAllSubCategories();
  }, [getAllSubCategories]);

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { ram: "4GB", price: "", quantity: 1 }]
    }));
  };

  const updateVariant = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const changeQuantity = (index, amount) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => {
        if (i !== index) return variant;
        const newQty = variant.quantity + amount;
        return { ...variant, quantity: newQty < 1 ? 1 : newQty };
      })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const res = await api.put(`/products/update/${productDetails._id}`, formData);
      
      setProductDetails({
        ...productDetails,
        ...formData
      });
      
      toast.success("Product updated successfully");
      onClose();
    } catch (error) {
      toast.error("Error: " + error.response?.data?.message );
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="flex gap-7 items-center">
          <label className="block text-md text-gray-800 font-semibold">Title: </label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-600 rounded-xl"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        {/* Variants */}
        <div>
          <label className="block text-md text-gray-800 font-semibold">Variants: </label>
          {formData.variants.map((variant, index) => (
            <div key={index} className="flex gap-4 my-3 items-end justify-between">
              {/* RAM */}
              <div className="flex gap-4 items-center">
                <label className="text-md text-gray-600 font-semibold">RAM: </label>
                <select
                  className="w-full p-2 border rounded"
                  value={variant.ram}
                  onChange={(e) => updateVariant(index, "ram", e.target.value)}
                >
                  {["4GB", "8GB", "16GB", "32GB"].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="flex gap-4 items-center">
                <label className="text-md text-gray-600 items-center font-semibold">Price: </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full p-2 ps-6 border rounded"
                    value={variant.price}
                    onChange={(e) => updateVariant(index, "price", e.target.value)}
                    required
                  />
                  <span className="text-md text-gray-600 absolute ps-2 top-1/2 -translate-y-1/2 left-1">$</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex gap-4 items-center">
                <label className="text-md text-gray-600 font-semibold">Qty: </label>
                <div className="flex items-center border rounded px-2 py-1">
                  <button
                    type="button"
                    className="text-xl px-2"
                    onClick={() => changeQuantity(index, -1)}
                  >
                    −
                  </button>
                  <span className="px-2">{variant.quantity}</span>
                  <button
                    type="button"
                    className="text-xl px-2"
                    onClick={() => changeQuantity(index, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addVariant}
              className="mt-2 px-3 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900"
            >
              + Add Variant
            </button>
          </div>
        </div>

        {/* Subcategory */}
        <div className="flex gap-7 items-center">
          <label className="block text-md text-gray-800 font-semibold">Subcategory: </label>
          {subCategories.length > 0 ? (
            <select
              className="mt-1 w-full p-2 border border-gray-600 rounded-xl"
              value={formData.subcategory}
              onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
              required
            >
              <option disabled value="">
                Select subcategory
              </option>
              {subCategories.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500">No subcategories found</p>
          )}
        </div>

        {/* Description */}
        <div className="flex gap-7">
          <label className="block text-md text-gray-800 font-semibold">Description: </label>
          <textarea
            className="mt-1 w-full p-2 border border-gray-600 rounded-xl"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter product description"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className={`px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
