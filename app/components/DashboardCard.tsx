import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from 'react-intersection-observer'

export const DashboardCard: React.FC<{
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