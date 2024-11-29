"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled={pending} className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin" />Submitting
                </Button>
            ) : (
                <Button type="submit" className="w-full">
                    Submit
                </Button>
                )
            }
        </>
    )
}

export default SubmitButton