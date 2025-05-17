import { toast } from "react-toastify";
import api from "../lib/axios";
import useProductStore from "../store/useProductStore";



const WishlistDrawer = ({ isOpen, onClose , wishListData }) => {

    const { setIsWished } = useProductStore();
    const removeWishList = async (Id) => {
        try {
          const response = await api.post(`/wishlist/toggle`, {
            productId: Id
          });
          if (response.data.status == "added") {
            return setIsWished(true);
          } else {
            return setIsWished(false);
          }
        } catch (error) {
          toast.error(`${response.data.message}: ` + error);
          console.log(error);
        }
      };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div className="bg-[#003f62] text-white px-4 py-[20px] flex justify-between items-center">
        
        <div className=" flex gap-2 items-center">
        <h2 className="text-lg font-semibold">Items</h2>
        <div className="bg-white rounded-full p-1 flex">
        <svg
              className="w-6 h-6"
              fill="white"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
        </div>
      
        </div>
        
        <button className="text-[#003f62] bg-white rounded-full px-2 cursor-pointer font-bold" onClick={onClose}>X</button>
      </div>
      <div className="px-6 mt-4 space-y-4">
        {wishListData.map((item,index) => (
          <div className="flex items-start gap-4 border-b py-3" key={index._id}>
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-28 h-25 object-cover border-2 border-gray-300 rounded-md p-1"
            />
            <div className="flex-1">
              <h3 className="text-md text-[#003f62] font-bold mt-2">{item.title}</h3>
              <p className="text-gray-700 font-medium mt-1 text-sm">${item.variants[0].price}</p>
              <div className="flex gap-1 mt-1"></div>
            </div>
            <button className="text-white bg-[#003f62] rounded-full px-2 cursor-pointer font-medium items-center justify-center" onClick={() => removeWishList(item._id)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistDrawer;
