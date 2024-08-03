"use client"

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react"

import { useEffect, useState } from "react"
import { NewCategoryDialog } from "./NewCategoryDialog"
import { GetCategories } from "@/app/(users)/actions"

interface FormValues {
  category: string
}

interface CategoriesProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  menusId: string | null
}

interface SelectCategoryProps {
  menuId: string;
}

// const categories = [{ id: 1, name: "bebidas" }, { id: 2, name: "Saladas" }, { id: 3, name: "Churrasco" },]
export const SelectCategory = ({ menuId }: SelectCategoryProps) => {

  const [selectCategory, setSelectCategory] = useState<string>("")
  const [categories, setCategories] = useState<CategoriesProps[] | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await GetCategories(menuId)
      setCategories(categories)
    }

    fetchCategories()
  }, [])

  return (

    <Dialog>
      <Popover >
        <PopoverTrigger asChild className="w-full">

          <Button variant={"outline"} role="combobox" className={`justify-between w-full font-normal text-muted-foreground ${selectCategory && "text-zinc-900"}`}>
            {selectCategory !== "" ? selectCategory : "Categoria"}
            <ChevronsUpDown size={16} />
          </Button>

        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
          <Command className="w-full">
            <CommandList className="w-full">
              <CommandInput placeholder="Busque por uma categoria" />
              <CommandEmpty>Não há categorias</CommandEmpty>
              <CommandGroup heading="Categorias">
                {categories && categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      setSelectCategory(category.name)
                    }}
                  >
                    {category.name}
                    <CheckIcon
                      size={16}
                      className={`ml-auto
                      ${selectCategory === "Bebidas"
                          ? "opacity-100"
                          : "opacity-0"}`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <Button variant={"outline"} className="w-full gap-x-2 items-center text-muted-foreground">
                    <PlusCircle size={18} />
                    Criar Categoria
                  </Button>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <NewCategoryDialog />
    </Dialog >
  )
}