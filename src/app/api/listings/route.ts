import { Listing } from "@/models/Listing";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: Request, _res: Response) => {
  const { searchParams } = new URL(req.url);
  const quantity = Number(searchParams.get("quantity"));
  const category = searchParams.get("category");
  let listings;

  if (category) {
    listings = await Listing.find({
      categories: {
        $in: [category?.toUpperCase()],
      },
    })
      .sort({ createdAt: -1 })
      .limit(quantity);
  } else {
    listings = await Listing.find().sort({ createdAt: -1 }).limit(quantity);
  }

  return NextResponse.json({ listings }, { status: 200 });
};
