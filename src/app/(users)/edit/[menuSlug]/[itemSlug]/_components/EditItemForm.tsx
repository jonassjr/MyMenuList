"use client"

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
import { TagInput } from "../../_components/TagInput"
import { Button } from "@/components/ui/button"

import { IngredientInput } from "../../_components/IngredientInput"
import { ItemImgUploader } from "../../_components/ItemImgUploader"
import { SelectCategory } from "../../_components/SelectCategory"

import { LoaderCircle } from "lucide-react"
import { z } from "zod"
import { updateMenuItem } from "@/app/(users)/schema"
import { updateItem } from "@/app/(users)/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { deleteImage, uploadImage } from "@/lib/supabase/upload"

type FormValues = z.infer<typeof updateMenuItem>

interface CategoryProps {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  menusId: string | null
}

interface ItemProps {
  id: string
  name: string
  price: string
  img: string
  category: CategoryProps
  availability: string
  ingredients: string // Ou pode ser string[] se for uma lista de strings
  tags: string | null// Ou pode ser string[] se for uma lista de tags
  cautions: string
  description: string
}

interface FormProps {
  menu: {
    id: string
    title: string
    slug: string
    createdAt: Date
    updatedAt: Date
    userId: string
    coverImg: string | null
    items: ItemProps[]
  }
  itemToEdit: ItemProps | null
}


export const EditItemForm = ({ menu, itemToEdit }: FormProps) => {
  const [item, setItem] = useState<ItemProps | null>(itemToEdit || null)
  const [availability, setAvailability] = useState<string>(item?.availability || '');


  const { register, handleSubmit, setValue, reset, formState: { isSubmitting, errors } } = useForm<FormValues>({

    defaultValues: {
      availability: item?.availability,
      category: item?.category.name,
      cautions: item?.cautions,
      description: item?.description,
      imgUrl: item?.img,
      name: item?.name,
      ingredients: item ? JSON.parse(item?.ingredients) : undefined,
      price: item?.price,
      tags: item?.tags ? JSON.parse(item?.tags) : undefined
    },
    resolver: zodResolver(updateMenuItem),
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!item) return

    try {
      const { imgFile } = data

      if (imgFile) {
        const imgUrl = await uploadImage(imgFile, `${imgFile.name}-${Date.now()}`)
        data.imgUrl = imgUrl
      }

      delete data.imgFile

      await updateItem(data, item?.id)

      router.replace(`/edit/${menu.slug}`)

    } catch (error) {
      console.log("ouve um erro: ", error)
    }
    reset()
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '') // Remove tudo que não é dígito

    if (value) {
      // Converte o valor para número e formata como moeda
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
      }).format(parseFloat(value) / 100)

      setValue('price', formattedValue, { shouldValidate: true })
    } else {
      setValue('price', '') // Limpa o campo se não houver números
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-8 my-8">

      <section >
        {menu &&
          <ItemImgUploader
            menuId={menu?.id}
            initialItemImg={item?.img}
            onChange={(imgFile: File,) => {
              setValue("imgFile", imgFile)
            }
            }
          />
        }
      </section>

      <section className="w-full grid min-[560px]:grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-3">

          <Label htmlFor="name" className="relative w-full">
            Nome
            {errors.name && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.name.message}</p>}
          </Label>

          <Input
            id="name"
            type="text"
            placeholder="Fettuccine com batata duchesse"
            defaultValue={item?.name}
            {...register("name")}
          />
        </div>

        <div className=" w-full flex flex-col gap-y-3">
          <Label htmlFor="price" className="relative w-full">
            Preço
            {errors.price && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.price.message}</p>}
          </Label>
          <div className="relative">
            <span className="absolute top-[0.66rem] left-2 text-sm text-zinc-400">R$</span>
            <Input
              id="price"
              type="text"
              placeholder="0,00"
              defaultValue={item?.price}
              className="pl-8 "
              {...register("price", {
                onChange: handlePriceChange
              })}
            />
          </div>
        </div>

        <div className="flex gap-x-2 items-center">
          <div className="w-full flex flex-col gap-y-2">
            <Label className="relative w-full">
              Categoria
              {errors.category && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.category.message}</p>}
            </Label>
            {menu &&
              <SelectCategory
                menuId={menu?.id}
                onChange={(value: string) => setValue("category", value, { shouldValidate: true })}
                defaultValue={item?.category.name}
              />
            }
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label className="relative w-full">
            Disponibilidade
            {errors.availability && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.availability.message}</p>}

          </Label>
          <Select
            value={availability}
            onValueChange={
              (value: string) => {
                setValue("availability", value, { shouldValidate: true })
                setAvailability(value)
              }
            }
          >
            <SelectTrigger >
              <SelectValue placeholder="selecione uma disponibilidade" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="disponivel" >Disponível</SelectItem>
              <SelectItem value="indisponivel" >Indisponível</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <div className="w-full flex flex-col gap-y-2">
          <Label className="relative w-full">Ingredientes
            {errors.ingredients && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.ingredients.message}</p>}
          </Label>
          <IngredientInput
            onChange={(ingredients: string[]) => setValue("ingredients", ingredients, { shouldValidate: true })}
            defaultValue={item?.ingredients} />
        </div>
      </section>

      <section className="w-full grid min-[560px]:grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="description" className="relative w-full">Descrição
            {errors.description && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.description.message}</p>}

          </Label>
          <Textarea
            id="description"
            placeholder="Adicione uma descrição ao seu produto"
            defaultValue={item?.description}
            {...register("description")}
          />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <Label htmlFor="cautions" className="relative w-full">
            Informações adicionais
            {errors.cautions && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.cautions.message}</p>}
          </Label>
          <Textarea
            id="cautions"
            placeholder="Pode conter traços de nozes"
            defaultValue={item?.cautions}
            {...register("cautions")}
          />
        </div>
      </section>

      <section>
        <div className="w-full flex flex-col gap-y-2">
          <Label className="relative w-full">Tags
            {errors.tags && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.tags.message}</p>}
          </Label>
          <TagInput onChange={(tags: string[]) => setValue("tags", tags, { shouldValidate: true })} defaultValue={item?.tags || ''} />
        </div>
      </section>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
      >
        {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
      </Button>
    </form >
  )
}