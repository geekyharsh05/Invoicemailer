'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, IndianRupee, Users } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface DashboardData {
  totalRevenue: number
  totalInvoices: number
  paidInvoices: number
  openInvoices: number
}

const DashboardCard: React.FC<{
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  color: string
}> = ({ title, value, description, icon, color }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className={`h-1 ${color}`} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`rounded-full p-2 ${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {value}
          </motion.h2>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
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
