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
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
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
                                <SubmitButton text="Login" />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
