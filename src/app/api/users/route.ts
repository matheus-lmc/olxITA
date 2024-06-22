import { User } from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { email, name, phone, nickname, userClass, password } = await req.json();

    try {
        const userData = { email, name, phone, nickname, userClass, password }
    
        const newUser = await User.create(userData);
    
        return NextResponse.json({ message: "User created successfully", newUser}, {status: 201})
    } catch {
        return NextResponse.json({ message: "Error creating user" }, { status: 500 })
    }
}