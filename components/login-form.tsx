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
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const router = useRouter();
  
      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          console.log("email", email, "password", password);
          if (!email || !password) {
              toast.error("Please fill in all fields");
              return;
          }
  
          const res = await signIn("credentials", {
              email: email,
              password: password,
              callbackUrl: "/",
              redirect: false,
          });
          console.log("resss",res);
          if (res?.error) {
              toast.error(res.error);
              return;
          }

          if (res?.url) {
              router.push(res.url);
          }
      }
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/auth/register">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
