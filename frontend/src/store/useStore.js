import { create } from "zustand";

const useStore = create((set) => ({
  user:  localStorage.getItem("user") ||  null,
  token: localStorage.getItem("token") || null,


  signOut: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
    window.location.href = "/";
  },

  
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));

export default useStore;

