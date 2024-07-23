import { CircleUser, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"

import { auth } from "@/services/auth"

import { SignOutBtn } from "./Buttons/SignOutBtn"

export const Header = async () => {

  const session = await auth()
  const userImage = session?.user?.image ?? undefined;

  return (
    <header className="sticky top-0 flex justify-end w-full py-4 px-6 bg-zinc-200 border-b border-zinc-800 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex py-2 px-4 rounded gap-x-4 bg-primary text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-300">
          <Menu size={28} />
          <Avatar className="w-7 h-7">
            <AvatarImage src={userImage} alt="profile image" />
            <AvatarFallback className="bg-transparent"><CircleUser size={28} /></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuItem className="p-0">
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
    </header >
  )
}