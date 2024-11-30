import prisma from "@/app/utils/db";
import emailClient from "@/app/utils/email-client";
import { requireUser } from "@/hooks/require-user";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: { params: Promise<{ invoiceId: string }>}) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
    });

    if (!invoiceData) {
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
        email: "hello@theharsh.xyz",
        name: "Invoice Mailer by Harsh",
      };
    
      emailClient.send({
          from: sender,
          to: [{email: invoiceData.clientEmail}],
          template_uuid: "f38660e6-c96b-4b2c-ad03-16a40a160dfc",
          template_variables: {
            first_name: invoiceData.clientName,
          }
          }
        )

        return NextResponse.json({ message: "Invoice reminder sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending invoice:", error);
    return NextResponse.json({ error: "An error occurred while sending the invoice." }, { status: 500 });
  }
}