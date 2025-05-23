import React, { useEffect, useState } from "react";
import useProductStore from "../../store/useProductStore";

const SideBar = () => {
  const { categories, subCategories, getAllCategories, getAllSubCategories,markedSubCategories,setMarkedSubCategories } =
    useProductStore();
  // const [markedSubCategories, setMarkedSubCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
    getAllSubCategories();
  }, [getAllCategories, getAllSubCategories]);

  const handleSubCategoryChange = (subCategoryId) => {
    setMarkedSubCategories((prev) => {
      if (prev.includes(subCategoryId)) {
        return prev.filter((id) => id !== subCategoryId);
      } else {
        return [...prev, subCategoryId];
      }
    });
  };

  return (
    <div>
      <aside className="w-64 mt-5 p-4">
        <nav className="mb-5">
          <a href="#" className="text-gray-800 font-semibold">
            Home &gt;
          </a>
        </nav>
        <h2 className="font-bold text-[#003f62] mb-3">Categories</h2>
        <ul className="space-y-2 ps-2">
          <li>
            <a href="#" className="text-gray-600">
              All categories
            </a>
          </li>
          {categories.map((item) => (
            <li key={item._id}>
              <details className="group">
                <summary className="flex items-center cursor-pointer">
                  <span>{item.name}</span>
                  <svg
                    className="w-4 h-4 ml-2 group-open:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </summary>
                {subCategories

                  .filter((sub) => sub.category._id === item._id)

                  .map((sub) => (
                    <div key={sub._id} className="ml-4 mt-2 space-y-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2"
                          onChange={() => handleSubCategoryChange(sub._id)}
                        />
                        <span>{sub.name}</span>
                      </label>
                    </div>
                  ))}
              </details>
            </li>
          ))}
        </ul>
      </aside>
     
     
    </div>
  );
};

export default SideBar;
