import { getUserMenus } from "../actions"
import { MenuUpsertSheet } from "./_components/Menu-upsert-sheet"
import { Button } from "@/components/ui/button"

import { MenuBook } from "@/app/(users)/home/_components/MenuBook"
import { PlusCircle } from "lucide-react"

export default async function Home() {

  const menus = await getUserMenus()

  return (
    <main className="">
      <header className="flex items-center gap-x-4 justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl sm:text-4xl font-medium">Meus Cardápios</h1>
          <p className="text-base text-muted-foreground">Aqui você poder ver seus cardápios!</p>
        </div>

        <MenuUpsertSheet>
          <Button className="h-10 w-10 p-0 sm:w-full sm:px-4 sm:py-2">
            <PlusCircle className="block sm:hidden" />
            <p className="hidden sm:block">
              Novo cardápio
            </p>
          </Button>
        </MenuUpsertSheet>

      </header>

      <section className="my-10 flex flex-wrap gap-16">

        {!menus.length ? (
          <div className="w-full pt-8 border-t border-border text-muted-foreground">
            <p className="max-w-md"> Você não possui cardápios adicione um menu e edite-o conforme desejar</p>
          </div>
        ) : (
          menus.map((menu, i) => (
            <MenuBook menuData={menu} index={i} key={menu.id} />
          ))
        )}
      </section>
    </main>
  )
}