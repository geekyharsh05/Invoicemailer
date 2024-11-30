import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import PaidGIF from "@/public/paid-gif.gif"
import Link from "next/link";
import { markAsPaidAction } from "@/lib/actions/actions";
import SubmitButton from "@/app/components/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/hooks/require-user";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";

async function Authorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    })

    if (!data) {
        return redirect("/dashboard/invoices")
    }

    return data
}

type InvoiceIdParams = Promise<{ invoiceId: string }>

export default async function MarkAsPaid({ params }: { params: InvoiceIdParams }) {
    const { invoiceId } = await params
    const session = await requireUser()
    await Authorize(invoiceId, session.user?.id as string)

    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Mark As Paid</CardTitle>
                    <CardDescription>Are you sure you want to mark this invoice as paid?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={PaidGIF} alt="paid-gif" className="rounded-lg" />
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-4">
                    <Link href={`/dashboard/invoices`} className={buttonVariants({
                        variant: "outline",
                    })}>
                        Cancel
                    </Link>
                    <form action={async () => {
                        "use server"
                        await markAsPaidAction(invoiceId)
                    }} >
                        <SubmitButton text="Mark As Paid" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}