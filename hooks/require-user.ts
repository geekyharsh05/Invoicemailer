import { redirect } from "next/navigation"
import { auth } from "@/app/utils/auth"

export async function requireUser() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return session
}