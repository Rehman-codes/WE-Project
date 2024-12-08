import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const AddSupplier = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
        // Handle form submission logic here
        console.log('Form submitted')
    }

    return (
        <div className="flex items-center justify-center">
            <Card className="w-[97%] h-[90%] bg-white rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Add New Supplier</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="supplierName">Supplier Name</Label>
                            <Input id="supplierName" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Add</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
};

export default AddSupplier;