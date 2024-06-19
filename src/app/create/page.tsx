"use client";
import { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { MdOutlineImage } from "react-icons/md";

import Header from "@/components/Header";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreatePage() {
  const [images, setImages] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((oldImages) => [
      ...oldImages,
      ...acceptedFiles.map((el) => URL.createObjectURL(el)),
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <Tabs defaultValue="information">
          <TabsList className="bg-zinc-50">
            <TabsTrigger value="information">Informações gerais</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <Card>
              <CardHeader className="text-primary">
                <CardTitle className="text-6xl">Novo anúncio</CardTitle>
                <CardDescription>
                  Dê as informações gerais sobre o anúncios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 gap-8">
                    <input
                      type="text"
                      placeholder="Título do anuncio"
                      className="w-full outline-none bg-white p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Preço base (em R$)"
                      className="w-full outline-none 
                      bg-white p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <Textarea
                    placeholder="Breve descrição"
                    className="my-6 w-full !outline-none focus:!outline-none bg-white p-4 border-zinc-300
                     rounded-sm border focus:border-secondary 
                     transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Categorias"
                    className="w-full outline-none 
                      bg-white p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <button
                  type="submit"
                  className="w-full flex text-3xl justify-center items-center p-4 text-zinc-50 bg-secondary transition-all rounded hover:brightness-110"
                >
                  <strong>Próximo</strong>
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="images">
            <Card className="p-8">
              <CardContent>
                <Dropzone onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="">
                      <div
                        {...getRootProps()}
                        className="border-dashed border-zinc-300 border-4 rounded py-24 px-32 text-zinc-500 cursor-pointer flex items-center justify-center flex-col"
                      >
                        <input {...getInputProps()} />
                        <strong className="text-2xl">
                          Arraste suas imagens aqui
                        </strong>
                        <MdOutlineImage size={96} />
                      </div>
                    </section>
                  )}
                </Dropzone>
                <div className="flex h-16 gap-2 my-6">
                  {images.map((el, index) => (
                    <img
                      src={el}
                      alt="Image preview"
                      key={index}
                      className="grayscale-[50%] rounded-sm"
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <button
                  type="submit"
                  className="w-full flex text-3xl justify-center items-center p-4 text-zinc-50 bg-secondary transition-all rounded hover:brightness-110"
                >
                  <strong>Criar</strong>
                </button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
