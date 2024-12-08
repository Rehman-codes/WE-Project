import { Button } from "@/components/ui/button";
import { Outlet, Link, Navigate, useLocation } from "react-router-dom";

const Suppliers = () => {
    const location = useLocation();

    if (location.pathname === "/supplier") {
      return <Navigate to="/supplier/add" />;
    }
  
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
                <Link to="add">
                    <Button variant={isActive("/supplier/add") ? "active" : "inactive"}>Add supplier</Button>
                </Link>
                <Link to="all">
                    <Button variant={isActive("/supplier/all") ? "active" : "inactive"}>All suppliers</Button>
                </Link>
                <Link to="create">
                    <Button variant={isActive("/supplier/create") ? "active" : "inactive"}>Create Contract</Button>
                </Link>
                <Link to="view">
                    <Button variant={isActive("/supplier/view") ? "active" : "inactive"}>All Contracts</Button>
                </Link>
            </nav>
            <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                <Outlet />
            </section>
        </>
    );
};

export default Suppliers;
