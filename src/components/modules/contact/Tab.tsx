import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import ContactForm from "./ContactForm"

export function ContactTabs() {
    return (
        <div className="flex w-full  flex-col gap-6">
            <Tabs defaultValue="question">
                <TabsList>
                    <TabsTrigger className="text-base font-semibold p-4" value="question">Have a question?</TabsTrigger>
                    <TabsTrigger className="text-base font-semibold p-4" value="complaint">Make a complaint?</TabsTrigger>
                    <TabsTrigger className="text-base font-semibold p-4" value="suggestion">Any suggestion?</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
                    <Card>
                        <CardHeader>
                            <CardTitle>Have a question?</CardTitle>
                            <CardDescription>
                                Fill out the form below to get in touch with us.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <ContactForm type="Question" />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="complaint">
                    <Card>
                        <CardHeader>
                            <CardTitle>Make a complaint?</CardTitle>
                            <CardDescription>
                                Fill out the form below to make a complaint.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <ContactForm type="Complain" />
                        </CardContent>

                    </Card>
                </TabsContent>
                <TabsContent value="suggestion">
                    <Card>
                        <CardHeader>
                            <CardTitle>Any suggestion?</CardTitle>
                            <CardDescription>
                                Fill out the form below to share your suggestion.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <ContactForm type="Suggestion" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
