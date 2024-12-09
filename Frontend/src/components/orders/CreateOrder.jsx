import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const orderItems = ["Widget A", "Gadget B", "Tool C", "Device D", "Product E"];

const itemUnitPrices = {
  "Widget A": 10.0,
  "Gadget B": 20.0,
  "Tool C": 15.0,
  "Device D": 30.0,
  "Product E": 25.0,
};

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    status: "",
    deliveryDate: null,
    orderDate: null,
    paymentDate: null,
    orderItem: "",
    quantity: 1,
    totalPrice: 0,
  });

  useEffect(() => {
    if (formData.orderItem && formData.quantity) {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: itemUnitPrices[formData.orderItem] * formData.quantity,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        totalPrice: 0,
      }));
    }
  }, [formData.orderItem, formData.quantity]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
      ...formData,
      deliveryDate: formData.deliveryDate ? formData.deliveryDate.toISOString() : null,
      orderDate: formData.orderDate ? formData.orderDate.toISOString() : null,
      paymentDate: formData.paymentDate ? formData.paymentDate.toISOString() : null,
    };

    try {
      const response = await fetch("http://localhost:3000/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const savedOrder = await response.json();
        console.log("Order created:", savedOrder);
        // Reset form or redirect as needed
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <Card className="w-[95%] h-[90%] m-4 bg-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create New Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier name</Label>
              <Select
                value={formData.supplier}
                onValueChange={(value) => handleChange("supplier", value)}
                required
              >
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Supplier A">Supplier A</SelectItem>
                  <SelectItem value="Supplier B">Supplier B</SelectItem>
                  <SelectItem value="Supplier C">Supplier C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
                required
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((statusOption) => (
                    <SelectItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Delivery date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!formData.deliveryDate && "text-muted-foreground"
                      }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? (
                      format(formData.deliveryDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.deliveryDate}
                    onSelect={(date) => handleChange("deliveryDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderDate">Order date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!formData.orderDate && "text-muted-foreground"
                      }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.orderDate ? (
                      format(formData.orderDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.orderDate}
                    onSelect={(date) => handleChange("orderDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!formData.paymentDate && "text-muted-foreground"
                      }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.paymentDate ? (
                      format(formData.paymentDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.paymentDate}
                    onSelect={(date) => handleChange("paymentDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderItem">Order item</Label>
              <Select
                value={formData.orderItem}
                onValueChange={(value) => handleChange("orderItem", value)}
                required
              >
                <SelectTrigger id="orderItem">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {orderItems.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Item quantity</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handleChange("quantity", Math.max(1, formData.quantity - 1))
                  }
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  className="mx-2 text-center"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleChange("quantity", parseInt(e.target.value) || 1)
                  }
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleChange("quantity", formData.quantity + 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalPrice">Total price</Label>
              <Input
                id="totalPrice"
                type="text"
                value={`$${formData.totalPrice.toFixed(2)}`}
                disabled
              />
            </div>

            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateOrder;