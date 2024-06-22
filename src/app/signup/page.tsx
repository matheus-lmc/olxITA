"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import Header from "@/components/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z
  .object({
    email: z.string().email({
      message: "O email deve estar em um formato válido",
    }),
    password: z.string(),
    name: z.string(),
    phoneNum: z.number(),
    nickname: z.string(),
    class: z.number(),
    confirmPass: z.string(),
  })
  .refine(({ confirmPass, password }) => confirmPass === password, {
    message: "As senhas devem ser iguais",
    path: ["confirmPass"],
  });

type FormType = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <Header />
      <div className="w-full flex-1 flex items-center justify-center flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-zinc-50 p-12 rounded w-1/3"
          >
            <h1 className="text-4xl font-bold text-primary mb-8">
              Criar conta
            </h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormControl>
                    <input
                      placeholder="Email institucional (@ita.br)"
                      {...field}
                      className="w-full outline-none bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormControl>
                    <input
                      placeholder="Nome"
                      {...field}
                      className="w-full outline-none bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNum"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormControl>
                    <input
                      placeholder="Número de celular"
                      type="number"
                      {...field}
                      className="w-full outline-none 
                      bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Apelido (opcional)"
                        {...field}
                        className="w-full outline-none bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        placeholder="Turma"
                        {...field}
                        type="number"
                        className="w-full outline-none 
                      bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all 
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-4 ">
                  <FormControl>
                    <input
                      placeholder="Senha"
                      {...field}
                      className="w-full outline-none bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem className="my-4 ">
                  <FormControl>
                    <input
                      placeholder="Confirmar senha"
                      {...field}
                      className="w-full outline-none bg-zinc-50 p-4 border-zinc-300 rounded-sm border focus:border-secondary transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full flex text-3xl justify-center items-center p-4 text-zinc-50 bg-secondary transition-all rounded hover:brightness-110"
            >
              <strong>Criar conta</strong>
            </button>
          </form>
        </Form>
        <p className="my-2">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="underline text-zinc-500 hover:text-secondary transition-all"
          >
            Logar
          </Link>
        </p>
      </div>
    </div>
  );
}
