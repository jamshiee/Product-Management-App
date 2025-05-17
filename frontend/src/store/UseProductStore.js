import { create } from "zustand";
import api from "../lib/axios";
import { toast } from "react-toastify";

const useProductStore = create((set, get) => ({
  productDetails: null,
  isWished: false,
  categories: [],
  subCategories: [],
  //To check if a new product is created
  newProductCreated: false,

  //For Search and Filter
  searchQuery: "",
  markedSubCategories: [],

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  // mimics React's useState, which  accepts either a direct value or a function.
  setMarkedSubCategories: (updater) =>
    set((state) => ({
      markedSubCategories:
        typeof updater === 'function'
          ? updater(state.markedSubCategories)
          : updater,
    })),

  setNewProductCreated: (value) => set({ newProductCreated: value }),
    
    //To Toggle Wish Button
  setIsWished: (isWished) => set({isWished}),
  setProductDetails: (productDetails) => set({ productDetails }),
  // Category actions
  setCategories: (categories) => set({ categories }),


  getAllCategories: async () => {
    try {
      const res = await api.get("/categories/getall");
      set({ categories: res.data });
      return res.data;
    } catch (error) {
      toast.error("Error fetching categories: " + error.response?.data?.message);
    }
  },
  createCategory: async (name) => {
    try {
      const res = await api.post("/categories/create", { name });
      toast.success("Category created successfully");
      await get().getAllCategories(); 
      return res.data;
    } catch (error) {
      toast.error("Error creating category: " + error.response?.data?.message);
  
    }
  },


  setSubCategories: (subCategories) => set({ subCategories }),
  getAllSubCategories: async () => {
    try {
      const res = await api.get("/subcategories/getall");
      set({ subCategories: res.data });
      return res.data;
    } catch (error) {
      toast.error("Error fetching subcategories: " + error.response?.data?.message );
    }
  },
  createSubCategory: async (name, categoryId) => {
    try {
      const res = await api.post("/subcategories/create", { name, categoryId });
      toast.success("Subcategory created successfully");
      await get().getAllSubCategories(); 
      return res.data;
    } catch (error) {
      toast.error("Error creating Subcategory: " + error.response?.data?.message );
  
    }
  }
}));

export default useProductStore;
