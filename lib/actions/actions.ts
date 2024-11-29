"use server";

import { requireUser } from "@/hooks/require-user";
import prisma from "@/app/utils/db";
import { onboardingSchema } from "@/app/utils/zod-schemas";
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation";

export async function onBoardUser(prevState: any, formData: FormData) {
    const session = await requireUser()

    if (!session?.user) {
        throw new Error("Not authenticated")
    }

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        },
    })

    return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser()
    

}