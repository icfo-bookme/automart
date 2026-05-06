"use client";

import InputFieldError from "@/components/common/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import submitOrder from "@/services/submitOrder";
import { RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const BillingForm = () => {
const dispatch = useDispatch(); 
const cartItems = useSelector((state: RootState) => state.cart.items);
const router = useRouter();
  const action = async (prevState: any, formData: FormData) => {
    return submitOrder(prevState, formData, cartItems);
  };

  const [state, formAction, isPending] = useActionState(action, null);
    useEffect(() => {
        if (state?.success) {
            toast.success("Thank you for your order.", {
                description: state.message || "Order submitted successfully!",
            });
            dispatch(clearCart());
            router.push("/order/success");

        } else if (state?.success === false) {
            toast.error("Order submission failed", {
                description: state.message || "Please check the form and try again.",
            });
        }
    }, [state]);

    return (
        <div>
            <form action={formAction}>
                <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <Field>
                            <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
                            <Input 
                                id="firstName" 
                                name="firstName" 
                                type="text" 
                                required 
                                placeholder="John" 
                            />
                            <InputFieldError field="firstName" state={state} />
                        </Field>

                        {/* Last Name */}
                        <Field>
                            <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
                            <Input 
                                id="lastName" 
                                name="lastName" 
                                type="text" 
                                required 
                                placeholder="Doe" 
                            />
                            <InputFieldError field="lastName" state={state} />
                        </Field>

                        {/* Phone Number */}
                        <Field>
                            <FieldLabel htmlFor="phoneNumber">Phone Number *</FieldLabel>
                            <Input 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                type="number" 
                                required 
                                placeholder="01772660503" 
                            />
                            <InputFieldError field="phoneNumber" state={state} />
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="m@example.com" 
                            />
                            <InputFieldError field="email" state={state} />
                        </Field>

                        {/* Country */}
                        <Field>
                            <FieldLabel htmlFor="country">Country</FieldLabel>
                            <Input 
                                id="country" 
                                name="country" 
                                type="text" 
                                placeholder="Bangladesh" 
                            />
                            <InputFieldError field="country" state={state} />
                        </Field>

                        {/* District */}
                        <Field>
                            <FieldLabel htmlFor="district">District</FieldLabel>
                            <Input 
                                id="district" 
                                name="district" 
                                type="text" 
                                placeholder="Dhaka" 
                            />
                            <InputFieldError field="district" state={state} />
                        </Field>

                        {/* City */}
                        <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <Input 
                                id="city" 
                                name="city" 
                                type="text" 
                                placeholder="Dhaka" 
                            />
                            <InputFieldError field="city" state={state} />
                        </Field>

                        {/* Thana */}
                        <Field>
                            <FieldLabel htmlFor="thana">Thana</FieldLabel>
                            <Input 
                                id="thana" 
                                name="thana" 
                                type="text" 
                                placeholder="Mohammadpur" 
                            />
                            <InputFieldError field="thana" state={state} />
                        </Field>

                        {/* Area */}
                        <Field>
                            <FieldLabel htmlFor="area">Area</FieldLabel>
                            <Input 
                                id="area" 
                                name="area" 
                                type="text" 
                                placeholder="Dhanmondi" 
                            />
                            <InputFieldError field="area" state={state} />
                        </Field>

                        {/* Road no. */}
                        <Field>
                            <FieldLabel htmlFor="roadNo">Road no.</FieldLabel>
                            <Input 
                                id="roadNo" 
                                name="roadNo" 
                                type="text" 
                                placeholder="Road 8" 
                            />
                            <InputFieldError field="roadNo" state={state} />
                        </Field>

                        {/* House no. */}
                        <Field>
                            <FieldLabel htmlFor="houseNo">House no.</FieldLabel>
                            <Input 
                                id="houseNo" 
                                name="houseNo" 
                                type="text" 
                                placeholder="123" 
                            />
                            <InputFieldError field="houseNo" state={state} />
                        </Field>

                        {/* Flat no. */}
                        <Field>
                            <FieldLabel htmlFor="flatNo">Flat no.</FieldLabel>
                            <Input 
                                id="flatNo" 
                                name="flatNo" 
                                type="text" 
                                placeholder="A-5" 
                            />
                            <InputFieldError field="flatNo" state={state} />
                        </Field>
                    </div>

                    {/* Order Notes - Full width */}
                    <div className="mt-4">
                        <Field>
                            <FieldLabel htmlFor="orderNotes">Order Notes</FieldLabel>
                            <Textarea 
                                id="orderNotes" 
                                name="orderNotes" 
                                placeholder="Any special instructions or notes for your order..."
                                className="min-h-[100px]"
                            />
                            <InputFieldError field="orderNotes" state={state} />
                        </Field>
                    </div>

                    {/* Submit Button */}
                    <FieldGroup className="mt-6">
                        <Field>
                            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                                {isPending ? "Submitting Order..." : "Place Order"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldGroup>
            </form>
        </div>
    );
};

export default BillingForm;