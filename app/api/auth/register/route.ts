import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password, name } = await request.json();
    try {
        if (!email || !password || !name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        console.log(email, password, name)
        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        await User.create({
            email,
            name,
            password,
            role: "customer"
        })

    
        return NextResponse.json({ message: "Registerd successful" }, { status: 200 })


    } catch (erroe) {
        return NextResponse.json({ error: "Internal server error " }, { status: 500 })
    }


}