import { AiOutlineUserAdd } from "react-icons/ai";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import {
    FaUserTimes,
    FaUserCheck,
    FaMoneyCheckAlt,
    FaRedo,
} from "react-icons/fa";

import MemberCard from "./components/StatisticCard";
import MemberTable from "./components/ListMember/MemberTable";
import RevenuePieChart from "./components/Charts/PieChart";
import LineChartComponent from "./components/Charts/LineChartComponent";
import MemberItem from "./components/Charts/MemberItem";
import BarChartComponent from "./components/Charts/BarChart";
import { useTranslation } from "react-i18next";
import RatingItem from "./components/Rating/RatingItem";

const fakeUser1 = [
    {
        name: "Nguyen Thi Thanh Hang",
        id: "000004",
        avatar: "https://i.pinimg.com/564x/4a/55/74/4a5574dcfc96a6f92e7befa03c133f0e.jpg",
        amountSpent: 200,
        currency: "USD",
        createdAt: "Sept 28, 2024",
        due: "Due in 3 days",
        status: "Paid",
        region: "vi",
    },
    {
        name: "Tran Tien Duc",
        id: "000003",
        avatar: "https://static.tuoitrenews.vn/ttnew/r/2022/03/16/nguyen-duc-huy-a-vietnamese-has-been-living-in-the-city-of-lviv-ukraine-for-more-than-35-years-in-a--1647406420.jpg",
        amountSpent: 214,
        currency: "USD",
        createdAt: "Sept 25, 2024",
        due: "Due in 6 days",
        status: "Paid",
        region: "vi",
    },
    {
        name: "Nguyen Thuc Thuy Tram",
        id: "000002",
        avatar: "https://vir.com.vn/stores/news_dataimages/hung/042021/20/09/challenges-women-face-and-advantages-they-bring-to-the-vietnamese-workplace.jpg",
        amountSpent: 100,
        currency: "USD",
        createdAt: "Sept 14, 2024",
        due: "Due in 2 weeks",
        status: "Pending",
        region: "vi",
    },
    {
        name: "Tran Nhat Khang",
        id: "000001",
        avatar: "https://imgcdn.stablediffusionweb.com/2024/9/22/190b7aa2-d2f2-43a5-802a-33ac2aa87baa.jpg",
        amountSpent: 122,
        currency: "USD",
        createdAt: "Sept 6, 2024",
        due: "Due 3 weeks ago",
        status: "Overdue",
        region: "vi",
    },
    {
        name: "Emily Johnson",
        id: "000002",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 250,
        currency: "USD",
        createdAt: "March 12, 2024",
        due: "Due 2 weeks ago",
        status: "Overdue",
        region: "en",
    },
    {
        name: "Michael Smith",
        id: "000003",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqG3NQ-LkdPmK2FAOIlME8qFte3NtHlwNOQ&s",
        amountSpent: 180,
        currency: "USD",
        createdAt: "June 25, 2024",
        due: "Due yesterday",
        status: "Overdue",
        region: "en",
    },
    {
        name: "Sarah Williams",
        id: "000004",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 320,
        currency: "USD",
        createdAt: "November 5, 2024",
        due: "Due today",
        status: "Pending",
        region: "en",
    },
    {
        name: "Emily Brown",
        id: "000005",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 95,
        currency: "USD",
        createdAt: "August 19, 2024",
        due: "Due in 1 week",
        status: "Pending",
        region: "en",
    },
];
const fakeUser2 = [
    {
        name: "Tran Canh Huy",
        id: "000003",
        avatar: "https://ai.flux-image.com/flux/26309145-e946-43c8-96d2-86e9777a2466.jpg",
        amountSpent: 2140,
        currency: "USD",
        createdAt: "Sept 25, 2024",
        due: "Due in 6 days",
        status: "Paid",
        region: "vi",
    },
    {
        name: "Benjamin Smith",
        id: "000004",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
        amountSpent: 2000,
        currency: "USD",
        createdAt: "Sept 28, 2024",
        due: "Due in 3 days",
        status: "Paid",
        region: "en",
    },

    {
        name: "Bich Tram",
        id: "000002",
        avatar: "https://media.istockphoto.com/id/1388517977/photo/portrait-of-young-asian-girl-posing-on-background.jpg?s=612x612&w=0&k=20&c=vsLLWN1UP1aqlzSwkR5U1LSaMaFrwG4txsfMSZeMRkQ=",
        amountSpent: 500,
        currency: "USD",
        createdAt: "Sept 14, 2024",
        due: "Due in 2 weeks",
        status: "Pending",
        region: "vi",
    },
    {
        name: "Tran Van Son",
        id: "000001",
        avatar: "https://images.unsplash.com/photo-1522609925277-66fea332c575?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 300,
        currency: "USD",
        createdAt: "Sept 6, 2024",
        due: "Due 3 weeks ago",
        status: "Overdue",
        region: "vi",
    },
    {
        name: "Emily Johnson",
        id: "000002",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 250,
        currency: "USD",
        createdAt: "March 12, 2024",
        due: "Due 2 weeks ago",
        status: "Overdue",
        region: "en",
    },
    {
        name: "Michael Smith",
        id: "000003",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqG3NQ-LkdPmK2FAOIlME8qFte3NtHlwNOQ&s",
        amountSpent: 180,
        currency: "USD",
        createdAt: "June 25, 2024",
        due: "Due yesterday",
        status: "Overdue",
        region: "en",
    },
    {
        name: "Sarah Williams",
        id: "000004",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 320,
        currency: "USD",
        createdAt: "November 5, 2024",
        due: "Due today",
        status: "Pending",
        region: "en",
    },
    {
        name: "Dang Ngoc Khang",
        id: "000011",
        avatar: "https://images.unsplash.com/photo-1522609925277-66fea332c575?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        amountSpent: 200,
        currency: "USD",
        createdAt: "Sept 2, 2024",
        due: "Due 3 weeks ago",
        status: "Overdue",
        region: "vi",
    },
];
const fakeData = [
    {
        title: "Total members",
        value: 512,
        type: "number",
        icon: <FaUsers size={30} />,
        className: "bg-dashboard-green/30 text-dashboard-green",
    },
    {
        title: "Total new members this week",
        value: 123,
        type: "number",
        icon: <AiOutlineUserAdd size={30} />,
        className: "bg-dashboard-violet/30 text-dashboard-violet",
    },
    {
        title: "Revenue from members",
        value: 6552,
        type: "currency",
        icon: <FaMoneyCheckAlt size={30} />,
        className: "bg-dashboard-blue/30 text-dashboard-blue",
    },
];
const RatingItemsList = [
    {
        title: "CR",
        altTitle: "Churn Rate",
        content:
            "The percentage of customers who leave. It's crucial for assessing customer satisfaction and retention, reducing revenue loss",
        icon: <FaUserTimes size={20} className="text-dashboard-green" />,
        value: 100,
    },
    {
        title: "RR",
        altTitle: "Retention Rate",
        content:
            "The percentage of customers retained. Measures the ability to keep customers, improving loyalty and lifetime value",
        icon: <FaUserCheck size={20} className="text-dashboard-violet" />,
        value: 1990,
    },
    {
        title: "RPR",
        altTitle: "Repeat Purchase Rate",
        content:
            "The rate of repeat purchases. Indicates customer loyalty and optimizes the cost of acquiring new customers",
        icon: <FaRedo size={20} className="text-dashboard-blue" />,
        value: 1200,
    },
    {
        title: "AOV",
        altTitle: "Average Order Value",
        content:
            "The average revenue per order. Helps increase overall revenue per transaction",
        icon: <FaDollarSign size={20} className="text-primary" />,
        value: 12,
    },
];

const Member = () => {
    const { t } = useTranslation();
    //data for line chart
    const labels = [
        t("January"),
        t("February"),
        t("March"),
        t("April"),
        t("May"),
        t("June"),
        t("July"),
        t("August"),
        t("September"),
        t("October"),
        t("November"),
        t("December"),
    ];
    const data = [100, 400, 123, 200, 123, 122, 223, 431, 213, 123, 234, 412];

    //data for pie chart
    const memberRevenue = 1000;
    const nonMemberRevenue = 2000;

    //data for bar chart
    const memberData = [
        5000, 7000, 6500, 8000, 422, 9000, 11000, 1233, 421, 2131, 1232, 654,
    ];
    const nonMemberData = [
        3000, 4000, 5500, 6000, 1244, 4500, 5000, 1231, 213, 222, 5567, 8767,
    ];

    return (
        <div className="w-full h-auto col-span-5 row-span-12 pb-4">
            <div className="w-full flex flex-col gap-3">
                <div className="h-[300px] w-full flex justify-start items-start gap-3">
                    <div className="w-2/3 h-full flex gap-3">
                        {fakeData.map((item, index) => (
                            <MemberCard
                                key={index}
                                title={t(item.title)}
                                total={item.value}
                                icon={item.icon}
                                type={item.type}
                                className={item.className}
                            />
                        ))}
                    </div>
                    <div className="w-1/3 h-full flex justify-center items-center">
                        <RevenuePieChart
                            memberRevenue={memberRevenue}
                            nonMemberRevenue={nonMemberRevenue}
                        />
                    </div>
                </div>
                <div className="h-auto w-full flex flex-col justify-start items-start gap-3">
                    <div className="w-full flex justify-start items-start gap-3">
                        <div className="h-[500px] w-2/3 flex flex-col gap-3">
                            <div className="h-[20%] w-full  grid grid-cols-4 gap-3 flex-col">
                                {RatingItemsList.map((item, index) => (
                                    <RatingItem
                                        key={index}
                                        title={t(item.title)}
                                        altTitle={t(item.altTitle)}
                                        content={t(item.content)}
                                        icon={item.icon}
                                        value={item.value}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col w-full h-[80%] bg-white rounded-md shadow-md px-4">
                                <div className="w-full h-[20%] flex items-center justify-between px-4">
                                    <MemberItem
                                        title={t("Weekly New Members")}
                                        value={25}
                                    />
                                    <MemberItem
                                        title={t("Monthly New Members")}
                                        value={345}
                                    />
                                </div>
                                <div className="w-full h-[75%] flex justify-center items-center pb-6">
                                    <LineChartComponent
                                        labels={labels}
                                        data={data}
                                    />
                                </div>
                            </div>
                        </div>
                        <MemberTable
                            data={fakeUser1}
                            title="Loyal Members"
                            content="These are customers who shop or interact with your business frequently. They earn exclusive rewards, discounts, and special benefits for their loyalty. Staying active ensures they continue to enjoy these perks"
                        />
                    </div>
                    <div className="w-full flex justify-start items-start gap-3">
                        <div className="w-2/3 h-auto flex justify-center items-center p-5 bg-white rounded-md ">
                            <BarChartComponent
                                labels={labels}
                                memberData={memberData}
                                nonMemberData={nonMemberData}
                                title={t("Total Revenue by Month")}
                                yAxisLabel={t("Revenue")}
                            />
                        </div>
                        <MemberTable
                            data={fakeUser2}
                            title="Unactive Members"
                            content="Customers who have not made a purchase or interacted with your business in over a month. They risk losing their loyalty rewards and benefits. Encourage them to re-engage to maintain their status"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Member;
