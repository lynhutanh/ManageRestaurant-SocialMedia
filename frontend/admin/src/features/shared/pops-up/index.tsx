import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    className = "",
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            onClick={(event) => {
                onClose();
                event.stopPropagation();
            }}
        >
            <div
                className={`relative max-md:w-[85vw] w-[75vw] h-max max-h-[95dvh] overflow-hidden p-2 bg-white rounded-lg shadow border border-primary-gray-300 ${className}`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                    aria-label="Close"
                >
                    <IoCloseOutline className="h-10 w-auto text-gray-600" />
                    <span className="sr-only">Close</span>
                </button>
                <div
                    className="p-0 md:p-5"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
