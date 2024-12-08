import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const Orders = () => {

    return (
        <>
            <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
                <Link to="create">
                    <Button>Create order</Button>
                </Link>
                <Link to="all">
                    <Button>All orders</Button>
                </Link>
            </nav>
            <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                <Outlet />
            </section>
        </>
    );
};

export default Orders;
