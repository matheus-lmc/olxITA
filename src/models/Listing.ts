import mongoose from "@/lib/mongodb";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

export const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);