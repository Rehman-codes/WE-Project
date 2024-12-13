import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BarGraph = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        // Create chart instance
        chartInstanceRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Socks", "base balls"],
                datasets: [
                    {
                        label: "Quantities",
                        data: [1, 0],
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Items",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Quantities",
                        },
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            // Destroy chart instance to clean up
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="rounded shadow-md w-[30%] h-[50%] flex flex-col justify-center items-center p-4">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarGraph;
