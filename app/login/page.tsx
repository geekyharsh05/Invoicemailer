import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { auth, signIn } from "../utils/auth";
import SubmitButton from "../components/SubmitButtons";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth()

    if (session?.user) {
        return redirect("/dashboard")
    }
    
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>Enter your email to access your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            "use server";
                            await signIn("nodemailer", formData)
                        }}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="harsh@example.com" />
                                </div>
                                <SubmitButton />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
