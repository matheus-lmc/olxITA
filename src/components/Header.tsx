import Image from "next/image";
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
import Logo from "@/assets/logo.png";

export default function Header() {
  return (
    <div className="w-full grid grid-cols-[1fr_2fr_1fr] px-16 py-4 align-middle">
      <div className="flex items-center justify-start">
        <Image src={Logo} alt="OLXITA" />
      </div>
      <div className="px-40 ">
        <div className="bg-zinc-50 grid grid-cols-[6fr_1fr] border-zinc-300 rounded-sm overflow-hidden border focus-within:border-secondary transition-all  ">
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
            <a
              className="my-2 hover:text-secondary transition-all flex items-center p-2"
              href="/"
            >
              <MdLogin className="mr-4" size={20} />
              Logar
            </a>
            <a
              className="my-2 hover:text-secondary transition-all flex items-center p-2"
              href="/"
            >
              <MdPersonAdd className="mr-4" size={20} />
              Criar conta
            </a>
          </PopoverContent>
        </Popover>
        <a className="my-auto flex justify-center items-center p-1 text-zinc-50 bg-secondary transition-all rounded mx-2 hover:brightness-110 hover:cursor-pointer">
          <MdAdd size={24} />
        </a>
        <Popover>
          <PopoverTrigger className="transition-all  hover:text-zinc-500">
            <MdOutlineSettings size={24} />
          </PopoverTrigger>
          <PopoverContent className="bg-zinc-50">Test</PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
