import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle, DownloadCloud, Mail, MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";

export default async function InvoiceActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="">
                        <PencilIcon className="mr-2 size-4" />
                        Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <DownloadCloud className="mr-2 size-4" />
                        Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Mail className="mr-2 size-4" />
                        Send Reminder Email
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <CheckCircle className="mr-2 size-4" />
                        Mark as paid
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="">
                        <Trash className="mr-2 size-4" />
                        Delete Invoice
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}