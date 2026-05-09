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
import { useActionState, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const bdPhoneRegex = /^(01[3-9]\d{8})$/;

const BillingForm = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const action = async (prevState: any, formData: FormData) => {
    return submitOrder(prevState, formData, cartItems);
  };

  const [state, formAction, isPending] = useActionState(action, null);

  const validate = (formData: FormData) => {
    const errors: Record<string, string> = {};

    const first_name = formData.get("first_name")?.toString() || "";
    const last_name = formData.get("last_name")?.toString() || "";
    const phone_number = formData.get("phone_number")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    if (!first_name.trim()) {
      errors.first_name = "First name is required";
    } else if (first_name.length < 2) {
      errors.first_name = "Minimum 2 characters required";
    }

    if (last_name && last_name.length < 2) {
      errors.last_name = "Minimum 2 characters required";
    }

    if (!phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!bdPhoneRegex.test(phone_number)) {
      errors.phone_number = "Enter valid BD number (01XXXXXXXXX)";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const errors = validate(formData);

    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setClientErrors(errors);
      return;
    }

    setClientErrors({});
  };

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      router.push("/order/success");
    } else if (state.success === false) {
      toast.error("Order failed", {
        description: state.message || "Fix errors and try again",
      });
    }
  }, [state]);

  useEffect(() => {
    const allErrors = {
      ...state?.errors,
      ...clientErrors,
    };

    const firstError = Object.keys(allErrors || {})[0];

    if (firstError && formRef.current) {
      const el = formRef.current.querySelector(
        `[name="${firstError}"]`
      ) as HTMLElement;

      el?.focus();
    }
  }, [clientErrors, state]);

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Field>
            <FieldLabel>First Name *</FieldLabel>
            <Input name="first_name" />
            <InputFieldError field="first_name" state={state} />
          </Field>

          <Field>
            <FieldLabel>Last Name</FieldLabel>
            <Input name="last_name" />
            <InputFieldError field="last_name" state={state} />
          </Field>

          <Field>
            <FieldLabel>Phone *</FieldLabel>
            <Input name="phone_number" />
            <InputFieldError field="phone_number" state={state} />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input name="email" />
            <InputFieldError field="email" state={state} />
          </Field>

          <Field>
            <FieldLabel>Country</FieldLabel>
            <Input name="country" />
          </Field>

          <Field>
            <FieldLabel>District</FieldLabel>
            <Input name="district" />
          </Field>

          <Field>
            <FieldLabel>City</FieldLabel>
            <Input name="city" />
          </Field>

          <Field>
            <FieldLabel>Thana</FieldLabel>
            <Input name="thana" />
          </Field>

          <Field>
            <FieldLabel>Area</FieldLabel>
            <Input name="area" />
          </Field>

          <Field>
            <FieldLabel>Road No</FieldLabel>
            <Input name="road_no" />
          </Field>

          <Field>
            <FieldLabel>Flat No</FieldLabel>
            <Input name="flat_no" />
          </Field>

          <Field>
            <FieldLabel>Car No</FieldLabel>
            <Input name="car_no" />
          </Field>
        </div>

        <div className="mt-4">
          <Field>
            <FieldLabel>Order Notes</FieldLabel>
            <Textarea name="order_notes" />
          </Field>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            disabled={isPending || cartItems.length === 0}
            className="w-full"
          >
            {isPending ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default BillingForm;