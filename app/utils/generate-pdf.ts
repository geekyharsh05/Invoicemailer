import { formatCurrency } from "@/hooks/format-currency";
import jsPDF from "jspdf";

interface iInvoiceData {
  invoiceName: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string | number;
  date: Date;
  dueDate: string | number;
  invoiceItemDescription: string;
  invoiceItemQuantity: number;
  invoiceItemRate: number;
  total: number;
  currency: string;
  note?: string | null;
}

const formatDate = (date: Date): string =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);

export const generateInvoicePDF = (data: iInvoiceData): jsPDF => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    // Set font and headers
    pdf.setFont("helvetica");
    pdf.setFontSize(24);
    pdf.text(data.invoiceName, 20, 20);
  
    // From Section
    pdf.setFontSize(12);
    pdf.text("From", 20, 40);
    pdf.setFontSize(10);
    pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);
  
    // Client Section
    pdf.setFontSize(12);
    pdf.text("Bill to", 20, 70);
    pdf.setFontSize(10);
    pdf.text([data.clientName, data.clientEmail, data.clientAddress], 20, 75);
  
    // Invoice Details
    pdf.setFontSize(10);
    pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40);
    pdf.text(`Date: ${formatDate(data.date)}`, 120, 45);
    pdf.text(`Due Date: Net ${data.dueDate}`, 120, 50);
  
    // Table Headers
    pdf.setFont("helvetica", "bold");
    pdf.text("Description", 20, 100);
    pdf.text("Quantity", 100, 100);
    pdf.text("Rate", 130, 100);
    pdf.text("Total", 160, 100);
    pdf.line(20, 102, 190, 102);
  
    // Item Details
    pdf.setFont("helvetica", "normal");
    pdf.text(data.invoiceItemDescription, 20, 110);
    pdf.text(data.invoiceItemQuantity.toString(), 100, 110);
    pdf.text(
      formatCurrency({
        amount: data.invoiceItemRate,
        currency: data.currency as any,
      }),
      130,
      110
    );
    pdf.text(
      formatCurrency({ amount: data.total, currency: data.currency as any }),
      160,
      110
    );
  
    // Total Section
    pdf.line(20, 115, 190, 115);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Total (${data.currency})`, 130, 130);
    pdf.text(
      formatCurrency({ amount: data.total, currency: data.currency as any }),
      160, 130
    );
  
    // Additional Notes
    if (data.note) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Note:", 20, 150);
      pdf.text(data.note, 20, 155);
    }
  
    return pdf;
};
  