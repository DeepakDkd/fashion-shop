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
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import axios from "axios"; 


export  function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { data, status } = useSession();
    
    if (data) {

        console.log("session data in register form", data?.user.name);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password || !name) {
            toast.error("Please fill in all fields");
            return;
        }

        const res = await axios.post("/api/auth/register", { email, password, name })
        toast.success("Registration successful! .")

        if (res.status === 200) {
            await signIn("credentials", {
                email, password,
                callbackUrl: "/",
                redirect: false,
            });


          
        }
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
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        // required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Field>
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
