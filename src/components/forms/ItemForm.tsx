import { Label } from "../ui/label"

import { Input } from "../ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import { Textarea } from "../ui/textarea"

export const ItemForm = () => {
  return (
    <form action="" className="flex flex-col gap-y-8">
      <section className="w-full grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="item" className="text-zinc-200">Item</Label>
          <Input
            id="item"
            name="item"
            type="text"
            placeholder="Fettuccine com batata duchesse"
            className="bg-zinc-900 ring-offset-zinc-900 focus-visible:ring-zinc-300 placeholder:text-zinc-400" />
        </div>
        <div className=" w-full flex flex-col gap-y-2">
          <Label htmlFor="price" className="text-zinc-200">Preço</Label>
          <div className="relative">
            <span className="absolute top-[0.66rem] left-2 text-sm text-zinc-400">R$</span>
            <Input
              id="price"
              name="price"
              type="text"
              placeholder="0,00"
              className="bg-zinc-900 ring-offset-zinc-900 focus-visible:ring-zinc-300 placeholder:text-zinc-400 pl-8" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="price" className="text-zinc-200">Categoria</Label>
          <Select>
            <SelectTrigger className="bg-zinc-900 text-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-zinc-200">
              <SelectItem value="entradas" className="focus:bg-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">Entradas</SelectItem>
              <SelectItem value="prato-principal" className="focus:bg-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">Pratos Principais</SelectItem>
              <SelectItem value="acompanhamento" className="focus:bg-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">Acompanhamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="price" className="text-zinc-200 ">Disponibilidade</Label>
          <Select>
            <SelectTrigger className="bg-zinc-900 text-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-zinc-200">
              <SelectItem value="disponivel" className="focus:bg-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">Disponível</SelectItem>
              <SelectItem value="indisponivel" className="focus:bg-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">Idisponível</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="descrição" className="text-zinc-200">Descrição</Label>
          <Textarea
            className="bg-zinc-900 placeholder:text-zinc-400 ring-offset-zinc-900 focus-visible:ring-zinc-300"
            placeholder="Adicione uma descrição ao seu produto" />
        </div>
      </section>

      <section className="w-full grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="time" className="text-zinc-200">Preparação</Label>
          <Input
            id="time"
            name="time"
            type="text"
            placeholder="34 min"
            className="bg-zinc-900 ring-offset-zinc-900 focus-visible:ring-zinc-300 placeholder:text-zinc-400" />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="tags" className="text-zinc-200">Tags</Label>
          <Select>
            <SelectTrigger className="bg-zinc-900 text-zinc-200 focus-visible:ring-zinc-300 ring-offset-zinc-900">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-zinc-200">
              <SelectItem value="entradas" className="focus:bg-zinc-200 focus:text-zinc-900">Entradas</SelectItem>
              <SelectItem value="prato-principal" className="focus:bg-zinc-200 focus:text-zinc-900">Pratos Principais</SelectItem>
              <SelectItem value="acompanhamento" className="focus:bg-zinc-200 focus:text-zinc-900">Acompanhamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="ingredients" className="text-zinc-200">Ingredientes</Label>
          <Input
            id="ingredients"
            name="time"
            type="text"
            placeholder="Ingredients"
            className="bg-zinc-900 ring-offset-zinc-900 focus-visible:ring-zinc-300 placeholder:text-zinc-400" />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="info" className="text-zinc-200">informações nutricionais</Label>
          <Input
            id="info"
            name="time"
            type="text"
            placeholder="info"
            className="bg-zinc-900 ring-offset-zinc-900 focus-visible:ring-zinc-300 placeholder:text-zinc-400" />
        </div>
      </section>

      <section>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="aditional-info" className="text-zinc-200">Informações adicionais</Label>
          <Textarea
            id="aditional-info"
            className="bg-zinc-900 placeholder:text-zinc-400 ring-offset-zinc-900 focus-visible:ring-zinc-300"
            placeholder="Pode conter traços de nozes" />
        </div>
      </section>
    </form>
  )
}