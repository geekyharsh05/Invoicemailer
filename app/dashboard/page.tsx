import { Button } from "@/components/ui/button"
import { signOut } from "../utils/auth"
import { requireUser } from "../utils/hooks"

export default async function DashboardRoute() {
    const session = await requireUser()

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <h1 className="text-3xl">Dashboard</h1>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <Button type="submit" className="mt-4">Sign Out</Button>
            </form>
        </div>
    )
}