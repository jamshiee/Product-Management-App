


const WishlistDrawer = ({ isOpen, onClose }) => {
    const dummyItems = [
        {
          id: 1,
          title: "HP AMD Ryzen 3",
          price: "$529.99",
          image: "https://via.placeholder.com/100x80", // replace with real URL
        },
        {
          id: 2,
          title: "HP AMD Ryzen 3",
          price: "$529.99",
          image: "https://via.placeholder.com/100x80",
        },
      ];
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Items</h2>
        <button onClick={onClose}>&larr;</button>
      </div>
      <div className="p-4 space-y-4">
        {dummyItems.map((item) => (
          <div className="flex items-start gap-4 border-b pb-3">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-16 object-cover"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.price}</p>
              <div className="flex gap-1 mt-1"></div>
            </div>
            <button className="text-gray-500 hover:text-red-500">x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistDrawer;
