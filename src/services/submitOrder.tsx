import { RootState } from "@/store";
import { useSelector } from "react-redux";

const submitOrder = async (prevState: any,
    formData: FormData,
    cartItems: any[]): Promise<any> => {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    try {
        const payload = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            phoneNumber: formData.get("phoneNumber") as string,
            email: formData.get("email") as string || null,
            country: formData.get("country") as string || null,
            district: formData.get("district") as string || null,
            city: formData.get("city") as string || null,
            thana: formData.get("thana") as string || null,
            area: formData.get("area") as string || null,
            roadNo: formData.get("roadNo") as string || null,
            houseNo: formData.get("houseNo") as string || null,
            flatNo: formData.get("flatNo") as string || null,
            orderNotes: formData.get("orderNotes") as string || null,
            items: cartItems.map(item => ({
                product_id: item.id,
                barcode_id: Number(item.barcode) || null,
                quantity: item.quantity,
                product_name: item.title,
                unit_price: item.price,
                regular_price: item.regular_price,
                cost_price: item.cost_price,
            })),
        };
 
        const res = await fetch(`${baseUrl}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        

        if (!res.ok) {
            return {
                success: false,
                message: data.message || "Validation failed",
                errors: data.errors || {},
            };
        }

        return {
            success: true,
            message: data.message || "Contact form submitted successfully!",

        };

    } catch (error) {
        console.error("Contact form error:", error);
        return {
            success: false,
            message: "Network error. Please try again.",
        };
    }
};

export default submitOrder;