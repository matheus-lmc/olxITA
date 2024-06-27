"use client"

import Image from "next/image";

import Header from "@/components/Header";
import ListingCard from "@/components/ListingCard";
import TypeCard from "@/components/TypeCard";

import MainFigure from "@/assets/main-figure.svg";
import AndroidFigure from "@/assets/android.svg";
import DomesticFigure from "@/assets/domestic.svg";
import PersonalFigure from "@/assets/personal.svg";
import TransportFigure from "@/assets/transport.svg";
import ServicesFigure from "@/assets/services.svg";
import HobbiesFigure from "@/assets/hobbies.svg";
import FreeFigure from "@/assets/free.svg";
import { useEffect, useState } from "react";

export type ListingType = {
  _id: string;
  title: string;
  price: number;
  categories: string[];
  description: string;
  images: string[];
  status: string;
}

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  userClass: string;
  currentListings: string[];
}

export default function Home() {
  const [listings, setListings] = useState<ListingType[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({ quantity: 3 }),
      });

      const data = await response.json();

      setListings(data.listings);

      console.log(data.listings)
    }

    fetchListings();
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <Header />
      <main className="flex my-5 pt-32 px-48 justify-between">
        <div className="flex justify-center flex-col w-1/3">
          <h1 className="font-bold text-4xl text-primary leading-relaxed">
            <span className="text-cyan-500">Compre</span> e{" "}
            <span className="text-orange-500">venda</span> produtos com
            facilidade
          </h1>
          <p className="font-extralight text-xl text-primary text-pretty text-left my-4 leading-8">
            Com a olxITA, nunca foi tão fácil conseguir os produtos que você
            quer.
          </p>
        </div>

        <Image src={MainFigure} alt="Main Figure" />
      </main>

      <section className="flex flex-col px-12 py-4">
        <h2 className="text-4xl font-bold text-primary">Categorias</h2>

        <div className="grid grid-cols-7 p-8 gap-10 justify-items-center">
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={DomesticFigure} title="Doméstico" />
          <TypeCard figure={PersonalFigure} title="Uso Pessoal" />
          <TypeCard figure={TransportFigure} title="Locomoção" />
          <TypeCard figure={ServicesFigure} title="Serviços" />
          <TypeCard figure={HobbiesFigure} title="Hobbies" />
          <TypeCard figure={FreeFigure} title="De bizu" />
        </div>
        <h2 className="text-4xl font-bold text-primary my-4">
          Anúncios recentes
        </h2>

        <div className="grid grid-cols-3 justify-items-left">
          {listings.map((listing) => (
            <ListingCard
              listing={listing}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
