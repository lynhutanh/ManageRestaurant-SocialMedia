import React from "react";
import Tooltip from "../tooltip/ToolTip";

interface CardNumberProps {
    title: string;
    number: number;
    change: number;
    changeType: "up" | "down";
    icon: React.ReactNode;
    content?: string;
    className?: string;
}
const CardNumber: React.FC<CardNumberProps> = ({
    title,
    number,
    change,
    changeType,
    icon,
    content,
    className,
}) => {
    return (
        <div className="flex flex-col bg-white  rounded-md p-6 w-full h-full justify-between">
            <div className="h-full flex flex-col justify-between items-start gap-5">
                <div className="flex items-start w-full justify-start">
                    <div
                        className={`p-2 rounded-lg flex items-center justify-start ${className}`}
                    >
                        {icon}
                    </div>
                    <Tooltip
                        title={""}
                        altTitle={title}
                        content={content as string}
                    />
                </div>

                <div className="flex flex-row items-end justify-between w-full ">
                    <div className="flex items-center space-x-2">
                        <div>
                            <h3 className="text-2xl font-semibold">
                                {number?.toFixed()}{" "}
                                {title === "Total Sales" ? "$" : ""}
                            </h3>
                            <p className="font-medium">{title}</p>
                        </div>
                    </div>
                    <div
                        className={`text-lg font-semibold ${
                            changeType === "up"
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {change.toFixed(2)}% {changeType === "up" ? "↑" : "↓"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNumber;
