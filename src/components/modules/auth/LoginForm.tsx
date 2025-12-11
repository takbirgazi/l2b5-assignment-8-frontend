"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export function LoginForm() {
    
    const [state, formAction, isPending] = useActionState(loginUser, null);

    useEffect(() => {
      if (state && !state.success && state.message) {
        toast.error(state.message);
      }
    }, [state]);

    return (
        <div className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <form action={formAction} className="space-y-5">
                    <FieldGroup>
                        <div className="grid grid-cols-1 gap-4">
                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="domain@example.com"
                            //   required
                            />

                            {/* <InputFieldError field="email" state={state} /> */}
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            //   required
                            />
                            {/* <InputFieldError field="password" state={state} /> */}
                        </Field>
                        </div>
                        <FieldGroup className="mt-4">
                        <Field>
                            <Button className="cursor-pointer" type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                            </Button>
                        </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </div>
    )
}