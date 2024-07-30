"use client"

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/MyMenuList-Logo.svg"
import { usePathname } from "next/navigation";

import { CircleArrowUp, LayoutDashboardIcon, Settings, CircleUser, CircleHelp, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"

import { SignOutBtn } from "./Buttons/SignOutBtn";
import { Session } from "next-auth";

type UserData = {
  user: Session["user"]
}

export const SideBar = ({ user }: UserData) => {
  const pathName = usePathname()

  return (
    <aside className="w-full fixed top-0 bottom-0 max-w-64 bg-zinc-800 flex flex-col">
      <header className="grid place-content-center py-4">
        <Link href={"/"} >
          <Image src={Logo} width={155} alt="MyMenuList logo image" />
        </Link>
      </header>
      <section className="mb-4 px-2 h-full flex flex-col justify-between">
        <div className="pt-8 flex flex-col gap-y-2 border-t">
          <Link href={"/home"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/home" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : "hover:bg-zinc-700"}`}>
            <Home />
            Home
          </Link>
          <Link href={"/dashboard"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/dashboard" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : "hover:bg-zinc-700"}`}>
            <LayoutDashboardIcon />
            Dashboard
          </Link>
          <Link href={"/settings"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/settings" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : "hover:bg-zinc-700"}`}>
            <Settings />
            Settings
          </Link>
          <Link href={"/upgrade"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/upgrade" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : "hover:bg-zinc-700"}`}>
            <CircleArrowUp />
            Upgrade
          </Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <Link href={"/help"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/help" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : "hover:bg-zinc-700"}`}>
            <CircleHelp />
            Suporte
          </Link>

          <hr />
          <DropdownMenu>
            <DropdownMenuTrigger
              className="w-full flex px-4 py-2 gap-x-4 items-center text-white hover:bg-zinc-700 rounded-md">
              <Avatar className="w-fit h-fit">
                <AvatarImage src={user?.image ?? undefined} alt="profile image" className="w-6 h-6" />
                <AvatarFallback className="bg-transparent">
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
              <span className="w-fit font-regular text-sm truncate">
                {user?.email}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={2} className="w-[15rem] bg-zinc-800">
              <DropdownMenuItem className="p-0 ">
                <SignOutBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </aside>
  )
}