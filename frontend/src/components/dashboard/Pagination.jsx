import React from 'react'

const Pagination = () => {
  return (
    <div>
                <div className="flex justify-between items-center p-4">
          <span className="text-gray-600 px-1">10 of 456 items</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded-full">1</button>
            <button className="px-3 py-1 text-gray-600">2</button>
            <button className="px-3 py-1 text-gray-600">3</button>
            <button className="px-3 py-1 text-gray-600">4</button>
            <button className="px-3 py-1 text-gray-600">5</button>
            <span className="text-gray-600">...10</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Show</span>
            <select className="border-0 text-yellow-400 rounded ">
              <option>10 rows</option>
              <option>20 rows</option>
              <option>50 rows</option>
            </select>
          </div>
        </div>
    </div>
  )
}

export default Pagination