const contactUser = async (_currentState: any, formData: any): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  
  try {
    const payload = {
      name: formData.get("name") as string,
      number: formData.get("number") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      type: formData.get("type") as string,
    };
    
    const res = await fetch(`${baseUrl}/contact/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // Laravel validation error response
      return {
        success: false,
        message: data.message || "Validation failed",
        errors: data.errors || {}, // Keep Laravel's format
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

export default contactUser;