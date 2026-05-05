import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Description } from "./Description";
import { Specifications } from "./Specifications";
import { Item } from "@/types/Item";
import { Review } from "./Riview";

interface TabProps {
    item: Item;
}

export function Tab({ item }: TabProps) {
    return (
        <div className="flex w-full  flex-col gap-4 bg-white shadow-md rounded-lg p-4">
            <Tabs defaultValue="descriptions">
                {/* Tabs Header */}
                <TabsList className="flex w-full max-w-md border-b border-gray-200 gap-5">
                    <TabsTrigger
                        value="descriptions"
                        className="text-xl  flex-1 text-center py-5 font-bold text-gray-700 hover:bg-gray-100 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-t-lg transition"
                    >
                        Descriptions
                    </TabsTrigger>
                    <TabsTrigger
                        value="specifications"
                        className="text-xl flex-1 text-center py-5 font-bold text-gray-700 hover:bg-gray-100 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-t-lg transition"
                    >
                        Specifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="review"
                        className="text-xl flex-1 text-center py-5 font-bold text-gray-700 hover:bg-gray-100 data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-t-lg transition"
                    >
                        Review
                    </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <div className="mt-4 mb-8 min-h-64">
                    <TabsContent value="descriptions" className="p-2 text-gray-700">
                        <Description description={item.details} />
                    </TabsContent>
                    <TabsContent value="specifications" className="p-2 text-gray-700">
                        <Specifications specifications={item.specifications} />
                    </TabsContent>
                    <TabsContent value="review" className="p-2 text-gray-700">
                        {/* You can replace this with a Review component */}
                        <Review itemId={item.id} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
