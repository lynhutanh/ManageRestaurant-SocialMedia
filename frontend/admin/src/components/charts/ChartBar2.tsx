import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

interface BarChartProps {
    data: any;
}
const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const { t } = useTranslation();
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
            },
        },
        colors: ["#FF760E", "#FDCE1C"], // màu cho các cột
        xaxis: {
            categories: ["Last month", "This month"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "top",
        },
    };

    const series = [
        {
            name: "Sales",
            data: [data?.last.total_profit, data?.current.total_profit],
        },
        {
            name: "Revenue",
            data: [data?.last.total_profit / 2, data?.current.total_profit / 2],
        },
    ];

    return (
        <div className="bg-white p-6  rounded-md">
            <div className="flex justify-between">
                <h3 className="text-primary font-bold text-lg">
                    {t("Profit")}
                </h3>
            </div>
            <Chart options={options} series={series} type="bar" height={320} />
        </div>
    );
};

export default BarChart;
