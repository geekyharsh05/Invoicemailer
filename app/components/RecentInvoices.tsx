/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "../utils/db";
import { requireUser } from "@/hooks/require-user";
import { formatCurrency } from "@/hooks/format-currency";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            clientName: true,
            clientEmail: true,
            total: true,
            currency: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 7,
    });

    return data;
}

export async function RecentInvoices() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    return (
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4 px-6">
                <CardTitle className="text-2xl font-bold text-gray-800 tracking-tight">
                    Recent Invoices
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                        <Avatar className="hidden sm:flex size-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                                {item.clientName.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-800 leading-tight">
                                {item.clientName}
                            </p>
                            <p className="text-xs text-gray-500">
                                {item.clientEmail}
                            </p>
                        </div>
                        <div className="font-semibold text-green-600">
                            +{formatCurrency({
                                amount: item.total,
                                currency: item.currency as any,
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}