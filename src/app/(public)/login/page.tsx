"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "../../../../public/Google.svg"
import { signIn } from "next-auth/react"

import Logo from "../../../../public/Logo-v1.svg"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/registry/new-york/ui/button"
// import { UserAuthForm } from "@/app/(app)/examples/authentication/components/user-auth-form"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

export default function LogIn() {

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/home" })
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src={Logo} alt={"Meu Menu Logo"} />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Acesse seu painel e transforme a experiência dos seus
              clientes com cardápios digitais únicos. Vamos começar?&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Bem vindo de Volta
            </h1>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Continue com
                </span>
              </div>
            </div>

            <Button
              onClick={handleSignIn}
              variant={"outline"}
              className="gap-x-4">
              <Image src={GoogleIcon} width={28} height={28} alt="google icon" />
              Google
            </Button>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Não possue conta cadastre-se facialmente clicando{" "}
            <Button
              onClick={handleSignIn}
              variant={"link"}
              className="px-0 underline underline-offset-4 hover:text-primary"
            >
              Aqui
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}