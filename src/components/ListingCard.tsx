import Image from "next/image";
import Link from "next/link";

import StockListing from "@/assets/stock-listing1.png";

interface IListingCardsProps {
  price: number;
  title: string;
  link: string;
}

export default function ListingCard({
  price,
  title,
  link,
}: IListingCardsProps) {
  return (
    <Link
      className="bg-zinc-50 border-zinc-300 rounded-sm overflow-hidden border hover:bg-yellow-100 hover:rounded-xl transition-all"
      href={link}
    >
      <Image src={StockListing} alt="Listing" className="h-3/4" />
      <div className="p-4">
        <strong>{title}</strong>
        <div className="flex items-baseline">
          <p>R$</p>
          <strong className="text-3xl text-green-600 mx-2">{price}</strong>
        </div>
      </div>
    </Link>
  );
}
