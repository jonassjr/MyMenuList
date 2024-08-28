import Link from "next/link"

import { getUserMenus } from "../actions"
import { MenuUpsertSheet } from "./_components/Menu-upsert-sheet"
import { Button } from "@/components/ui/button"
import { EllipsisVertical } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuBook } from "./_components/MenuBook"

export default async function Home() {

  const menus = await getUserMenus()

  return (
    <main className="">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-medium">Meus Cardápios</h1>
          <p className="text-base text-muted-foreground">Aqui você poder ver seus cardápios!</p>
        </div>

        <MenuUpsertSheet>
          <Button>Novo cardápio</Button>
        </MenuUpsertSheet>

      </header>

      <section className="my-10 flex flex-wrap gap-16">

        {!menus.length ? (
          <div className="w-full pt-8 border-t border-border text-muted-foreground">
            <p className="max-w-md"> Você não possui cardápios adicione um menu e edite-o conforme desejar</p>
          </div>
        ) : (
          menus.map((menu, i) => (
            // <Link href={`/edit/${menu.slug}`} key={menu.id}>
            <MenuBook menuData={menu} index={i} key={menu.id} />
            // </Link>
          ))
        )}
      </section>
    </main>
  )
}