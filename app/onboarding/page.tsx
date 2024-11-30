"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/SubmitButtons";
import { useActionState } from "react";
import { onBoardUser } from "@/lib/actions/actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zod-schemas";
import ErrorMessage from "../components/ErrorMessage";

export default function Onboarding() {
    const [lastResult, action] = useActionState(onBoardUser, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            })
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">
                        You are almost finished!
                    </CardTitle>
                    <CardDescription>Enter your details to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>First Name</Label>
                                <Input
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    type="text"
                                    placeholder="Graeme"
                                />
                                <ErrorMessage error={fields.firstName.errors} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                    type="text"
                                    placeholder="Smith"
                                />
                                <ErrorMessage error={fields.lastName.errors} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                type="text"
                                placeholder="The Wanderers, Johannesburg"
                            />
                            <ErrorMessage error={fields.address.errors} />
                        </div>
                        <SubmitButton text="Finish Onboarding" />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
