import { create } from "zustand";

const useProductStore = create((set) => ({
  productDetails: null,
  setProductDetails: (productDetails) => set({ productDetails }),
}));

export default useProductStore;
