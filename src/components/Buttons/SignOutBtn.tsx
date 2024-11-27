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
      onClick={handleSignOut}
      className="w-full bg-zinc-800 justify-between rounded-sm text-zinc-100 hover:bg-zinc-700"
    >
      <LogOut />
      Sair
    </Button>
  )
}