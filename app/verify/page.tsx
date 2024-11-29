import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function Verify() {
    return (
        <div className="min-h-screen flex w-full items-center justify-center">
            <Card className="w-[380px] p-4">
                <CardHeader className="text-center">
                    <div className="mb-4 flex mx-auto size-20 items-center justify-center rounded-full bg-blue-100">
                        <Mail className="size-12 text-blue-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                    <CardDescription className="font-normal text-md">We have sent you a verification email.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-300 p-4">
                        <div className="flex items-center space-x-4">
                            <AlertCircle className="size-5 text-yellow-500" />
                            <p className="text-sm font-medium text-yellow-700">Be sure to check your spam folder!</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href="/" className={buttonVariants({
                        className: "w-full",
                        variant: "outline",
                    })}>
                        <ArrowLeft className="size-5" /> Back to Homepage
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}