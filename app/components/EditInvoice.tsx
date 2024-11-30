/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useMemo, useState } from "react";
import SubmitButton from "./SubmitButtons";
import { editInvoice } from "@/lib/actions/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zod-schemas";
import ErrorMessage from "./ErrorMessage";
import { formatCurrency } from "@/hooks/format-currency";
import { Prisma } from "@prisma/client";
import { currencies } from "./CreateInvoice";

interface iAppProps {
    data: Prisma.InvoiceGetPayload<object>
}

export default function EditInvoice({ data }: iAppProps) {
    const [selectedDate, setSelectedDate] = useState(data?.date);
    const [rate, setRate] = useState(data.invoiceItemRate.toString())
    const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString())
    const [currency, setCurrency] = useState("INR");
    const calculateTotal = useMemo(
        () => (Number(quantity) || 0) * (Number(rate) || 0),
        [quantity, rate]
    );

    const [lastResult, action] = useActionState(editInvoice, undefined)
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: invoiceSchema,
            })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
                    <input
                        type="hidden"
                        name={fields.date.name}
                        value={selectedDate.toISOString()}
                    />
                    <input
                        type="hidden"
                        name="id"
                        value={data.id}
                    />
                    <input
                        type="hidden"
                        name={fields.total.name}
                        value={calculateTotal}
                    />


                    <div className="flex flex-col gap-1 w-fit mb-6">
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary">Draft</Badge>
                            <Input
                                name={fields.invoiceName.name}
                                key={fields.invoiceName.name}
                                defaultValue={data.invoiceName}
                                placeholder="Test 123"
                            />
                        </div>
                        <ErrorMessage error={fields.invoiceName.errors} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <Label>Invoice No.</Label>
                            <div className="flex">
                                <span className="px-3 border border-r-0 rounder-l-md bg-muted flex items-center">#</span>
                                <Input
                                    name={fields.invoiceNumber.name}
                                    key={fields.invoiceNumber.name}
                                    defaultValue={data.invoiceNumber}
                                    className="rounded-l-none"
                                    placeholder="5"
                                />
                            </div>
                            <ErrorMessage error={fields.invoiceNumber.errors} />
                        </div>

                        <div>
                            <Label>Currency</Label>
                            <Select defaultValue={currency} onValueChange={(value) => setCurrency(value)} name={fields.currency.name} key={fields.currency.key}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.value} value={currency.value}>
                                            {currency.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <ErrorMessage error={fields.currency.errors} />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Label>From</Label>
                            <div className="space-y-2">
                                <Input
                                    name={fields.fromName.name}
                                    key={fields.fromName.key}
                                    placeholder="Your Name"
                                    defaultValue={data.fromName}
                                />
                                <ErrorMessage error={fields.fromName.errors} />
                                <Input
                                    name={fields.fromEmail.name}
                                    key={fields.fromEmail.key}
                                    placeholder="Your Email"
                                    defaultValue={data.fromEmail}
                                />
                                <ErrorMessage error={fields.fromEmail.errors} />
                                <Input
                                    name={fields.fromAddress.name}
                                    key={fields.fromAddress.key}
                                    placeholder="Your Address"
                                    defaultValue={data.fromAddress}
                                />
                                <ErrorMessage error={fields.fromAddress.errors} />
                            </div>
                        </div>

                        <div>
                            <Label>To</Label>
                            <div className="space-y-2">
                                <Input
                                    name={fields.clientName.name}
                                    key={fields.clientName.key}
                                    defaultValue={data.clientName}
                                    placeholder="Client Name"
                                />
                                <ErrorMessage error={fields.clientName.errors} />
                                <Input
                                    name={fields.clientEmail.name}
                                    key={fields.clientEmail.key}
                                    defaultValue={data.clientEmail}
                                    placeholder="Client Email"
                                />
                                <ErrorMessage error={fields.clientEmail.errors} />
                                <Input
                                    name={fields.clientAddress.name}
                                    key={fields.clientAddress.key}
                                    defaultValue={data.clientAddress}
                                    placeholder="Client Address"
                                />
                                <ErrorMessage error={fields.clientAddress.errors} />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <div>
                                <Label>Date</Label>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[280px]">
                                        <CalendarIcon />

                                        {selectedDate ? (
                                            new Intl.DateTimeFormat("EN-US", {
                                                dateStyle: "long",
                                            }).format(selectedDate)
                                        ) : (
                                            <span>Pick a Date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => setSelectedDate(date || new Date())}
                                        fromDate={new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <ErrorMessage error={fields.date.errors} />
                        </div>

                        <div>
                            <Label>Due Date</Label>
                            <Select
                                name={fields.dueDate.name}
                                key={fields.dueDate.key}
                                defaultValue={data.dueDate.toString()}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Due Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Due on Receipt</SelectItem>
                                    <SelectItem value="15">Net 15</SelectItem>
                                    <SelectItem value="30">Net 30</SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage error={fields.dueDate.errors} />
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                            <p className="col-span-6">Description</p>
                            <p className="col-span-2">Quantity</p>
                            <p className="col-span-2">Rate</p>
                            <p className="col-span-2">Amount</p>
                        </div>

                        <div className="grid grid-cols-12 gap-4 mb-4">
                            <div className="col-span-6">
                                <Textarea
                                    name={fields.invoiceItemDescription.name}
                                    key={fields.invoiceItemDescription.key}
                                    defaultValue={data.invoiceItemDescription}
                                    placeholder="Description"
                                />
                                <ErrorMessage error={fields.invoiceItemDescription.errors} />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    name={fields.invoiceItemQuantity.name}
                                    key={fields.invoiceItemQuantity.key}
                                    type="number"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <ErrorMessage error={fields.invoiceItemQuantity.errors} />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    name={fields.invoiceItemRate.name}
                                    key={fields.invoiceItemRate.key}
                                    defaultValue={data.invoiceItemRate.toString()}
                                    type="number"
                                    placeholder="0"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                />
                                <ErrorMessage error={fields.invoiceItemRate.errors} />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    value={formatCurrency({
                                        amount: calculateTotal,
                                        currency: currency as any,
                                    })}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="w-1/3 ">
                            <div className="flex justify-between py-2">
                                <span>Subtotal</span>
                                <span> {formatCurrency({
                                    amount: calculateTotal,
                                    currency: currency as any,
                                })}
                                </span>
                            </div>

                            <div className="flex justify-between py-2 border-t">
                                <span>Total ({currency})</span>
                                <span className="font-medium underline underline-offset-2">
                                    {formatCurrency({
                                        amount: calculateTotal,
                                        currency: currency as any,
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label>Note</Label>
                        <Textarea
                            name={fields.note.name}
                            key={fields.note.key}
                            defaultValue={data.note ?? ""}
                            placeholder="Add a note to this invoice..."
                        />
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <div>
                            <SubmitButton text="Update Invoice" />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card >
    )
}