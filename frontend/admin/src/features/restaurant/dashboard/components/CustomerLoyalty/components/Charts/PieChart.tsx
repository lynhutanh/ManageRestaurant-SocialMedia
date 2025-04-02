import React, { useState, useRef, useEffect } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import { useTranslation } from "react-i18next";
import { FormatCurrency } from "@utils/common/formatCurrency";

Chart.register(PieController, ArcElement, Tooltip, Legend);

interface PieChartProps {
    memberRevenue: number;
    nonMemberRevenue: number;
}

const RevenuePieChart: React.FC<PieChartProps> = ({
    memberRevenue,
    nonMemberRevenue,
}) => {
    const { t } = useTranslation();
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const [chartInstance, setChartInstance] = useState<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance) {
                // If chart instance already exists, update it
                chartInstance.data.datasets![0].data = [
                    memberRevenue,
                    nonMemberRevenue,
                ];
                chartInstance.update();
            } else {
                // Create new chart instance
                const newChart = new Chart(chartRef.current, {
                    type: "pie",
                    data: {
                        labels: [t("Member Revenue"), t("Non-Member Revenue")],
                        datasets: [
                            {
                                data: [memberRevenue, nonMemberRevenue],
                                backgroundColor: ["#FDCE1C", "#FE881C"],
                                borderColor: "white",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        return `${
                                            context.label
                                        }: ${FormatCurrency(context.parsed)}`;
                                    },
                                },
                            },
                            legend: {
                                position: "bottom",
                                labels: {
                                    color: "#1E3A8A", // A deeper blue to complement text
                                },
                            },
                        },
                    },
                });
                setChartInstance(newChart);
            }
        }
    }, [chartRef, memberRevenue, nonMemberRevenue, chartInstance]);

    return <canvas ref={chartRef} className="w-full h-auto" />;
};

export default RevenuePieChart;
