import Link from "next/link";

import { getUserMenus } from "../actions";
import { MenuUpsertSheet } from "./_components/Menu-upsert-sheet";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

export default async function Dashboard() {

  const menus = await getUserMenus()

  return (
    <main className="">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-medium">Meus Cardápios</h1>
          <p className="text-base text-muted-foreground">Aqui você poder ver seus cardápios!</p>
        </div>

        <MenuUpsertSheet  >
          <Button>Novo cardápio</Button>
        </MenuUpsertSheet>

      </header>

      <section className="my-10 flex flex-wrap gap-16">

        {!menus.length ? (
          <div className="w-full pt-8 border-t border-zinc-600 text-muted-foreground">
            <p className="max-w-md"> Você não possui cardápios adicione um menu e edite-o conforme desejar</p>
          </div>
        ) : (
          menus.map((menu, i) => (
            <Link href="#" key={menu.id}>
              <article className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-700">
                <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
                <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
                  {i + 1}
                </span>

                {/* <div className="opacity-0 group-hover:opacity-100 absolute transition-colors duration-300 right-2 top-2">
                  <div className="">
                    <Edit2 className="text-zinc-400" />
                  </div>
                </div> */}

                <p className="text-zinc-100 absolute bottom-2 left-2">{menu.title}</p>
              </article>
            </Link>
          ))

        )}
      </section>
    </main>
  )
}