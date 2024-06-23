import { Listing } from "@/models/Listing"
import { User } from "@/models/User"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const id = req.url.split('listings/')[1]

    const listing = await Listing.findById(id)

    return NextResponse.json({ message: "Ok", listing }, { status: 200 })
}

export const PUT = async (req: Request, res: Response) => {

}

export const DELETE = async (req: Request) => {
    const id = req.url.split('listings/')[1]

    try {
        await Listing.findByIdAndDelete(id)
        
        await User.updateOne({ currentListings: id }, { $pull: { currentListings: id } })
    
        return NextResponse.json({ message: "Listing deleted" }, { status: 200 })
    } catch {
        return NextResponse.json({ message: "Error deleting listing" }, { status: 500 })
    }
}