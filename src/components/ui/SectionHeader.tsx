export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="mb-6">
            <h3 className="text-base font-bold text-gray-800">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
            <div className="mt-2 h-px bg-gradient-to-r from-blue-200 via-indigo-100 to-transparent" />
        </div>
    );
}