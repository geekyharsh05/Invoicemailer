import EditInvoice from "@/app/components/EditInvoice";
import prisma from "@/app/utils/db";
import { requireUser } from "@/hooks/require-user";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

type InvoiceIdParams = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: InvoiceIdParams }) {
    const { invoiceId } = await params;
    const session = await requireUser();

    const data = await getData(invoiceId, session.user?.id as string);

    return (
        <EditInvoice data={data}/>
    )
}
