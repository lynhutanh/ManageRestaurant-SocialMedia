import React from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { FormatCurrency } from "@utils/common/formatCurrency";

interface BarChartProps {
    labels: string[];
    memberData: number[];
    nonMemberData: number[];
    title?: string;
    yAxisLabel?: string;
}

const BarChartComponentApex: React.FC<BarChartProps> = ({
    labels,
    memberData,
    nonMemberData,
    title,
    yAxisLabel,
}) => {
    const { t } = useTranslation();
    const series = [
        {
            name: t("Member Revenue"),
            data: memberData,
        },
        {
            name: t("Non-Member Revenue"),
            data: nonMemberData,
        },
    ];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
            fontFamily: "inherit",
        },
        dataLabels: {
            enabled: false, // Hides the numbers on the bars
        },
        colors: ["#FDCE1C", "#FF760E"],
        title: {
            text: title || "",
            align: "left",
            style: {
                color: "#FF760E",
                fontSize: "18px",
                fontWeight: "bold",
            },
            offsetY: 10,
        },
        xaxis: {
            categories: labels,
            labels: {
                style: {
                    colors: "#262632",
                },
            },
            axisBorder: {
                color: "#DBEAFE",
            },
            axisTicks: {
                color: "#DBEAFE",
            },
        },
        yaxis: {
            title: {
                text: yAxisLabel || "",
                style: {
                    color: "#262632",
                    fontWeight: 600,
                    fontSize: "14px",
                },
            },
            labels: {
                style: {
                    colors: "#262632",
                },
                formatter: (val) => FormatCurrency(val),
            },
        },
        legend: {
            labels: {
                colors: "#262632",
            },
        },
        tooltip: {
            y: {
                formatter: (val) => FormatCurrency(val),
            },
        },
        grid: {
            borderColor: "#BFDBFE",
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
                horizontal: false,
                columnWidth: "50%",
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    xaxis: {
                        labels: {
                            show: true,
                        },
                    },
                },
            },
        ],
    };

    return (
        <div className="relative w-full h-[460px] box-border text-primary">
            <Chart
                options={options}
                series={series}
                type="bar"
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default BarChartComponentApex;
