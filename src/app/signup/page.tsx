import signUpImage from "@/assets/images/signup.jpg";
import Image from "next/image";
import { SignUpForm } from "@/components/modules/auth/SignUpForm";
import Link from "next/link";
import { ToggleLogo } from "@/components/shared/CommonLayout/ToggleLogo";

export function SignUpPage() {

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="bg-muted relative hidden lg:block">
                <figure>
                    <Image
                        src={signUpImage}
                        height={400}
                        width={800}
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </figure>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <ToggleLogo />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg border rounded-xl px-4 py-8">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;