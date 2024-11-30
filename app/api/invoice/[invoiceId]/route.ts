import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { generateInvoicePDF } from "@/app/utils/generate-pdf";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const { invoiceId } = await params;

    // Fetch invoice data
    const data = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      select: {
        invoiceName: true,
        invoiceNumber: true,
        currency: true,
        fromName: true,
        fromEmail: true,
        fromAddress: true,
        clientName: true,
        clientAddress: true,
        clientEmail: true,
        date: true,
        dueDate: true,
        invoiceItemDescription: true,
        invoiceItemQuantity: true,
        invoiceItemRate: true,
        total: true,
        note: true,
      },
    });

    // Handle missing invoice
    if (!data) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Generate PDF
    const pdf = generateInvoicePDF(data);
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="invoice-${data.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the invoice." },
      { status: 500 }
    );
  }
}
