'use client'

import { Activity, CreditCard, IndianRupee, Users } from 'lucide-react'
import React from 'react'
import { DashboardCard } from './DashboardCard'

interface DashboardData {
  totalRevenue: number
  totalInvoices: number
  paidInvoices: number
  openInvoices: number
}

function DashBoardBlock({ data }: { data: DashboardData }) {
  const { totalRevenue, totalInvoices, paidInvoices, openInvoices } = data

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <DashboardCard
        title="Total Revenue"
        value={`₹${totalRevenue.toLocaleString()}`}
        description="Based on the last 30 days"
        icon={<IndianRupee className="size-4 text-white" />}
        color="bg-gradient-to-r from-blue-500 to-blue-600"
      />
      <DashboardCard
        title="Total Invoices Issued"
        value={totalInvoices}
        description="Total Invoices Issued"
        icon={<Users className="size-4 text-white" />}
        color="bg-gradient-to-r from-green-500 to-green-600"
      />
      <DashboardCard
        title="Paid Invoices"
        value={paidInvoices}
        description="Total Invoices which have been Paid"
        icon={<CreditCard className="size-4 text-white" />}
        color="bg-gradient-to-r from-purple-500 to-purple-600"
      />
      <DashboardCard
        title="Open Invoices"
        value={openInvoices}
        description="Total Invoices which are still open"
        icon={<Activity className="size-4 text-white" />}
        color="bg-gradient-to-r from-red-500 to-red-600"
      />
    </div>
  )
}

export default DashBoardBlock
