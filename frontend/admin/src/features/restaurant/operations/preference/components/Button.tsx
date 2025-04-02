import React from "react";
import { useTranslation } from "react-i18next";

interface ButtonProps {
    text: string;
    onClick: () => void;
    additionClass?: string;
    icons?: any;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, additionClass, icons }) => {
    const { t } = useTranslation();
    return (
        <div
            onClick={onClick}
            className={`bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 flex flex-row justify-center items-center gap-2 ${additionClass}`}
        >
            {t(text)} {icons}
        </div>
    );
}

export default Button;