import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Plus, Search } from "lucide-react"
import { ItemForm } from "@/components/forms/ItemForm"

const array = [1, 2, 3]

export default function EditMenuPage() {
  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-medium">Meu Cardápio</h1>
        <p className="text-base text-muted-foreground">Aqui você pode editar seu cardápio</p>
      </div>

      <div className="flex flex-col gap-y-8 my-6">
        <div className="w-full h-[22rem] bg-zinc-300 rounded-md border-zinc-500 border-2 border-dashed"></div>

        <div className="w-full flex justify-between">
          <div className="relative">
            <div className="absolute top-2 left-2">
              <Search className="text-zinc-200" />
            </div>
            <Input id="search" type="text" placeholder="Pesquise um item" className="max:w-[20rem] pl-10 bg-zinc-950 placeholder:text-zinc-200 text-zinc-200" />
          </div>

          <Select>
            <SelectTrigger className="w-[180px] bg-zinc-950 text-zinc-200">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 text-zinc-200">
              <SelectItem value="light" className="focus:bg-zinc-200 focus:text-zinc-900">Light</SelectItem>
              <SelectItem value="dark" className="focus:bg-zinc-200 focus:text-zinc-900">Dark</SelectItem>
              <SelectItem value="system" className="focus:bg-zinc-200 focus:text-zinc-900">System</SelectItem>
            </SelectContent>
          </Select>

        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-3 gap-6">
          <article className="flex flex-col gap-y-2 ">
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full h-[220px] border-2 rounded-md border-dashed border-zinc-400 
                  flex flex-col items-center justify-center cursor-pointer">
                  <Plus size={52} className="text-zinc-600 text-center" />
                  <p className="muted-foreground">Adicionar um novo item</p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] bg-zinc-900 p-0 text-white border-none gap-y-4 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl flex flex-col gap-y-8 p-8 bg-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="">Adicionar item</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                      Aqui você pode adicionar item ao seu menu.
                    </DialogDescription>
                  </DialogHeader>

                  <ItemForm />

                </div>

              </DialogContent>
            </Dialog>

            <div className="flex flex-col text-zinc-900" >
              <h2 className="font-medium">Novo item</h2>
              <p className="text-sm">Adicione um novo item ao seu cardápio.</p>
            </div>
          </article>

          {array.map((item, i) => (
            <article key={i}
              className="flex flex-col gap-y-2">
              <div className="w-full h-[220px] bg-zinc-300 rounded-md">
              </div>
              <div className="flex flex-col text-zinc-900" >
                <h2 className="font-medium">Nome do prato {item}</h2>
                <p className="text-sm">Descrição simples e pequena sobre o prato.</p>
              </div>
            </article>
          ))}

        </section>
      </div>
    </main >
  )
}