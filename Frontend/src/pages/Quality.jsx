import { Button } from "@/components/ui/button";
import { Outlet, Link, Navigate, useLocation } from "react-router-dom";

const Quality = () => {
    const location = useLocation();

    if (location.pathname === "/quality") {
      return <Navigate to="/quality/create" />;
    }
  
    const isActive = (path) => location.pathname === path;
  
    return (
        <>
            <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
                <Link to="create">
                    <Button variant={isActive("/quality/create") ? "active" : "inactive"}>Create report</Button>
                </Link>
                <Link to="all">
                    <Button variant={isActive("/quality/all") ? "active" : "inactive"}>All reports</Button>
                </Link>
            </nav>
            <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                <Outlet />
            </section>
        </>
    );
};

export default Quality;
