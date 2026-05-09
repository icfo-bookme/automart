const submitOrder = async (
  prevState: any,
  formData: FormData,
  cartItems: any[]
): Promise<any> => {

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  try {
    const payload = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone_number: formData.get("phone_number") as string,
      email: formData.get("email") as string || null,

      country: formData.get("country") as string || null,
      district: formData.get("district") as string || null,
      city: formData.get("city") as string || null,
      thana: formData.get("thana") as string || null,
      area: formData.get("area") as string || null,
      road_no: formData.get("road_no") as string || null,
      flat_no: formData.get("flat_no") as string || null,
      car_no: formData.get("car_no") as string || null,

      order_notes: formData.get("order_notes") as string || null,

      advance_payment: 0,
      discount_amount: 0,

      items: cartItems.map((item) => ({
        product_id: Number(item.id),
        barcode: item.barcode ? Number(item.barcode) : null,
        product_name: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        cost_price: item.cost_price ? Number(item.cost_price) : 0,
      })),
    };

    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
      message: data.message || "Order placed successfully!",
      data: data.data || null,
    };

  } catch (error) {
    console.error("Order error:", error);

    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export default submitOrder;