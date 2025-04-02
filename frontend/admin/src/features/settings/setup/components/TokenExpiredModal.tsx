import React from "react";

interface TokenExpiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const TokenExpiredModal: React.FC<TokenExpiredModalProps> = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold text-red-600">Phiên đăng nhập đã hết hạn</h2>
                <p className="text-gray-600 mt-2">Vui lòng đăng nhập lại để tiếp tục sử dụng.</p>
                <button
                    onClick={() => {
                        onSubmit(); // Thực hiện hành động khi nhấn nút "Đăng nhập lại"
                        onClose(); // Đóng modal sau khi thực hiện hành động
                    }}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-md transition hover:brightness-90"
                >
                    Đăng nhập lại
                </button>
            </div>
        </div>
    );
};

export default TokenExpiredModal;