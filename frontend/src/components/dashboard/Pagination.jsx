import React from 'react';
import useProductStore from '../../store/useProductStore';

const Pagination = () => {
  const { 
    currentPage, 
    itemsPerPage, 
    totalItems, 
    setCurrentPage, 
    setItemsPerPage 
  } = useProductStore();

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        {/* Items count */}
        <span className="text-gray-600 px-1">
          {`${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`}
        </span>

        {/* Page buttons */}
        <div className="flex items-center space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-3 py-1 ${
                currentPage === number 
                  ? 'bg-yellow-500 text-white' 
                  : 'text-gray-600'
              } rounded-full`}
            >
              {number}
            </button>
          ))}
          {totalPages > 5 && <span className="text-gray-600">...{totalPages}</span>}
        </div>

        {/* Rows per page selector */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Show</span>
          <select
            className="border-0 text-yellow-400 rounded"
            value={itemsPerPage}
            onChange={handleRowsChange}
          >
            <option value={3}>3 rows</option>
            <option value={6}>6 rows</option>
            <option value={10}>10 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;