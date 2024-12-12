import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from 'lucide-react';

const dummySuppliers = ["Supplier A", "Supplier B", "Supplier C"];
const orderItems = ["Widget A", "Gadget B", "Tool C", "Device D", "Product E"];
const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch orders from the API when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_URL}/order/all`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                    console.log(data);
                } else {
                    alert("Failed to load orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                alert("Error fetching orders.");
            }
        };

        fetchOrders();
    }, []);

    // Update handleChange to directly call handleUpdate with the updated order
    const handleChange = (id, field, value) => {
        setOrders((prevOrders) => {
            const updatedOrders = prevOrders.map((order) =>
                order._id === id
                    ? { ...order, [field]: value }
                    : order
            );
            const updatedOrder = updatedOrders.find((order) => order._id === id);
            handleUpdate(updatedOrder); // Pass the updated order directly
            return updatedOrders;
        });
    };

    // Modify handleUpdate to accept the updated order and update the DB
    const handleUpdate = async (updatedOrder) => {
        try {
            const response = await fetch(`${API_URL}/order/${updatedOrder._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedOrder),
            });

            if (response.ok) {
                console.log("Order updated successfully");
            } else {
                alert("Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Error updating order");
        }
    };


    // API call to delete order
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/order/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
                console.log("Order deleted successfully");
            } else {
                alert("Failed to delete order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Error deleting order");
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-[100%] h-[95%] m-1">
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Delivery Date</TableHead>
                            <TableHead>Order Item</TableHead>
                            <TableHead>Item Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment Date</TableHead>
                            <TableHead>Total Price</TableHead>
                            <TableHead className="text-right">Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={order._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Select
                                        value={order.supplier}
                                        onValueChange={(value) => handleChange(order._id, "supplier", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{order.supplier}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummySuppliers.map((supplier) => (
                                                <SelectItem key={supplier} value={supplier}>
                                                    {supplier}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={order.orderDate}
                                        onSelect={(date) => handleChange(order._id, "orderDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={order.deliveryDate}
                                        onSelect={(date) => handleChange(order._id, "deliveryDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.orderItem}
                                        onValueChange={(value) => handleChange(order._id, "orderItem", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{order.orderItem}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {orderItems.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={order.quantity || ""}
                                        onChange={(e) => handleChange(order._id, "quantity", parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.status}
                                        onValueChange={(value) => handleChange(order._id, "status", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{order.status}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={order.paymentDate}
                                        onSelect={(date) => handleChange(order._id, "paymentDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={order.totalPrice.toFixed(2)}
                                        readOnly
                                        className="w-full bg-gray-100"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(order._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

function DatePicker({ date, onSelect }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal text-sm truncate"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date || undefined} onSelect={onSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
}



export default AllOrders;
