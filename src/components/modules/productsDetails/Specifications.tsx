// Specifications.tsx
import { Specification } from "@/types/specifications";

interface SpecificationsProps {
  specifications: Specification[];
}

export const Specifications = ({ specifications }: SpecificationsProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Name</th>
            <th className="px-4 py-2 text-left text-gray-700 font-medium">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {specifications.map((spec) => (
            <tr key={spec.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-600">{spec.name}</td>
              <td className="px-4 py-2 text-gray-600">{spec.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
