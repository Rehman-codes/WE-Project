import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const Suppliers = () => {

    return (
        <>
            <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
                <Link to="add">
                    <Button>Add supplier</Button>
                </Link>
                <Link to="all">
                    <Button>All suppliers</Button>
                </Link>
                <Link to="contracts">
                    <Button>Contracts</Button>
                </Link>
            </nav>
            <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                <Outlet />
            </section>
        </>
    );
};

export default Suppliers;
