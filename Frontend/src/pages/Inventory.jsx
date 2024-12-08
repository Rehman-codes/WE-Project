import { Button } from "@/components/ui/button";
import { Outlet, Link, Navigate, useLocation } from "react-router-dom";

const Inventory = () => {
  const location = useLocation();

  if (location.pathname === "/inventory") {
    return <Navigate to="/inventory/add" />;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
        <Link to="add">
          <Button variant={isActive("/inventory/add") ? "active" : "inactive"}>Add item</Button>
        </Link>
        <Link to="all">
          <Button variant={isActive("/inventory/all") ? "active" : "inactive"}>All items</Button>
        </Link>
        <Link to="adjustments">
          <Button variant={isActive("/inventory/adjustments") ? "active" : "inactive"}>Adjustments</Button>
        </Link>
      </nav>
      <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
        <Outlet />
      </section>
    </>
  );
};

export default Inventory;
