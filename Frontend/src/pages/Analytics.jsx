import PieChart from "@/components/analytics/PieChart";
import BarGraph from "@/components/analytics/BarGraph";

const Analytics = () => {

    return (
        <>
            <section id="content" className="flex justify-evenly items-center w-full h-[95vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                <PieChart />
                <BarGraph />
            </section>
        </>
    );
};

export default Analytics;
