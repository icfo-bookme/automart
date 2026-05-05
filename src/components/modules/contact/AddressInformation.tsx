import { MapPin, Phone, Mail } from "lucide-react";

const AddressInformation = () => {
  return (
    <div className="container mx-auto w-full max-w-xl bg-white p-3  rounded-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Address Information
      </h2>

      <div className="border-t border-gray-200 pt-4 space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4">
          <MapPin className="w-5 h-5 text-gray-700 mt-1" />
          <p className="text-gray-800 leading-relaxed">
            <span className="font-medium">Address:</span> 315, Dewan Chamber, <br />
            Sheikh Mujib Rd, Dewanhut, Chattogram
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Phone */}
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-gray-700" />
          <a
            href="tel:01888022244"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            01888022244
          </a>
        </div>

        <hr className="border-gray-200" />

        {/* Email */}
        <div className="flex items-center gap-4">
          <Mail className="w-5 h-5 text-gray-700" />
          <a
            href="mailto:info@automart.com.bd"
            className="text-gray-800 hover:text-blue-600 transition"
          >
            info@automart.com.bd
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;
