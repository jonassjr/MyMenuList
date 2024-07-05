import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-medium">Meus Cardápios</h1>
          <p className="text-base text-muted-foreground">Aqui você poder ver seus cardápios!</p>
        </div>

        <Button>Novo Cardápio</Button>
      </header>

      <section className="mt-10 flex flex-wrap gap-16">
        <Link href="#">
          <article className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-700">
            <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
            <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
              01
            </span>
            <p className="text-zinc-100 absolute bottom-2 left-2">Meu cardápio</p>
          </article>
        </Link>
        <Link href="#">
          <article className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-700">
            <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
            <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
              01
            </span>
            <p className="text-zinc-100 absolute bottom-2 left-2">Meu cardápio</p>
          </article>
        </Link>
        <Link href="#">
          <article className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-700">
            <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
            <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
              01
            </span>
            <p className="text-zinc-100 absolute bottom-2 left-2">Meu cardápio</p>
          </article>
        </Link>
        <Link href="#">
          <article className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-700">
            <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
            <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
              01
            </span>
            <p className="text-zinc-100 absolute bottom-2 left-2">Meu cardápio</p>
          </article>
        </Link>
        <Link href="#">
          <article className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-700">
            <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
            <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
              01
            </span>
            <p className="text-zinc-100 absolute bottom-2 left-2">Meu cardápio</p>
          </article>
        </Link>
      </section>
    </main>
  )
}