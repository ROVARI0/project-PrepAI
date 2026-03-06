import React from 'react'

const Modal = ({ children, isOpen, onClose, title, hiedHeader }) => {
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40'>
            <div
                className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}
            >
                {!hiedHeader && (
                    <div className='flex items-center justify-between p-4  '>
                        <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
                    </div>
                )}
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer"
                    onClick={onClose}
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l12 12M13 1l-12 12"
                        />
                    </svg>
                </button>

                <div className='flex-1 overflow-y-auto custom-scrollbar '>
                    {children}
                </div>
            </div>
        </div>

    )
}

export default Modal