import React from 'react'
import prisma from '../utils/db'
import DashBoardBlock from '../components/DashBoardBlock'
import { requireUser } from '@/hooks/require-user'
import InvoiceGraph from '../components/InvoiceGraph'
import { RecentInvoices } from '../components/RecentInvoices'

async function getData(userId: string) {
    const [invoices, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId,
            },
            select: {
                total: true,
            },
        }),
        prisma.invoice.count({
            where: {
                userId: userId,
                status: "PENDING",
            },
        }),
        prisma.invoice.count({
            where: {
                userId: userId,
                status: "PAID",
            },
        }),
    ])

    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0)

    return {
        totalRevenue,
        totalInvoices: invoices.length,
        openInvoices,
        paidInvoices,
    }
}

async function DashboardPage() {
    const session = await requireUser()
    const data = await getData(session.user?.id as string)

    return (
        <>
            <DashBoardBlock data={data} />
            <div className='grid gap-4 lg:grid-cols-3 md:gap-8'>
                <InvoiceGraph />
                <RecentInvoices />
            </div>
        </>
    )
}

export default DashboardPage

