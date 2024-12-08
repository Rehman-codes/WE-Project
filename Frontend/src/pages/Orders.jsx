import { Button } from "@/components/ui/button";
import { Outlet, Link, Navigate, useLocation } from "react-router-dom";

const Orders = () => {
    const location = useLocation();

    if (location.pathname === "/order") {
      return <Navigate to="/order/create" />;
    }
  
    const isActive = (path) => location.pathname === path;
    return (
        <>
            <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
                <Link to="create">
                    <Button variant={isActive("/order/create") ? "active" : "inactive"}>Create order</Button>
                </Link>
                <Link to="all">
                    <Button variant={isActive("/order/all") ? "active" : "inactive"}>All orders</Button>
                </Link>
            </nav>
            <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                <Outlet />
            </section>
        </>
    );
};

export default Orders;
