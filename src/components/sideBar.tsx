"use client"

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/MyMenuList-Logo.svg"
import { CircleArrowUp, LayoutDashboardIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathName = usePathname()

  return (
    <aside className="fixed top-0 bottom-0 min-w-64 bg-zinc-800 flex flex-col">
      <header className="grid place-content-center py-4 border-b">
        <Link href={"/"} >
          <Image src={Logo} width={165} alt="MyMenuList logo image" />
        </Link>
      </header>
      <section className="mt-14 mb-4 px-2 h-full flex flex-col justify-between">
        <div className="flex flex-col gap-y-2">
          <Link href={"/dashboard"} className="group w-full">
            <Button
              className={`w-full justify-start items-center gap-x-4 text-white transition-colors duration-300
              bg-zinc-800 hover:bg-zinc-700 ${pathName === "/dashboard" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : ""}`}>
              <LayoutDashboardIcon />
              Dashboard
            </Button>
          </Link>
          <Link href={"/settings"} className="group w-full">
            <Button
              className={`w-full justify-start items-center gap-x-4 text-white transition-colors duration-300
                  bg-zinc-800 hover:bg-zinc-700 ${pathName === "/settings" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : ""}`}>
              <Settings />
              Configurações
            </Button>
          </Link>
        </div>
        <div>
          <Link href={"/upgrade"} className="group w-full">
            <Button
              className={`w-full justify-start items-center gap-x-4 text-white transition-colors duration-300
                  bg-zinc-800 hover:bg-zinc-700 ${pathName === "/upgrade" ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-200" : ""}`}>
              <CircleArrowUp />
              Upgrade
            </Button>
          </Link>
        </div>
      </section>
    </aside>
  )
}