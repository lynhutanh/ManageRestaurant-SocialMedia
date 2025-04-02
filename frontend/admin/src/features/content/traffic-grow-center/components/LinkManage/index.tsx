import { useTranslation } from "react-i18next";
import { FaDollarSign, FaLink, FaChartLine } from "react-icons/fa6";
import { RiShoppingCart2Line } from "react-icons/ri";
import ItemTable from "./components/LinkTable";
import StatisticCard from "@components/cards/StatisticCard";

const dashboardData = [
    {
        title: "Total Clicks",
        number: 1610,
        change: 10.5,
        changeType: "up",
        icon: <FaLink size={30} />,
        content:
            "This represents the total number of times visitors clicked on affiliate links to reach your website or products",
        className: "bg-blue-100 text-blue-500",
    },
    {
        title: "Total Successful Orders",
        number: 241,
        change: 15.3,
        changeType: "up",
        icon: <RiShoppingCart2Line size={30} />,
        content:
            "This indicates the number of completed purchases that originated from affiliate links",
        className: "bg-green-100 text-green-500",
    },

    {
        title: "Total Revenue",
        number: 156,
        change: 20.2,
        changeType: "up",
        icon: <FaChartLine size={25} />,
        content:
            "This reflects the total revenue earned from sales driven by affiliates",
        className: "bg-purple-100 text-purple-500",
    },
    {
        title: "Total Commission",
        number: 156 * 0.08,
        change: 7.8,
        changeType: "up",
        icon: <FaDollarSign size={30} />,
        content:
            "This shows the total earnings shared with affiliates based on their performance",
        className: "bg-yellow-100 text-yellow-500",
    },
];

const LinkManage = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full h-auto flex flex-col gap-3">
            <div className="h-auto w-full flex flex-col justify-start items-start gap-3 bg-primary-gray-th1 pt-3 rounded-md">
                <div className="grid grid-cols-4 grid-rows-1 gap-3 w-full h-[30%]">
                    {dashboardData.map((item, index) => (
                        <StatisticCard
                            key={index}
                            title={t(item.title)}
                            number={item.number}
                            icon={item.icon}
                            content={t(item.content)}
                            className={item.className}
                        />
                    ))}
                </div>
            </div>
            <ItemTable />
        </div>
    );
};

export default LinkManage;
