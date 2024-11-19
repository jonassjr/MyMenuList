"use client"

import { Input } from "@/components/ui/input"

import { Search } from "lucide-react"

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
  menuSlug: string | undefined
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

      <section className="grid grid-cols-1 min-[375px]:grid-cols-3 lg:grid-cols-4 gap-6">

        {menuItems && menuItems.map((item) => (
          <article className="flex flex-col gap-y-2" key={item.id}>
            <Link href={`${menuSlug}/${item.slug}`}>
              <div className="relative w-full aspect-[16/12] bg-zinc-300 rounded-md overflow-hidden">
                <Image src={item.img} fill className="object-cover" alt={`imagem do item ${item.name}`} />
              </div>
            </Link>

            <div className="flex flex-col text-zinc-900">
              <div className="flex gap-y-1 justify-between">
                <h2 className="font-medium text-sm sm:text-base">{item.name}</h2>
                <span
                  className="text-zinc-800 grid place-content-center bg-border rounded text-sm px-2 h-7 whitespace-nowrap">
                  R$ {item.price}
                </span>
              </div>
              <p className="text-xs sm:text-sm line-clamp-2">{item.description}</p>
              {item.tags &&
                <div className="mt-4 flex gap-x-2">
                  {(JSON.parse(item.tags) as string[]).map((tag, i) => (
                    <span key={i} className="text-[13px] bg-border px-1 rounded">{tag}</span>
                  ))}
                </div>}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}