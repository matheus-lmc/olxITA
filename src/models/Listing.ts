import mongoose from "@/lib/mongodb";

export interface IListing {
  title: string;
  price: number;
  description: string;
  categories: string[];
  images: string[];
  status: string;
  createdAt: Date;
}

const listingSchema = new mongoose.Schema<IListing>({
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
  },
});

export const Listing = (mongoose.models.Listing ||
  mongoose.model<IListing>(
    "Listing",
    listingSchema
  )) as mongoose.Model<IListing>;
