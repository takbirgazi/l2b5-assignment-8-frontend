/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { redirect } from "next/navigation";
import { setCookie } from "./tokenHandlers";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { parse } from "cookie";

// No need to decode JWT since role is in data.user

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get('redirect') || null;
        let accessTokenObject: string | null = null;
        let refreshTokenObject: string | null = null;
        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        // Validate input using Zod schema
        const zodValidation = zodValidator(payload, loginValidationZodSchema);
        if (!zodValidation.success) {
            return zodValidation;
        }

        const validatedPayload = zodValidation.data;

        // Request to backend for login
        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await res.json();

        // Get tokens from Set-Cookie headers (like refresh token logic)
        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie['accessToken'];
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie['refreshToken'];
                }
            });
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in response");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in response");
        }

        // Obtain user role from result.data.user directly
        const userFromResponse = result.data?.user;
        if (!userFromResponse || !userFromResponse.role) {
            throw new Error("User role not found in response");
        }

        const userRole: UserRole = userFromResponse.role;

        // Set tokens as cookies
        await setCookie("accessToken", accessTokenObject as string, {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            path: "/",
            sameSite: "none",
        });

        await setCookie("refreshToken", refreshTokenObject as string, {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 90,
            path: "/",
            sameSite: "none",
        });

        // Set user role as cookie for proxy middleware
        await setCookie("userRole", userRole, {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            path: "/",
            sameSite: "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }

        // Handle redirect according to role and requested path
        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : "Login Failed. You might have entered incorrect email or password.",
        };
    }
}