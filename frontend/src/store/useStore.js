import { create } from "zustand";

const useStore = create((set) => ({
  user:  localStorage.getItem("user") ||  null,
  token: localStorage.getItem("token") || null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));

export default useStore;

