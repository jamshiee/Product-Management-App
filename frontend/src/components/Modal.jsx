import React from 'react'

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 px-11 w-full max-w-[45%] max-h-[95vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>

            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
}

export default Modal