/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { requireUser } from "@/hooks/require-user";
import prisma from "@/app/utils/db";
import { invoiceSchema, onboardingSchema } from "@/app/utils/zod-schemas";
import { parseWithZod } from "@conform-to/zod"
import { redirect } from "next/navigation";
import emailClient from "@/app/utils/email-client";
import { formatCurrency } from "@/hooks/format-currency";

export async function onBoardUser(prevState: any, formData: FormData) {
    const session = await requireUser()

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

export async function createInvoice(prevState:any, formData: FormData) {
    const session = await requireUser()

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const data = await prisma.invoice.create({
        data: {
            userId: session.user?.id,
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        }
    })

    const sender = {
        email: "hello@theharsh.xyz",
        name: "Invoice Mailer by Harsh",
    };

    emailClient.send({
        from: sender,
        to: [{email: submission.value.clientEmail}],
        template_uuid: "1d992472-f2f9-407c-bd14-6177673ddd6e",
        template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        dueDate: new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
        }).format(
            (() => {
                const baseDate = new Date(submission.value.date);
                const daysToAdd = parseInt(submission.value.dueDate.toString(), 10);
                baseDate.setDate(baseDate.getDate() + daysToAdd);
                return baseDate;
            })()
        ),    
        totalAmount: formatCurrency({
            amount: submission.value.total,
            currency: submission.value.currency as any,
        }),
        invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
        }
        })

    return redirect("/dashboard/invoices"); 
}   

export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();
  
    const submission = parseWithZod(formData, {
      schema: invoiceSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const data = await prisma.invoice.update({
      where: {
        id: formData.get("id") as string,
        userId: session.user?.id,
      },
      data: {
        clientAddress: submission.value.clientAddress,
        clientEmail: submission.value.clientEmail,
        clientName: submission.value.clientName,
        currency: submission.value.currency,
        date: submission.value.date,
        dueDate: submission.value.dueDate,
        fromAddress: submission.value.fromAddress,
        fromEmail: submission.value.fromEmail,
        fromName: submission.value.fromName,
        invoiceItemDescription: submission.value.invoiceItemDescription,
        invoiceItemQuantity: submission.value.invoiceItemQuantity,
        invoiceItemRate: submission.value.invoiceItemRate,
        invoiceName: submission.value.invoiceName,
        invoiceNumber: submission.value.invoiceNumber,
        status: submission.value.status,
        total: submission.value.total,
        note: submission.value.note,
      },
    });
  
    const sender = {
      email: "hello@theharsh.xyz",
      name: "Invoice Mailer by Harsh",
    };
  
    emailClient.send({
        from: sender,
        to: [{email: submission.value.clientEmail}],
        template_uuid: "6efa345b-3965-4de9-9b3f-87f10180ad67",
        template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        dueDate: new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
        }).format(
            (() => {
                const baseDate = new Date(submission.value.date);
                const daysToAdd = parseInt(submission.value.dueDate.toString(), 10);
                baseDate.setDate(baseDate.getDate() + daysToAdd);
                return baseDate;
            })()
        ),    
        totalAmount: formatCurrency({
            amount: submission.value.total,
            currency: submission.value.currency as any,
        }),
        invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
        }
        })
  
    return redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
    const session = await requireUser();
  
    const data = await prisma.invoice.delete({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
    });
  
    return redirect("/dashboard/invoices");
}
  
export async function markAsPaidAction(invoiceId: string) {
    const session = await requireUser();
  
    const data = await prisma.invoice.update({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
      data: {
        status: "PAID",
      },
    });
  
    return redirect("/dashboard/invoices");
}