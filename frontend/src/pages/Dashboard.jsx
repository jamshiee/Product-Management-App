import React, { useState } from "react";
import Header from "../components/dashboard/Header";
import SideBar from "../components/dashboard/SideBar";
import ProductGrid from "../components/dashboard/ProductGrid";
import Pagination from "../components/dashboard/Pagination";
import AddProductModal from "../components/AddProductModal";
import AddSubCategoryModal from "../components/AddSubCategoryModal";
import AddCategoryModal from "../components/AddCategoryModal";

const Dashboard = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <SideBar />
        <main className="flex-1">
          <div className="flex justify-end p-4 space-x-4">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-yellow-400 font-medium shadow-sm text-white px-4 py-2 rounded-2xl hover:bg-yellow-300 hover:cursor-pointer"
            >
              Add category
            </button>
            <button
              onClick={() => setIsSubcategoryModalOpen(true)}
              className="bg-yellow-400 font-medium shadow-sm text-white px-4 py-2 rounded-2xl hover:bg-yellow-300 hover:cursor-pointer"
            >
              Add sub category
            </button>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="bg-yellow-400 font-medium shadow-sm text-white px-4 py-2 rounded-2xl hover:bg-yellow-300 hover:cursor-pointer"
            >
              Add product
            </button>
          </div>
          <ProductGrid />
          <Pagination />
        </main>
      </div>
      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
      <AddSubCategoryModal
        isOpen={isSubcategoryModalOpen}
        onClose={() => setIsSubcategoryModalOpen(false)}
      />
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
