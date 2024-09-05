"use client"

import { EllipsisVertical } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useState } from "react"
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { LoaderCircle } from "lucide-react";

interface MenuBookProps {
  menuData: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    coverImg: string | null;
  }
  index: number
}

import { upsertMenu } from "../../schema";
import Link from "next/link";
import { deleteMenu, updateMenu } from "../../actions";

type FormValues = z.infer<typeof upsertMenu>

export const MenuBook = ({ menuData, index }: MenuBookProps) => {

  const { title, id, slug } = menuData

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      title: title,
    },
    resolver: zodResolver(upsertMenu)
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FormValues> = (async (data) => {
    await updateMenu(data, id)
    router.refresh()
    setIsSheetOpen(false)
  })

  const onDelete: () => Promise<void> = async () => {
    await deleteMenu(id)
    router.refresh()
  }

  return (
    <article className="relative">
      <Link href={`/edit/${slug}`}>
        <div className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-800/95">
          <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
          <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
            {index + 1}
          </span>
          <p className="text-zinc-100 absolute bottom-2 left-2">{title}</p>
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-2 hover:bg-zinc-700 rounded-full p-1">
          <EllipsisVertical size={18} className="text-zinc-200" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              setIsSheetOpen(true)
            }}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDialogOpen(true)
            }}
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar cardápio?</SheetTitle>
            <SheetDescription>
              Altere o nome do seu cardápio.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="title" className="">Nome do Cardápio</Label>
              <Input
                id="title"
                type="text"
                placeholder="Menu Principal"
                {...register("title")}
              />
              {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
            >
              {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
            <DialogDescription>
              Esta ação não poderá ser desfeita, ao clicar em exlcuir isto irá remover
              os dados do seu menu de nossos servidores.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={onDelete}
            disabled={isSubmitting}
            className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
          >
            {isSubmitting ? <><LoaderCircle className="animate-spin" /> Excluindo</> : 'Excluir'}
          </Button>
        </DialogContent>
      </Dialog>
    </article>
  )
}