import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

interface LineChartProps {
    data: any;
}
const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const { t } = useTranslation();
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "line",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: "smooth",
        },
        colors: ["#FF760E", "#38BDF8"], // màu cho các đường line
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "horizontal",
                shadeIntensity: 0.1,
                gradientToColors: undefined,
                inverseColors: true,
            },
        },
        legend: {
            position: "top",
        },
    };

    const series = [
        // {
        //     name: "Total Revenue",
        //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 160, 170],
        // },
        {
            name: "Total Sales",
            data: [
                200,
                300,
                250,
                470,
                450,
                550,
                789,
                456,
                990,
                978,
                data?.last.total_profit,
                data?.current.total_profit,
            ],
        },
    ];

    return (
        <div className="bg-white p-6 rounded-md">
            <div className="flex justify-between">
                {/* <div>
                    <h3 className="text-blue-800 font-bold">Total Revenue</h3>
                    <p className="text-sm text-gray-500">
                        12.04.2022 - 12.05.2022
                    </p>
                </div> */}
                <div>
                    <h3 className="text-primary font-bold text-lg">
                        {t("Total Sales")}
                    </h3>
                </div>
            </div>
            <Chart options={options} series={series} type="line" height={320} />
        </div>
    );
};

export default LineChart;
