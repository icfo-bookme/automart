import AddressInformation from "@/components/modules/contact/AddressInformation";
import ContactForm from "@/components/modules/contact/ContactForm";
import { ContactTabs } from "@/components/modules/contact/Tab";

export const metadata = {
  title: "Contact Us | Automart Bangladesh",
  description: "Get in touch with Automart Bangladesh for any inquiries or support.",
    keywords: [
      "contact",
      "automart",
      "automart bangladesh",
      "customer service",
      "support"
    ],
    canonical: "https://automart.com.bd/contact",
};

export default function Page() {

    return (
        <div className="container mx-auto">
            <h1 className="text-center font-semibold text-blue-950 text-3xl py-10">Contact Us</h1>
            <div className="min-h-screen grid md:grid-cols-2  ">
                <div>
                    <AddressInformation />
                </div>
                <div className="  mx-auto w-full max-w-lg   ">
                    <ContactTabs />                   
                </div>
            </div>
        </div>
    );
}