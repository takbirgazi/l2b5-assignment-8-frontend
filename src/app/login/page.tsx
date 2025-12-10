"use client"
import logo from "@/assets/images/logo.png";
import logo2 from "@/assets/images/logo_2.png";
import loginImage from "@/assets/images/login.jpg";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LoginForm } from "@/components/modules/auth/LoginForm";
import { useRouter } from "next/navigation";

export function LoginPage() {
    const { theme } = useTheme();
    const router = useRouter();
    const { data } = {
        data:{
            data:{
                email:"takbirgazibd@gmail.com"
            }
        }
    };

    useEffect(() => {
        if (data?.data?.email) {
            router.push("/");
        }
    }, [data, router]);

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <figure>
                            <Image
                            width={100}
                            height={35}
                            src={theme == "dark" ? logo2 : logo}
                            alt="No-Cash Logo"
                            />
                        </figure>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md border rounded-xl px-4 py-8">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <figure>
                    <Image
                        src={loginImage}
                        height={400}
                        width={800}
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </figure>
            </div>
        </div>
    )
}

export default LoginPage;