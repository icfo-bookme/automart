import Sidebar from "@/components/modules/shops/Sidebar";
import type { ReactNode } from "react";

export default function CatalogLayout({ children }: { children: ReactNode }) {
    return (
        <div className="container mx-auto min-h-[calc(100vh-100px)] px-2 lg:px-0">
            <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-4">
                <aside
                    aria-label="Product categories"
                    className="hidden lg:block lg:sticky lg:top-6 lg:my-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto lg:overscroll-contain"
                >
                    <Sidebar />
                </aside>
                <main className="min-w-0">{children}</main>
            </div>
        </div>
    );
}
