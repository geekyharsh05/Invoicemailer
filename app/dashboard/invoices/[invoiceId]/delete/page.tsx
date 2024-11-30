import prisma from "@/app/utils/db"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { requireUser } from "@/hooks/require-user"
import Image from "next/image"
import { redirect } from "next/navigation"
import WarningGIF from "@/public/warning-gif.gif"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import SubmitButton from "@/app/components/SubmitButtons"
import { deleteInvoice } from "@/lib/actions/actions"

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

export default async function DeleteInvoiceRoute({ params }: { params: InvoiceIdParams }) {
    const session = await requireUser()
    const { invoiceId } = await params
    await Authorize(invoiceId, session.user?.id as string)

    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Delete Invoice</CardTitle>
                    <CardDescription>Are you sure you want to delete this invoice?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={WarningGIF} alt="delete invoice" className="rounded-lg" />
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-4">
                    <Link href={`/dashboard/invoices`} className={buttonVariants({
                        variant: "outline",
                    })}>
                        Cancel
                    </Link>
                    <form action={async () => {
                        "use server"
                        await deleteInvoice(invoiceId)
                    }} >
                        <SubmitButton text="Delete Invoice" variant={"destructive"} />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
