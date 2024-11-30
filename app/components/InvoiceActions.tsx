"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloud, Mail, MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { toast } from "sonner";

interface iAppProps {
    id: string;
    status: string;
}

export default function InvoiceActions({ id, status }: iAppProps) {
    const handleSendReminderEmail = useCallback(async () => {
        toast.promise(fetch(`/api/email/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }), {
            loading: "Sending Reminder Email...",
            success: "Reminder Email Sent Successfully!",
            error: "An error occurred while sending the reminder email.",
        });
    }, [id]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`}>
                        <PencilIcon className="mr-2 size-4" />
                        Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${id}`} target="_blank">
                        <DownloadCloud className="mr-2 size-4" />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSendReminderEmail}>
                    <Mail className="mr-2 size-4" />
                    Send Reminder Email
                </DropdownMenuItem>
                {status !== "PAID" && (
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/invoices/${id}/paid`}>
                            <CheckCircle className="mr-2 size-4" />
                            Mark as paid
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}/delete`}>
                        <Trash className="mr-2 size-4" />
                        Delete Invoice
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}