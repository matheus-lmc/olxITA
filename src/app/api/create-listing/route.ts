import { Listing } from "@/models/Listing";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { title, price, description, categories, images, status, userId } = await req.json();

    const listingData = { title, price, description, categories, images, status, createdAt: new Date() }

    try {
        const newListing = await Listing.create(listingData);

        const user = await User.findById(userId);

        const currentListings = user?.currentListings;
        currentListings?.push(newListing._id.toString());
        await user?.updateOne({currentListings});

        return NextResponse.json({ message: "Product created successfully", newListing}, {status: 201})
    } catch {
        return NextResponse.json({ message: "Error creating product" }, { status: 500 })
    }
}