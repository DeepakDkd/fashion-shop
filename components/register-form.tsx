"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import axios from "axios";6.2
export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("email", email, "password", password);
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        const res = axios.post("/api/auth/register", { email, password })
            .then((res:any) => {
                toast.success("Registration successful! Please log in.")
            })
            .catch((err:any) => {
                console.error("Registration error:", err);
                toast.error(err.response?.data?.message || "Registration failed");
            });
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Register for an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    // required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    // required

                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <Button type="submit" >
                                    Register
                                </Button>
                                <Button variant="outline" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
                                    Register with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <Link href="/auth/login">Login</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
