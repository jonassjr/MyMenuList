"use client"

import { SideBar } from "@/components/sideBar"
import Image from "next/image"
import { CircleUser, LogOut, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UsersLayout({ children }: { children: React.ReactNode }) {

  return (
    <main className="flex min-h-screen bg-zinc-200">
      <SideBar />

      <section className="ml-64 w-full mx-auto min-h-full flex flex-col">
        <header className="sticky top-0 flex justify-end w-full py-4 px-6 bg-zinc-200 border-b border-zinc-800">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex py-2 px-4 rounded gap-x-4 bg-primary text-white">
                <Menu />
                <CircleUser />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuItem className="justify-between text-zinc-800">
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>

            </DropdownMenu>
          </div>
        </header>
        <section className="mt-10 px-6">
          {children}
        </section>
      </section>
    </main>
  )
}