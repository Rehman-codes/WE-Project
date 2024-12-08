import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PieChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        // Create chart instance
        chartInstanceRef.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Category A", "Category B", "Category C"],
                datasets: [
                    {
                        data: [30, 45, 25], // Dummy data
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                        hoverOffset: 4,
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

export default PieChart;
