"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "../../../../public/Google.svg"
import { signIn } from "next-auth/react"

export default function LogIn() {

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/home" })
  }

  return (
    <main className="w-full h-screen flex justify-center items-center ">
      <article className="w-full flex flex-col gap-y-8  max-w-md p-4 border rounded-lg shadow">
        <div className="text-zinc-800 text-center">
          <h1 className="text-lg font-semibold">Bem vindo de volta</h1>
          <p className="text-base">Acesse sua conta</p>
        </div>

        <hr />

        <div className="flex flex-col gap-y-4">

          <Button
            onClick={handleSignIn}
            variant={"outline"}
            className="gap-x-4">
            <Image src={GoogleIcon} width={28} height={28} alt="google icon" />
            Entrar com o Google
          </Button>

        </div>
      </article>
    </main>
  )
}