"use client"

import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export const SignOutBtn = () => {

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Button
      variant={"secondary"}
      onClick={handleSignOut}
      className="w-full bg-transparent justify-between text-zinc-800"
    >
      <LogOut />
      Sair
    </Button>
  )
}