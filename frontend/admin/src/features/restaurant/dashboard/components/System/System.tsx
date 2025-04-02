//components
import {
    AiOutlineEye,
    AiOutlineShopping,
    AiOutlineUser,
} from "react-icons/ai";
import { CiMoneyCheck1 } from "react-icons/ci";

import CardNumber from "@components/charts/Chart1";
import LineChart from "@components/charts/ChartBar1";
import BarChart from "@components/charts/ChartBar2";
import { useTranslation } from "react-i18next";

export default function System() {

    const tempData = {
        current: {
            total_view: 678,
            total_profit: 1503,
            total_order: 588,
            total_user: 159,
        },
        last: {
            total_view: 394,
            total_profit: 876,
            total_order: 345,
            total_user: 58,
        },
    };
    const { t } = useTranslation();
    return (
        <>
            <div className="grid grid-cols-4 grid-rows-1 gap-3 w-full h-[30%]">
                <CardNumber
                    title={t("Total Views")}
                    content="Tracks overall visibility of your platform. High views indicate strong engagement and brand awareness, critical for attracting potential customers"
                    number={tempData.current.total_view}
                    change={
                        tempData.last.total_view
                            ? (tempData.current.total_view /
                                  tempData.last.total_view -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        tempData.current.total_view > tempData.last.total_view
                            ? "up"
                            : "down"
                    }
                    icon={<AiOutlineEye size={30} />}
                    className="text-dashboard-blue bg-dashboard-blue/30 "
                />
                <CardNumber
                    title={t("Total Sales")}
                    content="Measures revenue generated. It is the cornerstone of business success, reflecting profitability and customer satisfaction"
                    number={tempData.current.total_profit}
                    change={
                        tempData.last.total_profit
                            ? (tempData.current.total_profit /
                                  tempData.last.total_profit -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        tempData.current.total_profit >
                        tempData.last.total_profit
                            ? "up"
                            : "down"
                    }
                    icon={<CiMoneyCheck1 size={30} />}
                    className="text-dashboard-violet bg-dashboard-violet/30"
                />
                <CardNumber
                    title={t("Total Orders")}
                    content="Represents total transactions. It highlights customer activity and helps assess product demand and operational efficiency"
                    number={tempData.current.total_order}
                    change={
                        tempData.last.total_order
                            ? (tempData.current.total_order /
                                  tempData.last.total_order -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        tempData.current.total_order > tempData.last.total_order
                            ? "up"
                            : "down"
                    }
                    icon={<AiOutlineShopping size={30} />}
                    className="text-dashboard-green bg-dashboard-green/30"
                />
                <CardNumber
                    title={t("Total Users")}
                    content="Indicates the size of your customer base. Growth in users shows market reach and potential for future sales"
                    number={tempData.current.total_user}
                    change={
                        tempData.last.total_user
                            ? (tempData.current.total_user /
                                  tempData.last.total_user -
                                  1) *
                              100
                            : 0
                    }
                    changeType={
                        tempData.current.total_user > tempData.last.total_user
                            ? "up"
                            : "down"
                    }
                    icon={<AiOutlineUser size={30} />}
                    className="text-dashboard-yellow bg-dashboard-yellow/30"
                />
            </div>
            {tempData && (
                <div className="grid grid-cols-1 lg:grid-cols-2  grid-rows-1 gap-3  w-full h-[70%]">
                    <LineChart data={tempData} />
                    <BarChart data={tempData} />
                </div>
            )}
        </>
    );
}
