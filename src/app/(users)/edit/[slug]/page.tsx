
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Plus, Search } from "lucide-react"

import Link from "next/link"
import { getMenuData } from "../../actions"
import { CoverImgUploader } from "./_components/coverImgUploader"

const array = [1, 2, 3]

interface MenuProps {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export default async function EditMenuPage({ params }: { params: { slug: string } }) {

  const { slug } = params

  const menu = await getMenuData(slug)

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-medium">{menu?.title}</h1>
        <p className="text-base text-muted-foreground">Aqui você pode editar seu cardápio</p>
      </div>

      <div className="flex flex-col gap-y-8 my-6">
        <div className="">
          {menu && <CoverImgUploader menuId={menu?.id} initialCoverImg={menu.coverImg ?? undefined} />}
        </div>

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
          <Link href={`${slug}/register-item`} className="flex flex-col gap-y-2 ">
            <div className="w-full h-[220px] border-2 rounded-md border-dashed border-zinc-400 
              flex flex-col items-center justify-center cursor-pointer">
              <Plus size={52} className="text-zinc-600 text-center" />
              <p className="muted-foreground">Adicionar um novo item</p>
            </div>

            <div className="flex flex-col text-zinc-900" >
              <h2 className="font-medium">Novo item</h2>
              <p className="text-sm">Adicione um novo item ao seu cardápio.</p>
            </div>
          </Link>

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
      </div >
    </main >
  )
}