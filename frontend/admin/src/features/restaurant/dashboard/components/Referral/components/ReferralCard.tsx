import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Tooltip from "@components/tooltip/ToolTip";

interface ReferralCardProps {
    title: string;
    total: number;
    icon: JSX.Element;
    type?: string;
    content: string;
    className?: string;
}
const ReferralCard = (props: ReferralCardProps) => {
    const { title, total, icon, type, content, className } = props;
    const { t } = useTranslation();
    const [percent1, setPercent1] = useState(0);
    const [percent2, setPercent2] = useState(0);

    useEffect(() => {
        setPercent1(((total - 20) * 10) / 100);
        setPercent2(((total - 50) * 10) / 100);
    }, [total]);
    return (
        <div className="h-[200px] flex flex-col justify-start items-start bg-white rounded-lg w-full text-black border border-gray-200">
            <div className="w-full h-1/2 flex justify-start items-center gap-5 bg-gray-50 px-6 rounded-lg">
                <div className={`p-2 rounded-lg ${className}`}>{icon}</div>
                <div className="flex flex-col justify-start items-start">
                    {/* <div className=" text-sm font-medium text-gray-900 ">
                        {title}
                    </div> */}
                    <Tooltip
                        title={t(title)}
                        altTitle={t(title)}
                        content={content}
                    />
                    <div className=" text-2xl font-semibold text-primary-black">
                        {total.toFixed(0)}
                        {type === "percent" ? "%" : ""}
                    </div>
                </div>
            </div>

            <div className="w-full h-1/2 flex flex-col justify-between items-center font-semibold text-black">
                <div className="w-full h-1/2 flex justify-between items-center px-6">
                    <span className="font-normal">
                        {t("Last weeks")}:
                    </span>
                    <span
                        className={`p-2  rounded-lg flex gap-2 items-center ${
                            percent1 >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {percent1 >= 0 ? (
                            <FaArrowTrendUp />
                        ) : (
                            <FaArrowTrendDown />
                        )}
                        {percent1.toFixed(2)}%
                    </span>
                </div>
                <div className="w-[90%] h-[1px] border"></div>
                <div className="w-full h-1/2  border-b-black flex justify-between items-center px-6">
                    <span className="font-normal">
                        {t("Last months")}:
                    </span>{" "}
                    <span
                        className={`p-2  rounded-lg flex gap-2 items-center ${
                            percent2 >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {percent2 >= 0 ? (
                            <FaArrowTrendUp />
                        ) : (
                            <FaArrowTrendDown />
                        )}
                        {percent2.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ReferralCard;
