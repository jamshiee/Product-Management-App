import React from 'react'

const SideBar = () => {
  return (
    <div>
                <aside className="w-64 mt-5 p-4">
          <nav className="mb-5">
            <a href="#" className="text-gray-800 font-semibold">Home &gt;</a>
          </nav>
          <h2 className="font-bold text-[#003f62] mb-3">Categories</h2>
          <ul className="space-y-2 ps-2">
            <li><a href="#" className="text-gray-600">All categories</a></li>
            <li>
              <details className="group">
                <summary className="flex items-center cursor-pointer">
                  <span>Laptop</span>
                  <svg className="w-4 h-4 ml-2 group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </summary>
                <div className="ml-4 mt-2 space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span>HP</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Dell</span>
                  </label>
                </div>
              </details>
            </li>
            <li><a href="#" className="text-gray-600">Tablet</a></li>
            <li><a href="#" className="text-gray-600">Headphones</a></li>
          </ul>
        </aside>
    </div>
  )
}

export default SideBar