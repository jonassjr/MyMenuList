"use client"

import { Input } from "@/components/ui/input"

import { Plus, Search } from "lucide-react"

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
import { useEffect, useState } from "react"

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
  tags: string;
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
}

export const ItemsDisplay = ({ categories, items, menuSlug }: ItemsDisplayProps) => {

  const [searchTerm, setSearchTerm] = useState<string | undefined>("")
  const [menuItems, setMenuItems] = useState(items)
  const [categoryId, setCategoryId] = useState<string>()

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

  return (
    <div className="flex flex-col gap-y-8">
      <div className="w-full flex justify-between">
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
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="categoria" />
          </SelectTrigger>
          <SelectContent className="w-[200px] ">
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

      <section className="grid grid-cols-1 sm:grid-cols-2 min-[1200px]:grid-cols-3 gap-6">
        <article className="flex flex-col gap-y-2 ">

          <Link href={`${menuSlug}/register-item`} >
            <div className="w-full h-[220px] border-2 rounded-md border-dashed border-zinc-400 
                flex flex-col items-center justify-center cursor-pointer">
              <Plus size={52} className="text-zinc-600 text-center" />
              <p className="muted-foreground">Adicionar um novo item</p>
            </div>
          </Link>

          <div className="flex flex-col text-zinc-900" >
            <h2 className="font-medium">Novo item</h2>
            <p className="text-sm">Adicione um novo item ao seu cardápio.</p>
          </div>
        </article>

        {menuItems && menuItems.map((item) => (
          <article className="flex flex-col gap-y-2" key={item.id}>
            <Link href={`${menuSlug}/${item.slug}`} >
              <div className="relative w-full h-[220px] bg-zinc-300 rounded-md overflow-hidden">
                <Image src={item.img} fill className="object-cover" alt={`imagem do item ${item.name}`} />
              </div>
            </Link>

            <div className="flex flex-col text-zinc-900">
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-sm">{item.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}