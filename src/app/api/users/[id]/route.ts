import { User } from "@/models/User"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    const id = req.url.split('users/')[1]

    const user = await User.findById(id)

    return NextResponse.json({ message: "Ok", user }, { status: 200 })
}

export const PUT = async (req: Request, res: Response) => {
    
}

export const DELETE = async (req: Request, res: Response) => {

}