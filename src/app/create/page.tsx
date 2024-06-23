"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
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
import { redirect } from "next/navigation";

export default function CreatePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    }
  });

  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
    categories: ""
  });

  const [activeTab, setActiveTab] = useState('information');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((oldImages) => [
      ...oldImages,
      ...acceptedFiles.map((el) => URL.createObjectURL(el)),
    ]);

    setFiles((oldFiles) => [...oldFiles, ...acceptedFiles]);
  }, []);

  const isValidCategory = (category: string): boolean => {
    const validCategories = [
      "ELETRONICOS",
      "DOMESTICOS",
      "USO PESSOAL",
      "LOCOMOÇÃO",
      "SERVIÇOS",
      "HOBBIES",
      "DE BIZU",
      "OUTROS",
    ];
    const categories = category.split(",");
    
    for (const cat of categories) {
      if (!validCategories.includes(cat.trim().toUpperCase())) {
        return false;
      }
    }

    return true;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCreateListing = async () => {
    if (!form.title || !form.price || !form.description || !form.categories) {
      alert("Please fill in all fields");
      return;
    }

    if (!isValidCategory(form.categories)) {
      alert("Invalid category");
      return;
    }

    if(!files) return;

    try {
      const data = new FormData();

      files.forEach((file) => {
        data.append("file", file);
      });

      data.set("form", JSON.stringify(form));
      data.set("userId", (session?.user as any).id as string)

      const response = await fetch("/api/create-listing", {
        method: 'POST',
        body: data
      });

      const json = await response.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextClick = () => {
    setActiveTab('images');
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                      name="title"
                      type="text"
                      value={form.title}
                      placeholder="Título do anuncio"
                      className="w-full outline-none bg-white p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                      onChange={handleFormChange}
                    />
                    <input
                      name="price"
                      type="number"
                      value={form.price == 0 ? "" : form.price}
                      placeholder="Preço base (em R$)"
                      className="w-full outline-none 
                      bg-white p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={handleFormChange}
                    />
                  </div>
                  <Textarea
                    name="description"
                    value={form.description}
                    placeholder="Breve descrição"
                    className="my-6 w-full !outline-none focus:!outline-none bg-white p-4 border-zinc-300
                     rounded-sm border focus:border-secondary 
                     transition-all"
                    onChange={handleFormChange}
                  />
                  <input
                    name="categories"
                    type="text"
                    value={form.categories}
                    placeholder="Categorias"
                    className="w-full outline-none 
                      bg-white p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    onChange={handleFormChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <button
                  type="button"
                  onClick={handleNextClick}
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
                  onClick={handleCreateListing}
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
