"use client"

import { CreateCategory } from "@/app/(users)/actions"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, ChevronsUpDown, LoaderCircle, PlusCircle } from "lucide-react"

import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"

interface FormValues {
  category: string
}

export const NewCategoryDialog = () => {

  const [selectCategory, setSelectCategory] = useState<string>("")

  const { register, handleSubmit, reset, setError, formState: { isSubmitting, errors } } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { category } = data

    try {
      await CreateCategory(category)

    } catch (error) {
      if (error instanceof Error) {
        setError("category", { type: "manual", message: error.message })
      }
    }
  }


  return (

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
          className="w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed "
        >
          {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
        </Button>
      </form>
    </DialogContent>



    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger asChild>
    //     <div ref={ref} onClick={() => setOpen(true)}>
    //       {children}
    //     </div>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle >Adicionar Categoria</DialogTitle>
    //       <DialogDescription>
    //         Aqui você pode criar uma nova cateogoria.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-y-4">
    //       <div className="flex flex-col gap-y-3">
    //         <Label htmlFor="category" className="">Categoria</Label>
    //         <Input
    //           id="category"
    //           type="text"
    //           placeholder="Menu Principal"
    //           {...register("category")}
    //         />
    //         {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}
    //       </div>
    //       <Button
    //         type="submit"
    //         disabled={isSubmitting}
    //         className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
    //       >
    //         {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
    //       </Button>
    //     </form>
    //   </DialogContent>
    // </Dialog>
  )
}