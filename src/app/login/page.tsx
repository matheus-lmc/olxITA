"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email({
    message: "O email deve estar em um formato válido",
  }),
  password: z.string(),
});

type FormType = z.infer<typeof formSchema>;

export default function LogInPage() {
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormType) {
    const sign = await signIn("credentials", {
      ...values,
      redirect: false
    })

    if(sign?.ok) {
      router.push("/")
    } else {
      alert("Email ou senha incorretos")
    }
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
            <h1 className="text-4xl font-bold text-primary mb-4">Logar</h1>
            <p className="font-light mb-12 w-2/3">
              Logue no site para conseguir criar e editar anúncios
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormControl>
                    <input
                      placeholder="Email"
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
              name="password"
              render={({ field }) => (
                <FormItem className="my-4 ">
                  <FormControl>
                    <input
                      placeholder="Senha"
                      type="password"
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
              <strong>Logar</strong>
            </button>
          </form>
        </Form>
        <p className="my-2">
          Ainda não tem conta?{" "}
          <Link
            href="/signup"
            className="underline text-zinc-500 hover:text-secondary transition-all"
          >
            Crie sua conta aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
