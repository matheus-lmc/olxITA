import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { email, name, phone, nickname, userClass, password } = await req.json();

    // Check for missing fields
    if (!email || !name || !phone || !nickname || !password) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Check if user already exists
    const exist = await User.findOne({ email });

    if (exist) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { email, name, phone, nickname, userClass, password: hashedPassword };
    
    try {
        const newUser = await User.create(userData);
        return NextResponse.json({ message: 'User created successfully', newUser }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}