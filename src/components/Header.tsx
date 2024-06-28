import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";

import {
  MdSearch,
  MdPersonOutline,
  MdAdd,
  MdOutlineSettings,
  MdLogin,
  MdPersonAdd,
} from "react-icons/md";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Logo from "@/assets/logo.png";

export default function Header() {
  const { data: session } = useSession();

  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-full grid grid-cols-[1fr_2fr_1fr] px-16 py-4 align-middle">
        <a className="flex items-center justify-start" href="/">
          <Image src={Logo} alt="OLXITA" className="h-20 w-20" />
        </a>
        <div className="px-40 ">
          <div className="bg-zinc-50 grid grid-cols-[6fr_1fr] border-zinc-300 rounded-sm overflow-hidden border focus-within:border-secondary transition-all">
            <input
              type="text"
              className="bg-zinc-50 outline-none p-4"
              placeholder="O que você procura hoje?"
            />
            <button className="flex justify-center items-center p-4 hover:bg-zinc-200 transition-all">
              <MdSearch size={24} />
            </button>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Popover>
            <PopoverTrigger className="transition-all hover:text-zinc-500">
              <MdPersonOutline size={24} />
            </PopoverTrigger>
            <PopoverContent className="bg-zinc-50 flex flex-col">
              {!session ? (
                <>
                  <Link
                    className="my-2 hover:text-secondary transition-all flex items-center p-2"
                    href="/login"
                  >
                    <MdLogin className="mr-4" size={20} />
                    Logar
                  </Link>
                  <Link
                    className="my-2 hover:text-secondary transition-all flex items-center p-2"
                    href="/signup"
                  >
                    <MdPersonAdd className="mr-4" size={20} />
                    Criar conta
                  </Link>
                </>
              ) : (
                <>
                  <div className="my-2 p-2">Olá, {session?.user?.name}!</div>
                  <Link
                    className="my-2 hover:text-secondary transition-all flex items-center p-2"
                    href="/api/auth/signout?callbackUrl=/"
                  >
                    <MdLogin className="mr-4" size={20} />
                    Sair
                  </Link>
                </>
              )}
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href="/create"
                className="my-auto flex justify-center items-center p-1 text-zinc-50 bg-secondary transition-all rounded mx-2 hover:brightness-110 hover:cursor-pointer"
              >
                <MdAdd size={24} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Fazer um novo anúncio</p>
            </TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger className="transition-all  hover:text-zinc-500">
              <MdOutlineSettings size={24} />
            </PopoverTrigger>
            <PopoverContent className="bg-zinc-50 flex flex-col">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Equipe</AccordionTrigger>
                  <AccordionContent>
                    <p>Matheus Lomônaco</p>
                    <p>Lucas Fochesatto</p>
                    <p>Gustavo César</p>
                    <p>Gabriel Valadares</p>
                    <p>Alan Sereno</p>
                    <p>João Fontenele</p>
                    <p>Ruy Colli</p>
                    <p>Vitor Monteiro</p>
                    <p>Nelson Alexandre</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                href="https://github.com/matheus-lmc/olxITA"
                className="my-4 font-medium underline hover:text-primary transition-all"
              >
                Github
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </TooltipProvider>
  );
}
