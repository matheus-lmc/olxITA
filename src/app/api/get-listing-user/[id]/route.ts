import { User } from "@/models/User"
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    const id = req.url.split('get-listing-user/')[1]

    const user = await User.findOne({currentListings: id})

    return NextResponse.json({ message: "Ok", user }, { status: 200 })
}