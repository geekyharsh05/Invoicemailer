import React from 'react'
import prisma from '../utils/db'
import DashBoardBlock from '../components/DashBoardBlock'
import { requireUser } from '@/hooks/require-user'

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
        <div className="container mx-auto px-4 py-2">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <DashBoardBlock data={data} />
        </div>
    )
}

export default DashboardPage

