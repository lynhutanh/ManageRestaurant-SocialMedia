import React from "react";

interface ButtonProps {
    text: string;
    onclick: () => void;
}

const LoginButton: React.FC<ButtonProps> = ({ text, onclick }) => {
    return (
        <div
            onClick={onclick}
            className="relative flex justify-center items-center py-3 px-8 text-black text-base font-bold w-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-primary before:to-primary/50 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
            {text}
        </div>
    );
};

export default LoginButton;
