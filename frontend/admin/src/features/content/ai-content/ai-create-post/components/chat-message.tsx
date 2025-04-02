import { IMessage, MESSAGE_TYPE } from "../types/data";
import { ICourseSetup, INITIAL_COURSE_SETUP } from "../types/data";
import React from "react";
import TextMessage from "./text-message";

interface ChatMessageProps {
    message: IMessage;
    courseSetupInfo?: ICourseSetup;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
    courseSetupInfo = INITIAL_COURSE_SETUP,
}) => {
    const renderMessage = () => {
        switch (message.messageType) {


            default:
                return <TextMessage message={message} />;
        }
    };
    return <>{renderMessage()}</>;
};

export default ChatMessage;
