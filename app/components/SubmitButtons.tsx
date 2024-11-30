"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react";

interface iAppProps {
    text: string;
    variant?: "secondary" | "outline" | "ghost" | "link" | "default" | "destructive" | null | undefined,
}

function SubmitButton({ text, variant }: iAppProps) {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending} className="w-full" variant={variant}>
                    <Loader2 className="size-4 mr-2 animate-spin" />Please Wait
                </Button>
            ) : (
                <Button type="submit" className="w-full" variant={variant}>
                    {text}
                </Button>
            )
            }
        </>
    )
}

export default SubmitButton