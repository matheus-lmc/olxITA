import { Listing } from "@/models/Listing";
import { User } from "@/models/User";
import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random;  
    return random_number;
}

export const POST = async (request: NextRequest) => {
    const data = await request.formData();
    const files: File[] | null = data.getAll("file") as unknown as File[];
    const userId = data.get("userId") as string;
    const form = JSON.parse(data.get("form") as string);

    let images : string[] = [];
    await Promise.all(files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = getRandomFileName().toString() + ".png";
    
        const path = join('public', fileName);
        await mkdir(join('public'), {recursive: true});
        await writeFile(path, buffer);
        console.log(`open ${path} to see the uploaded file`);

        images.push(fileName);
    }));

    form.categories = form.categories.split(",").map((cat: string) => cat.trim().toUpperCase());

    const listingData = {
        ...form,
        images,
        createdAt: new Date(),
        status: "EM NEGOCIAÇÃO"
    }

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