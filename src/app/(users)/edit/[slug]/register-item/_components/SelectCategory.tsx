"use client"

import { useRouter } from "next/navigation"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { CheckIcon, ChevronsUpDown, LoaderCircle, PlusCircle } from "lucide-react"

import { useEffect, useState } from "react"
import { CreateCategory, GetCategories } from "@/app/(users)/actions"

import { SubmitHandler, useForm } from "react-hook-form"

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

export const SelectCategory = ({ menuId }: SelectCategoryProps) => {

  const router = useRouter()

  const { register, handleSubmit, reset, setError, formState: { isSubmitting, isSubmitted, errors } } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { category } = data

    try {
      await CreateCategory(category, menuId)
      reset()
      router.refresh()

    } catch (error) {
      if (error instanceof Error) {
        setError("category", { type: "manual", message: error.message })
      }
    }
  }

  const [selectCategory, setSelectCategory] = useState<string>("")
  const [categories, setCategories] = useState<CategoriesProps[] | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await GetCategories(menuId)
      setCategories(categories)
    }

    fetchCategories()
  }, [isSubmitted])

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
                      ${selectCategory === category.name
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
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Adicionar Categoria?</DialogTitle>
          <DialogDescription>
            Crie uma nova cateogoria que melhor se encaixa na descrição do seu item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="category" className="">Nome da Categoria</Label>
            <Input
              id="category"
              type="text"
              placeholder="Menu Principal"
              {...register("category")}
            />
            {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}

          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed "
          >
            {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog >
  )
}