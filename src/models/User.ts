import mongoose from "@/lib/mongodb";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    userClass: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    currentListings: {
        type: [String],
        required: false,
    }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);