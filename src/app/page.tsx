"use client";

import Image from "next/image";

import Header from "@/components/Header";
import ListingCard from "@/components/ListingCard";
import TypeCard from "@/components/TypeCard";
import { Skeleton } from "@/components/ui/skeleton";

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
};

enum Category {
  "Eletrônicos" = 1,
  "Doméstico",
  "Uso Pessoal",
  "Locomoção",
  "Serviços",
  "Hobbies",
  "De bizu",
}

export default function Home() {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        `/api/listings?quantity=3${
          selected !== 0 ? `&category=${Category[selected]}` : ""
        }`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setLoading(false);

      setListings(data.listings);
    };

    fetchListings();
  }, [selected]);

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
          <TypeCard
            figure={AndroidFigure}
            title="Eletrônicos"
            selected={selected === 1}
            onClick={() => setSelected(selected === 1 ? 0 : 1)}
          />
          <TypeCard
            figure={DomesticFigure}
            title="Doméstico"
            selected={selected === 2}
            onClick={() => setSelected(selected === 2 ? 0 : 2)}
          />
          <TypeCard
            figure={PersonalFigure}
            title="Uso Pessoal"
            selected={selected === 3}
            onClick={() => setSelected(selected === 3 ? 0 : 3)}
          />
          <TypeCard
            figure={TransportFigure}
            title="Locomoção"
            selected={selected === 4}
            onClick={() => setSelected(selected === 4 ? 0 : 4)}
          />
          <TypeCard
            figure={ServicesFigure}
            title="Serviços"
            selected={selected === 5}
            onClick={() => setSelected(selected === 5 ? 0 : 5)}
          />
          <TypeCard
            figure={HobbiesFigure}
            title="Hobbies"
            selected={selected === 6}
            onClick={() => setSelected(selected === 6 ? 0 : 6)}
          />
          <TypeCard
            figure={FreeFigure}
            title="De bizu"
            selected={selected === 7}
            onClick={() => setSelected(selected === 7 ? 0 : 7)}
          />
        </div>
        <h2 className="text-4xl font-bold text-primary my-4">
          Anúncios recentes
        </h2>

        <div className="grid grid-cols-3 gap-10 justify-items-center">
          {!loading
            ? listings.map((listing) => <ListingCard listing={listing} />)
            : Array.from(Array(3).keys()).map((_el, index) => (
                <Skeleton
                  className="h-64 w-48 rounded-xl bg-zinc-400"
                  key={index}
                />
              ))}
        </div>
      </section>
    </div>
  );
}
