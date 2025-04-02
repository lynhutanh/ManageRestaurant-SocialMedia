import { useTranslation } from "react-i18next";
import ItemTable from "./components/ItemTable";
//icons
import { MdOutlinePeopleAlt } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { IAffiliateUser } from "@/types/affiliate";
import StatisticCard from "@components/cards/StatisticCard";

interface AffiliateManageProps {}

const affiliateCards = [
    {
        title: "Total Affiliates",
        number: 123,
        icon: <MdOutlinePeopleAlt size={30} />,
        type: "number",
        content:
            "This represents the total number of people who have joined as affiliates and are promoting your products or services",
        className: "bg-blue-100 text-blue-500",
    },
    {
        title: "Total Orders via Affiliates",
        number: 564,
        icon: <PiPackageFill size={30} />,
        type: "number",
        content:
            "This shows the total number of successful orders placed through affiliate links",
        className: "bg-green-100 text-green-500",
    },
    {
        title: "Conversion Rate",
        number: 5.5,
        icon: <FaChartLine size={25} />,
        type: "percent",
        content:
            "This indicates the percentage of visits to affiliate links that resulted in successful purchases or desired actions",
        className: "bg-yellow-100 text-yellow-500",
    },
    {
        title: "Affiliate Link Visits",
        number: 1224,
        icon: <FaLink size={30} />,
        type: "number",
        content:
            "This reflects the total number of visits to your website or product pages through affiliate links",
        className: "bg-purple-100 text-purple-500",
    },
];

const affiliateTableData: IAffiliateUser[] = [
    {
        id: 1,
        name: "John Doe",
        links: 5,
        clicks: 22,
        conversionRate: 5,
        revenue: 433,
        commission: 433 * 0.05,
        region: "en",
    },
    {
        id: 2,
        name: "Jane Smith",
        links: 3,
        clicks: 33,
        conversionRate: 3.75,
        revenue: 447,
        commission: 447 * 0.05,
        region: "en",
    },
    {
        id: 3,
        name: "Sam Wilson",
        links: 8,
        clicks: 200,
        conversionRate: 4,
        revenue: 125,
        commission: 125 * 0.05,
        region: "en",
    },
    {
        id: 4,
        name: "Emily Johnson",
        links: 2,
        clicks: 50,
        conversionRate: 2,
        revenue: 122,
        commission: 122 * 0.05,
        region: "en",
    },
    {
        id: 5,
        name: "David Doe",
        links: 5,
        clicks: 22,
        conversionRate: 5,
        revenue: 433,
        commission: 433 * 0.05,
        region: "en",
    },
    {
        id: 6,
        name: "Nguyen Van An",
        links: 4,
        clicks: 45,
        conversionRate: 4.5,
        revenue: 300,
        commission: 300 * 0.05,
        region: "vi",
    },
    {
        id: 7,
        name: "Tran Thi Bich",
        links: 6,
        clicks: 80,
        conversionRate: 5,
        revenue: 500,
        commission: 500 * 0.05,
        region: "vi",
    },
    {
        id: 8,
        name: "Pham Minh Hoa",
        links: 3,
        clicks: 25,
        conversionRate: 3.2,
        revenue: 220,
        commission: 220 * 0.05,
        region: "vi",
    },
    {
        id: 9,
        name: "Le Duc Thinh",
        links: 7,
        clicks: 70,
        conversionRate: 6,
        revenue: 420,
        commission: 420 * 0.05,
        region: "vi",
    },
    {
        id: 10,
        name: "Vo Thi Lan",
        links: 2,
        clicks: 40,
        conversionRate: 2.5,
        revenue: 150,
        commission: 150 * 0.05,
        region: "vi",
    },
];

const AffiliateManage = (props: AffiliateManageProps) => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-auto flex flex-col gap-3">
            <div className="h-auto w-full mt-3 flex flex-col justify-start items-start gap-3 bg-primary-gray-th1 rounded-md">
                <div className="grid grid-cols-4 grid-rows-1 gap-3 w-full h-[30%]">
                    {affiliateCards.map((item, index) => (
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
            <ItemTable data={affiliateTableData} />
        </div>
    );
};

export default AffiliateManage;
