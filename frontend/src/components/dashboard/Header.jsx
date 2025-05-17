import React, { useEffect, useState } from "react";
import WishlistDrawer from "../WishlistDrawer";
import api from "../../lib/axios";
import useProductStore from "../../store/useProductStore";
import useStore from "../../store/useStore";
const Header = () => {

  const { signOut } = useStore();
  const { setSearchQuery } = useProductStore();

  const [wishListData,setWishListData] = useState([])
  const [openWishlist, setOpenWishlist] = useState(false);

  const getWishListItems = async() => {
    try {
      const res = await api.get('/wishlist/getall')
      setWishListData(res.data.wishlist)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getWishListItems();
  },[wishListData])

  return (
    <div>
      <header className="bg-[#003f62] text-white p-4  flex   items-center px-10 mb-4">
        <div className="flex justify-end w-[65%] ">
          <input
            type="text"
            placeholder="Search any things"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w- p-2 rounded-l-xl placeholder:ps-2 placeholder:text-sm text-black bg-white outline-none"
          />
          <button className="bg-yellow-500 text-sm font-medium text-white p-2 rounded-r-xl hover:bg-yellow-600">
            Search
          </button>
        </div>
        <div className="flex items-center justify-end w-[35%] space-x-4">
          <button className="flex items-center space-x-1 cursor-pointer" onClick={() => setOpenWishlist(true)}>
            <svg
              className="w-6 h-6"
              fill="white"
              stroke="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {/* <span className="text-xs bg-[#1a5e83]  rounded-full px-1"> 0 </span> */}
          </button>
         
          <button className="flex items-center space-x-1 cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="white"
              stroke="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          
            {/* <span className="text-xs bg-[#1a5e83]  rounded-full px-1"> 0 </span> */}
          </button>
          <button className="flex items-center space-x-1" onClick={signOut}>
            <span className="text-sm font-medium p-2 rounded-2xl bg-yellow-500 text-white  cursor-pointer">Sign Out</span>
          </button>
        </div>
      </header>
      <WishlistDrawer wishListData={wishListData} isOpen={openWishlist} onClose={() => setOpenWishlist(false)} />
    </div>
  );
};

export default Header;
