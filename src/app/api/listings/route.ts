import { Listing } from "@/models/Listing";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {

}

export const POST = async (req: NextRequest) => {
    const { quantity } = await req.json();

    const listings = await Listing.find().sort({ createdAt: -1 }).limit(quantity);
    
    return NextResponse.json({ listings }, { status: 200 });
}