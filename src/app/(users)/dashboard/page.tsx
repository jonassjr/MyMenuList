import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <main className="">
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-medium">Meus Cardápios</h1>
          <p className="text-base text-muted-foreground">Aqui você poder ver seus cardápios!</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Cardápio</Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 text-white border-none gap-y-6" >
            <DialogHeader>
              <DialogTitle className="text-zinc-200">Criar um novo cardápio</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Escolha um nome que descreva bem o seu cardápio. Este nome será
                utilizado para identificar o cardápio de forma única.
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="title" className="text-zinc-200">Nome do Cardápio</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Menu Principal"
                  className="bg-zinc-900 ring-offset-zinc-900 focus-visible:ring-zinc-400 placeholder:text-zinc-400" />
              </div>
              <Button variant="secondary" className="w-fit self-end ring-offset-zinc-900 focus-visible:ring-zinc-400">Salvar</Button>
            </form>
          </DialogContent>
        </Dialog>

      </header>

      <section className="my-10 flex flex-wrap gap-16">
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