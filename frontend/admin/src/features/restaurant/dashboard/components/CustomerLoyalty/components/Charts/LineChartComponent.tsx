import React from "react";
import Chart from "react-apexcharts";

interface LineChartProps {
    labels: string[];
    data: number[];
    title?: string;
    yAxisLabel?: string;
}

const LineChartComponentApex: React.FC<LineChartProps> = ({
    labels,
    data,
    title,
    yAxisLabel,
}) => {
    const series = [
        {
            name: title || "Total Members",
            data: data,
        },
    ];

    const options: ApexCharts.ApexOptions = {
        chart: {
            height: 350,
            type: "line",
            toolbar: { show: false },
            fontFamily: "inherit",
        },

        xaxis: {
            categories: labels,
            labels: {
                style: {
                    colors: "#3D3D3D",
                },
            },
            axisBorder: {
                color: "#BFDBFE",
            },
            axisTicks: {
                color: "#BFDBFE",
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#3D3D3D",
                },
            },
            title: {
                text: yAxisLabel || "",
                style: {
                    color: "#1E3A8A",
                    fontWeight: 600,
                    fontSize: "14px",
                },
            },
            axisBorder: {
                color: "#BFDBFE",
            },
            axisTicks: {
                color: "#BFDBFE",
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
            colors: ["#FDCE1C"], // Đường màu xanh
        },
        markers: {
            size: 4,
            colors: ["#FE881C"],
            strokeColors: "#FE881C",
            hover: {
                size: 6,
            },
        },
        fill: {
            type: "solid",
            opacity: 1, // Giả lập nền mờ xanh nhạt
            colors: ["#FDCE1C"],
        },
        colors: ["#FE881C"],
        grid: {
            borderColor: "#BFDBFE",
        },
        legend: {
            labels: {
                colors: "#1E3A8A",
            },
        },
        // tooltip: {
        //     y: {
        //         formatter: (val) =>
        //             `${title || "Total Members"}: ${val}`,
        //     },
        // },
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
        <div className="h-fit w-full">
            <Chart
                options={options}
                series={series}
                type="line"
                width={"100%"}
                height={"200%"}
            />
        </div>
    );
};

export default LineChartComponentApex;
