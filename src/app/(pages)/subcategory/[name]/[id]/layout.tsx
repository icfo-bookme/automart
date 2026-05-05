import Sidebar from "@/components/modules/shops/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
        <div className="min-h-screen container mx-auto">
            <div className="md:grid grid-cols-12">
                <div className="hidden lg:block col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-9">
                  <main>{children}</main>
                </div>
            </div>
        </div> 
        
    
  )
}