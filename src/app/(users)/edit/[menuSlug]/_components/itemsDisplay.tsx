"use client"

import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"

import Link from "next/link"

import Image from "next/image"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { BillingDialog } from "@/components/BillingDialog"

import { Plus, Search, EllipsisVertical, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { deleteImage } from "@/lib/supabase/upload"
import { deleteItem } from "@/app/(users)/actions"

interface Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  menusId: string | null
}

interface Item {
  img: string;
  id: string;
  name: string;
  slug: string | null;
  price: string;
  tags: string | null
  ingredients: string;
  description: string;
  availability: string;
  cautions: string;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    menusId: string | null
  }
}

interface ItemsDisplayProps {
  categories: Category[] | undefined
  items: Item[] | undefined
  menuSlug: string
  plan: string | number | undefined
  qtdItems: number
}

export const ItemsDisplay = ({ categories, items, menuSlug, plan, qtdItems }: ItemsDisplayProps) => {

  const [searchTerm, setSearchTerm] = useState<string | undefined>("")
  const [menuItems, setMenuItems] = useState(items)
  const [categoryId, setCategoryId] = useState<string>()
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [imgToDelete, setImgToDelete] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (items) {
      let filteredItems = items

      if (categoryId && categoryId !== "todas") {
        filteredItems = filteredItems.filter(item => item.category.id === categoryId);
      }

      if (searchTerm) {
        filteredItems = filteredItems.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      setMenuItems(filteredItems)
    }
  }, [items, categoryId, searchTerm])

  const router = useRouter()

  const onDelete: () => Promise<void> = async () => {
    setIsSubmitting(true)
    itemToDelete && await deleteItem(itemToDelete)
    setItemToDelete(null)

    const imgPath = imgToDelete && imgToDelete.split("/").pop()

    imgToDelete && await deleteImage(`${imgPath}`)
    setImgToDelete(null)

    setIsDialogOpen(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-y-8">

      <div className="w-full flex flex-col gap-4 min-[480px]:flex-row min-[480px]:justify-between">
        <div className="relative">
          <div className="absolute top-2 left-2">
            <Search className="text-zinc-400" />
          </div>
          <Input
            id="search"
            type="text"
            placeholder="Pesquise um item"
            className="max:w-[20rem] pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select onValueChange={(value) => setCategoryId(value)}>
          <SelectTrigger className="w-full min-[480px]:w-[200px]">
            <SelectValue placeholder="categoria" />
          </SelectTrigger>
          <SelectContent className="w-full ">
            <SelectItem value="todas" className="pl-2">Categorias</SelectItem>
            <SelectSeparator />
            {categories?.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="pl-2 pr-8 ">
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="flex flex-col gap-y-2">

          {plan === "pro" || plan === "free" && qtdItems < 15 ?
            (<Link href={`${menuSlug}/register-item`} >
              <div className="w-full aspect-[16/12] border-2 rounded-md border-dashed border-zinc-400 
                flex flex-col items-center justify-center cursor-pointer">
                <Plus className="size-8 sm:size-12 md:size-8 min-[880px]:size-12 text-zinc-600 text-center" />
                <p className="muted-foreground text-sm sm:text-base md:text-sm min-[880px]:text-base text-center">Adicionar um novo item</p>
              </div>
            </Link>) : (
              <BillingDialog>
                <div className="w-full aspect-[16/12] border-2 rounded-md border-dashed border-zinc-400 
                flex flex-col items-center justify-center cursor-pointer">
                  <Plus className="size-8 sm:size-12 md:size-8 min-[880px]:size-12 text-zinc-600 text-center" />
                  <p className="muted-foreground text-sm sm:text-base md:text-sm min-[880px]:text-base text-center">Adicionar um novo item</p>
                </div>
              </BillingDialog>
            )}

          <div className="flex flex-col text-zinc-900" >
            <h2 className="font-medium text-sm sm:text-base">Novo item</h2>
            <p className="text-xs sm:text-sm">Adicione um novo item ao seu cardápio.</p>
          </div>
        </article>

        {plan === "pro" && menuItems ? (
          menuItems.map((item) => (
            <article className="relative flex flex-col gap-y-2" key={item.id}>
              <DropdownMenu>
                <DropdownMenuTrigger className="z-10 absolute top-2 right-2 bg-zinc-100 rounded-full p-1">
                  <EllipsisVertical size={18} className="text-zinc-800" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => {
                      setItemToDelete(item.id)
                      setImgToDelete(item.img)
                      setIsDialogOpen(true)
                    }}
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={`${menuSlug}/${item.slug}`} >
                <div className="relative w-full aspect-[16/12] rounded-md overflow-hidden">
                  <Image src={item.img} fill className="object-cover" alt={`imagem do item ${item.name}`} />
                </div>
              </Link>

              <div className="flex flex-col text-zinc-900">
                <h2 className="font-medium text-sm sm:text-base">{item.name}</h2>
                <p className="text-xs sm:text-sm line-clamp-2">{item.description}</p>
              </div>
            </article>
          ))
        ) : (
          menuItems && menuItems.slice(0, 15).map((item) => (

            <article className="relative flex flex-col gap-y-2" key={item.id}>
              <DropdownMenu>
                <DropdownMenuTrigger className="z-10 absolute top-2 right-2 bg-zinc-100 rounded-full p-1">
                  <EllipsisVertical size={18} className="text-zinc-800" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => {
                      setItemToDelete(item.id)
                      setImgToDelete(item.img)
                      setIsDialogOpen(true)
                    }}
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href={`${menuSlug}/${item.slug}`}>
                <div className="relative w-full aspect-[16/12] rounded-md overflow-hidden">
                  <Image src={item.img} fill className="object-cover" alt={`imagem do item ${item.name}`} />
                </div>
              </Link>

              <div className="flex flex-col text-zinc-900">
                <h2 className="font-medium text-sm sm:text-base">{item.name}</h2>
                <p className="text-xs sm:text-sm line-clamp-2">{item.description}</p>
              </div>
            </article>
          ))
        )}
      </section>

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
    </div>
  )
}