import Tooltip from "@components/tooltip/ToolTip";
import React from "react";

interface StatisticCardProps {
    title: string;
    number: number;
    icon: React.ReactNode;
    content?: string;
    className?: string;
}
const StatisticCard: React.FC<StatisticCardProps> = ({
    title,
    number,
    icon,
    content,
    className,
}) => {
    return (
        <div className="flex flex-col bg-white  rounded-md p-4 w-full h-full justify-between relative">
            <div className="h-full flex flex-col justify-between items-start gap-5">
                <div className="flex flex-row items-end justify-between w-full gap-1">
                    <div className="flex items-center space-x-2 w-full max-w-[80%]">
                        <div className="w-full ">
                            <p className="flex items-center text-sm w-max max-w-full truncate text-primary font-semibold">
                                {title}{" "}
                            </p>
                            <h3 className="text-2xl font-semibold">
                                {number?.toFixed()}{" "}
                                {title === "Total Sales" ? "$" : ""}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center h-full w-fit justify-end ">
                        <div
                            className={`p-2 rounded-full flex items-center justify-center ${className}   `}
                        >
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-2 right-2">
                <Tooltip
                    title={""}
                    altTitle={title}
                    content={content as string}
                />
            </div>
        </div>
    );
};

export default StatisticCard;
