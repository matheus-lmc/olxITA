import Image from "next/image";
import Link from "next/link";

import { ListingType } from "@/app/page";

export default function ListingCard({listing} : {listing: ListingType}) {
  const link = `/listing/${listing._id}`;
  const images = listing.images;

  return (
    <Link
      className="w-fit bg-zinc-50 border-zinc-300 rounded-sm overflow-hidden border hover:bg-yellow-100 hover:rounded-xl transition-all"
      href={link}
    >
      <Image src={`/${images[0]}`} width={300} height={300} alt="Listing" className="aspect-square"/>
      <div className="p-4 w-[300px]">
        <strong>{listing.title}</strong>
        <div className="flex items-baseline">
          <p>R$</p>
          <strong className="text-3xl text-green-600 mx-2">{listing.price}</strong>
        </div>
      </div>
    </Link>
  );
}
