import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "./Modal";
import useProductStore from "../store/useProductStore";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState("");
  const { createCategory } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(category);
      setCategory("");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Category">
        <div>
          <form>
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border rounded-md"
                    placeholder="Enter category name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                  Add Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AddCategoryModal;
