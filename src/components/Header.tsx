"use client"

import { SideBarContext } from "@/contexts/SideBarContext"
import { Home, Menu } from "lucide-react"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { useContext } from "react"

export const Header = () => {
  const pathName = usePathname()

  const { HandleSetToggle } = useContext(SideBarContext)

  return (
    <header className="sticky top-0 flex w-full py-6 bg-white border-b border-border z-20">

      <div className="block md:hidden "
        onClick={HandleSetToggle}
      >
        <Menu className="text-zinc-700 hover:text-zinc-00" />
      </div>

      <div className="hidden md:block">
        <Link href="/home">
          <Home className="text-zinc-700 hover:text-zinc-00" />
        </Link>
      </div>
    </header>
  )
}