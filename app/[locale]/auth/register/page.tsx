"use client";
import { RegisterForm } from "@/components/register-form";
import { useSession, signIn, signOut } from "next-auth/react";

export default function RegisterPage() {
    const { data: session, status } = useSession();
    console.log("session data data", session, "session status", status);
    if (session) {
        return <div>Welcome, {session.user.name}!</div>;
    }
    return (
        <div className="flex flex-col items-center justify-center py-10">
            {
                session ? (
                    <button onClick={() => signOut({ callbackUrl: "/" })}>
                        Sign out
                    </button>
                ) : (
                    <RegisterForm />
                )
            }
        </div>
    );
}