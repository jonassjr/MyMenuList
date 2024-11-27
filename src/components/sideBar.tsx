"use client"

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Logo-v1.svg"
import { usePathname } from "next/navigation";

import { CircleArrowUp, LayoutDashboardIcon, Settings, CircleUser, CircleHelp, Home, X } from "lucide-react";
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
import { useContext } from "react";
import { SideBarContext } from "@/contexts/SideBarContext";

type UserData = {
  user: Session["user"] | undefined
}

export const SideBar = ({ user }: UserData) => {
  const pathName = usePathname()

  const { toggle, HandleSetToggle } = useContext(SideBarContext)

  return (
    <aside
      className={`fixed md:left-0 h-screen top-0 bottom-0 transition-all duration-300 ease-in-out w-full max-w-64 bg-zinc-800
      flex flex-col z-10 shadow-2xl md:shadow ${toggle ? "left-0" : "-left-full"}`}>
      <header className="flex justify-between px-4 items-center md:grid place-content-center py-4">
        <Link href={"/"}>
          <Image src={Logo} width={145} alt="MyMenuList logo image" />
        </Link>
        <div
          className="block md:hidden"
          onClick={HandleSetToggle}
        >
          <X className="text-zinc-100" />
        </div>
      </header>
      <section className="mb-4 px-2 h-full flex flex-col justify-between">
        <div className="pt-8 flex flex-col gap-y-2 border-t">
          <Link href={"/home"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/home" ? "bg-white text-zinc-800 hover:bg-white" : "hover:bg-zinc-700"}`}>
            <Home />
            Home
          </Link>
          <Link href={"/settings"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/settings" ? "bg-white text-zinc-800 hover:bg-white" : "hover:bg-zinc-700"}`}>
            <Settings />
            Configurações
          </Link>
          <Link href={"/billing"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/billing" ? "bg-white text-zinc-800 hover:bg-white" : "hover:bg-zinc-700"}`}>
            <CircleArrowUp />
            Assinatura
          </Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <Link href={"/support"}
            className={` w-full flex gap-x-4 text-white items-center text-sm font-medium px-4 py-2 transition-colors duration-300
            rounded-md  ${pathName === "/support" ? "bg-white text-zinc-800 hover:bg-white" : "hover:bg-zinc-700"}`}>
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