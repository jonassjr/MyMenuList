
import { Label } from "../ui/label"

import { Input } from "../ui/input"

import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import { Textarea } from "../ui/textarea"
import { TagInput } from "../../app/(users)/edit/[menuId]/_components/TagInput";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"


import { IngredientInput } from "../../app/(users)/edit/[menuId]/_components/IngredientInput";
import { FileUploader } from "../../app/(users)/edit/[menuId]/_components/ItemImgUploader";
import { Save } from "lucide-react";


export const ItemForm = () => {

  return (
    <form action="" className="flex flex-col gap-y-8">

      <section className="">
        <FileUploader />
      </section>

      <section className="w-full grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="item" className="text-zinc-200">Item</Label>
          <Input
            id="item"
            name="item"
            type="text"
            placeholder="Fettuccine com batata duchesse"
            className="bg-zinc-800 ring-offset-zinc-800 focus-visible:ring-zinc-300 placeholder:text-zinc-400" />
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
              className="bg-zinc-800 ring-offset-zinc-800 focus-visible:ring-zinc-300 placeholder:text-zinc-400 pl-8" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="price" className="text-zinc-200">Categoria</Label>
          <Select>
            <SelectTrigger className="bg-zinc-800 text-zinc-200 ring-offset-zinc-800 focus:ring-zinc-300 data-[placeholder]:text-zinc-400">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-zinc-200 ">
              <SelectItem value="entradas" className="focus:bg-zinc-200 ">Entradas</SelectItem>
              <SelectItem value="prato-principal" className="focus:bg-zinc-200 ">Pratos Principais</SelectItem>
              <SelectItem value="acompanhamento" className="focus:bg-zinc-200 ">Acompanhamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="price" className="text-zinc-200 ">Disponibilidade</Label>
          <Select>
            <SelectTrigger className="bg-zinc-800 text-zinc-200
             ring-offset-zinc-800 focus:ring-zinc-300 data-[placeholder]:text-zinc-400" >
              <SelectValue placeholder="selecione uma disponibilidade" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-zinc-200">
              <SelectItem value="disponivel" className="focus:bg-zinc-200">Disponível</SelectItem>
              <SelectItem value="indisponivel" className="focus:bg-zinc-200">Idisponível</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="ingredients" className="text-zinc-200">Ingredientes</Label>
          <IngredientInput />
        </div>
      </section>

      <section className="w-full grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="descrição" className="text-zinc-200">Descrição</Label>
          <Textarea
            className="bg-zinc-800 placeholder:text-zinc-400 ring-offset-zinc-800 focus-visible:ring-zinc-300"
            placeholder="Adicione uma descrição ao seu produto" />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="aditional-info" className="text-zinc-200">Informações adicionais</Label>
          <Textarea
            id="aditional-info"
            className="bg-zinc-800 placeholder:text-zinc-400 ring-offset-zinc-800 focus-visible:ring-zinc-300"
            placeholder="Pode conter traços de nozes" />
        </div>
      </section>

      <section>
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="tags" className="text-zinc-200">Tags</Label>
          <TagInput />
        </div>
      </section>

      <Button variant={"secondary"} className="w-fit self-end gap-2 text-md font-semibold ring-offset-zinc-800 focus-visible:ring-zinc-300">
        Salvar
        <Save className="text-zinc-800" />
      </Button>
    </form>
  )
}