import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InvoiceActions from "./InvoiceActions";
import prisma from "../utils/db";
import { requireUser } from "@/hooks/require-user";
import { formatCurrency } from "@/hooks/format-currency";
import { Badge } from "@/components/ui/badge";
import EmptyState from "./EmptyState";

async function fetchInvoices(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            clientName: true,
            invoiceNumber: true,
            status: true,
            total: true,
            currency: true,
            date: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return data;
}

async function InvoiceList() {
    const session = await requireUser()
    const data = await fetchInvoices(session.user?.id as string);

    return (
        <>
            {data.length === 0 ? (
                <EmptyState
                    title="No invoices found"
                    description="Create an invoice to get started."
                    buttontext="Create Invoice"
                    href="/dashboard/invoices/create"
                />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                <TableCell>{invoice.clientName}</TableCell>
                                <TableCell>{formatCurrency({
                                    amount: invoice.total,
                                    currency: invoice.currency as any,
                                })}</TableCell>
                                <TableCell>
                                    <Badge>{invoice.status}</Badge>
                                </TableCell>
                                <TableCell>{new Intl.DateTimeFormat("en-US", {
                                    dateStyle: "medium",
                                }).format(invoice.date)}
                                </TableCell>
                                <TableCell className="text-right"><InvoiceActions id={invoice.id} status={invoice.status} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}

export default InvoiceList