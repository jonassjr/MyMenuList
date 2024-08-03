
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "@/components/TagInput"
import { Button } from "@/components/ui/button"

import { IngredientInput } from "@/components/IngredientInput"
import { FileUploader } from "@/components/FileUploader"
import { SelectCategory } from "./_components/SelectCategory"
import { usePathname } from "next/navigation"
import { getMenuData } from "@/app/(users)/actions"

export default async function RegisterItem({ params }: { params: { slug: string } }) {

  const { slug } = params

  const menu = await getMenuData(slug)

  return (
    <main className="">
      <header>
        <h2>Registrar Novo item</h2>
      </header>
      <form action="" className="flex flex-col gap-y-8 my-8">

        <section className="">
          <FileUploader />
        </section>

        <section className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="item" >Nome</Label>
            <Input
              id="nome"
              name="nome"
              type="text"
              placeholder="Fettuccine com batata duchesse"
            />
          </div>

          <div className=" w-full flex flex-col gap-y-2">
            <Label htmlFor="price" >Preço</Label>
            <div className="relative">
              <span className="absolute top-[0.66rem] left-2 text-sm text-zinc-400">R$</span>
              <Input
                id="price"
                name="price"
                type="text"
                placeholder="0,00"
                className="pl-8 "
              />
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <div className="w-full flex flex-col gap-y-2">
              <Label>Categoria</Label>
              {menu && <SelectCategory menuId={menu?.slug} />}
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="price" >Disponibilidade</Label>
            <Select>
              <SelectTrigger >
                <SelectValue placeholder="selecione uma disponibilidade" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="disponivel" >Disponível</SelectItem>
                <SelectItem value="indisponivel" >Idisponível</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section>
          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="ingredients" >Ingredientes</Label>
            <IngredientInput />
          </div>
        </section>

        <section className="w-full grid grid-cols-2 gap-4">
          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="descrição" >Descrição</Label>
            <Textarea
              placeholder="Adicione uma descrição ao seu produto"
            />
          </div>

          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="aditional-info" >Informações adicionais</Label>
            <Textarea
              id="aditional-info"
              placeholder="Pode conter traços de nozes" />
          </div>
        </section>

        <section>
          <div className="w-full flex flex-col gap-y-2">
            <Label htmlFor="tags" >Tags</Label>
            <TagInput />
          </div>
        </section>

        <Button className="w-fit self-end gap-2 text-md font-semibold ">
          Salvar
        </Button>
      </form>
    </main >
  )
}