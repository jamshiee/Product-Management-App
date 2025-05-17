import React, { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import api from "../lib/axios.js"; 
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../lib/cloudinary.js";

const AddProductModal = ({ isOpen, onClose}) => {
  const [title, setTitle] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [listSubcategories, setListSubcategories] = useState([]);
  const [variants, setVariants] = useState([
    { ram: "4GB", price: "", quantity: 1 },
  ]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  console.log("subcategory: ",subcategory);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await api.get("/subcategories/getall");
        setListSubcategories(res.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, []);

  const addVariant = () => {
    setVariants((prev) => [...prev, { ram: "4GB", price: "", quantity: 1 }]);
  };

  const updateVariant = (index, field, value) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    );
  };

  const changeQuantity = (index, amount) => {
    setVariants((prev) =>
      prev.map((variant, i) => {
        if (i !== index) return variant;
        const newQty = variant.quantity + amount;
        return { ...variant, quantity: newQty < 1 ? 1 : newQty };
      })
    );
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    if (newImages.length > 3) {
      toast.error("You can upload a maximum of 3 images.");
      return;
    }
    setImages(newImages);
    const previewImages = newImages.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewImages);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {

      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const imageUrl = await uploadToCloudinary(image);
          return imageUrl;
        })
      );

      const productData = {
        title,
        subcategory,
        description,
        variants,
        images: uploadedImageUrls,
      };

      console.log("productData: ",productData);

      const res = await api.post("/products/create", productData);
      toast.success("Product created successfully");
      console.log(res.data);
      onClose();
      setTitle("");
      setSubcategory("");
      setDescription("");
      setVariants([{ ram: "4GB", price: "", quantity: 1 }]);
      setImages([]);
    } catch (error) {
      toast.error("Error: " + error.response?.data?.message || "Unknown error");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Add Product"}>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        {/* Title */}
        <div className="flex gap-7 items-center">
          <label className="block text-md text-gray-800 font-semibold ">Title: </label>
          <input
            type="text"
            className="mt-1 w-full p-2 border border-gray-600 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Variants */}
        <div >
          <label className="block text-md text-gray-800 font-semibold ">Variants: </label>
          {variants.map((variant, index) => (
            <div key={index} className="flex gap-4 my-3 items-end justify-between ">
              {/* RAM */}
              <div className="flex gap-4 items-center">
                <label className="text-md text-gray-600  font-semibold">RAM: </label>
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
                <div className="relative ">
                <input
                  type="number"
                  
                  className="w-full p-2 ps-6 border rounded"
                  value={variant.price}
                  onChange={(e) =>
                    updateVariant(index, "price", e.target.value)
                  }
                  required
                />
                    <span className="text-md text-gray-600  absolute ps-2 top-1/2 -translate-y-1/2 left-1">$</span>
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
            className="mt-2 px-3 py-2 bg-gray-800  text-white rounded-xl hover:bg-gray-900"
          >
            + Add Variant
        </button>
        </div>
        </div>

        {/* Subcategory */}
        <div className="flex gap-7 items-center">
          <label className="block text-md text-gray-800 font-semibold">Subcategory: </label>
          {listSubcategories.length > 0 ? (
            <select
              className="mt-1 w-full p-2 border border-gray-600 rounded-xl"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            >
              <option disabled selected hidden value="">
                Select subcategory
              </option>
              {listSubcategories.map((s) => (
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
        <div className="flex gap-7 ">
          <label className="block text-md text-gray-800 font-semibold">Description: </label>
          <textarea
            className="mt-1 w-full p-2 border border-gray-600 rounded-xl"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-md text-gray-800 font-semibold">Upload Images: </label>
          <div className="flex space-x-2 my-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                {previewImages[index] ? (
                  <img
                    src={previewImages[index]}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">No Images</span>
                )}
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 hover:cursor-pointer bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
            {images.length < 3 && (
              <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </label>
            )}
          </div>
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
            {isUploading ? 'Uploading...' : 'Add Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
