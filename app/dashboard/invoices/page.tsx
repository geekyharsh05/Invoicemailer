import InvoiceList from "@/app/components/InvoiceList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoicesRoute() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                        <CardDescription>View all your invoices.</CardDescription>
                    </div>

                    <div>
                        <Link href="/dashboard/invoices/create" className={buttonVariants({
                            className: "w-full",
                            variant: "outline",
                        })}> 
                            <PlusIcon /> Create Invoice
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <InvoiceList />
            </CardContent>
        </Card>
    )
}