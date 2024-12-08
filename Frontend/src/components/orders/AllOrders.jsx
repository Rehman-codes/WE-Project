import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

const orderItems = ["Widget A", "Gadget B", "Tool C", "Device D", "Product E"]
const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

const AllOrders = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            supplierName: "Acme Corp",
            orderDate: new Date(),
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            orderItem: "Widget A",
            itemQuantity: 100,
            status: "Pending",
            paymentDate: null,
            totalPrice: 999.99,
        },
    ])

    const handleChange = (id, field, value) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id
                    ? {
                        ...order,
                        [field]: value,
                    }
                    : order
            )
        )
    }

    const handleDelete = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id))
    }

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
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    <Input
                                        value={order.supplierName}
                                        onChange={(e) => handleChange(order.id, "supplierName", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={order.orderDate}
                                        onSelect={(date) => handleChange(order.id, "orderDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={order.deliveryDate}
                                        onSelect={(date) => handleChange(order.id, "deliveryDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.orderItem}
                                        onValueChange={(value) => handleChange(order.id, "orderItem", value)}
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
                                        value={order.itemQuantity}
                                        onChange={(e) => handleChange(order.id, "itemQuantity", parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.status}
                                        onValueChange={(value) => handleChange(order.id, "status", value)}
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
                                        onSelect={(date) => handleChange(order.id, "paymentDate", date)}
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
                                    <Button variant="destructive" onClick={() => handleDelete(order.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function DatePicker({ date, onSelect }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date || undefined} onSelect={onSelect} initialFocus />
            </PopoverContent>
        </Popover>
    )
};

export default AllOrders;
