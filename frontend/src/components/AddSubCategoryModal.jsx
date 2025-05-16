import React, { useEffect } from "react";
import Modal from "./Modal";
import api from "../lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddSubCategoryModal = ({ isOpen, onClose }) => {
  const [subCategory, setSubCategory] = useState("");
  const [getCategory, setGetCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const getAllCategories = async () => {
    const res = await api.get("/categories/getall");
    setGetCategory(res.data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await api.post("/subcategories/create", { name: subCategory,categoryId:categoryId });
        toast.success("Subcategory created successfully");
        setSubCategory("");
        setCategoryId("");
        onClose();
        console.log(res);
      } catch (error) {
          toast.error("Error creating Subcategory: " + error.response?.data?.message || "Unknown error");
          console.log(error);
      }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Subcategory">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
                {getCategory.length > 0 ? (
                <select
                className="mt-1 block w-full p-2 border rounded-md"
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option disabled selected hidden value="">Select Category</option>
                {getCategory.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
              ) : (
                <p>No categories found</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subcategory Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Enter subcategory name"
                onChange={(e) => setSubCategory(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Add Subcategory
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddSubCategoryModal;
