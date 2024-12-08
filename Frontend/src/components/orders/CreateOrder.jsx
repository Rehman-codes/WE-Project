import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const CreateOrder = () => {
    const [quantity, setQuantity] = useState(1)
    const [deliveryDate, setDeliveryDate] = useState(null)
    const [orderDate, setOrderDate] = useState(null)
    const [paymentDate, setPaymentDate] = useState(null)
  
    const handleSubmit = (event) => {
      event.preventDefault()
      // Handle form submission here
      console.log('Form submitted')
    }
  
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
                <Select required>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">Supplier 1</SelectItem>
                    <SelectItem value="supplier2">Supplier 2</SelectItem>
                    <SelectItem value="supplier3">Supplier 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!deliveryDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
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
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!orderDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {orderDate ? format(orderDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={orderDate}
                      onSelect={setOrderDate}
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
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!paymentDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {paymentDate ? format(paymentDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={paymentDate}
                      onSelect={setPaymentDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="orderItem">Order item</Label>
                <Select required>
                  <SelectTrigger id="orderItem">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="item1">Item 1</SelectItem>
                    <SelectItem value="item2">Item 2</SelectItem>
                    <SelectItem value="item3">Item 3</SelectItem>
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
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    className="mx-2 text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="totalPrice">Total price</Label>
                <Input id="totalPrice" type="text" value="$0.00" disabled />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create</Button>
          </CardFooter>
        </Card>
      </div>
    )
};

export default CreateOrder;