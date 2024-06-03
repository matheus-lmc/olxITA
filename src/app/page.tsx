import Image from "next/image";

import Header from "@/components/Header";

import MainFigure from "@/assets/main-figure.svg";
import AndroidFigure from "@/assets/android.svg";
import TypeCard from "@/components/TypeCard";

export default function Home() {
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

      <section className="flex flex-col px-12">
        <h2 className="text-4xl font-bold text-primary">Categorias</h2>

        <div className="grid grid-cols-8 p-8 gap-10">
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
          <TypeCard figure={AndroidFigure} title="Eletrônicos" />
        </div>
        <h2 className="text-4xl font-bold text-primary my-4">
          Anúncios recentes
        </h2>

        <div className="grid grid-cols-3 p-8 gap-10"></div>
      </section>
    </div>
  );
}
