import { IMessage } from "../types/data";
import React from "react";

interface TextMessageProps {
    message: IMessage;
}

const TextMessage: React.FC<TextMessageProps> = ({ message }) => {
    return (
        <div
            className={`h-max max-w-md rounded-md py-3 px-4 break-words  ${message.isUser ? "bg-blue-300 self-end" : " bg-gray-100"
                }`}
        >
            {message.text}
        </div>
    );
};

export default TextMessage;
