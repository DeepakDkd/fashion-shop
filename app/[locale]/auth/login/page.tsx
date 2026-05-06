"use client";
import { LoginForm } from "@/components/login-form";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
    const { data: session } = useSession();
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
                    <LoginForm />
                )
            }
        </div>
    );
}