import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";

const Inventory = () => {

    return (
        <>
            <nav id='subNav' className="flex items-center w-full h-[8vh] bg-white rounded shadow mb-4">
                <Link to="add">
                    <Button>Add item</Button>
                </Link>
                <Link to="all">
                    <Button>All items</Button>
                </Link>
                <Link to="adjustments">
                    <Button>Adjustments</Button>
                </Link>
            </nav>
            <section id="content" className="w-full h-[86vh] overflow-auto mb-4 p-4 bg-white rounded shadow">
                {/* <h1>Inventory</h1> */}
                <Outlet />
            </section>
        </>
    );
};

export default Inventory;
