"use client";
import InputFieldError from "@/components/common/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactUser from "@/services/contactUser";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ContactTabs } from "./Tab";

const ContactForm = ({ type }: { type: string }) => {
    const [state, formAction, isPending] = useActionState(contactUser, null);

    useEffect(() => {
        if (state?.success) {
            toast.success("Contact form submitted!", {
                description: state.message || "We'll get back to you soon.",
            });
        } else if (state?.success === false) {
            toast.error("Submission failed", {
                description: state.message || "Please check the form and try again.",
            });
        }
    }, [state]);
    return (
        <div>

            <form action={formAction}>
                <FieldGroup>
                    <div className="grid grid-cols-1  gap-4">
                        {/* Name */}
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input id="name" name="name" type="text" placeholder="John Doe" />
                            <InputFieldError field="name" state={state} />
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

                        <Field>
                            <FieldLabel htmlFor="number">Number</FieldLabel>
                            <Input
                                id="number"
                                name="number"
                                type="text"
                                placeholder="01772660503"
                            />
                            <InputFieldError field="number" state={state} />
                        </Field>
                        <Field>

                            <Input
                                id="type"
                                name="type"
                                type="text"
                                value={type}
                                hidden
                                readOnly

                            />
                            <InputFieldError field="type" state={state} />
                        </Field>
                        {/* Message */}
                        <div className="grid w-full gap-3">
                            <FieldLabel htmlFor="message">
                                {type === "Question"
                                    ? "Query Box"
                                    : type === "Complain"
                                        ? "Complaint"
                                        : type === "Suggestion"
                                            ? "Suggestion Box"
                                            : "Message"}
                            </FieldLabel>
                            <Textarea name="message" placeholder="Type your message here." id="message" />
                        </div>


                    </div>
                    <FieldGroup className="mt-4">
                        <Field>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Sending ..." : "Submit"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldGroup>
            </form>

        </div>
    )
}

export default ContactForm
