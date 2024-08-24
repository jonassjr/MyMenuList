'use server'

import { auth } from "@/services/auth"
import prisma from "@/services/database"
import { z } from 'zod'
import { menuItem, updateMenuItem, upsertMenu } from "./schema"
import { createSlug } from "@/lib/utils"
import { deleteImage, uploadImage } from "@/lib/supabase/upload"

export async function getUserMenus() {

  const session = await auth()

  const menus = await prisma.menus.findMany({
    where: {
      userId: session?.user?.id
    }, orderBy: {
      createdAt: 'asc'
    }
  })

  return menus
}

export async function getMenuData(slug: string) {

  const menu = await prisma.menus.findUnique({
    where: {
      slug: slug
    }, include: {
      items: {
        select: {
          id: true,
          name: true,
          price: true,
          img: true,
          category: true,
          availability: true,
          ingredients: true,
          tags: true,
          cautions: true,
          description: true
        }
      }
    }
  })

  return menu
}

export async function createMenu(input: z.infer<typeof upsertMenu>) {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const slug = createSlug(input.title, session?.user?.id)

  const menu = await prisma.menus.create({
    data: {
      title: input.title,
      userId: session.user.id,
      slug: slug
    }
  })

  return menu
}

export const DeleteMenu = async (slug: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  await prisma.menus.delete({
    where: {
      slug,
    }
  })

}

export const GetCategories = async (menuId: string) => {

  const categories = await prisma.categories.findMany({
    where: {
      menusId: menuId,
    }
  })

  return categories
}

export const CreateCategory = async (name: string, menuId: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const isAlreadyExist = await prisma.categories.findUnique({
    where: {
      name,
    }
  })

  if (isAlreadyExist) throw new Error("Categoria já existe!")

  const category = await prisma.categories.create({
    data: {
      name,
      menusId: menuId,
    }
  })

  return category
}

export const updateCoverImg = async (menuId: string, coverImgUrl: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }


  const menu = await prisma.menus.update({
    where: { id: menuId },
    data: { coverImg: coverImgUrl }
  })

  return menu
}

export const createItem = async (data: z.infer<typeof menuItem>, menuId: string) => {
  const { imgUrl, name, price, category, availability, ingredients, description, cautions, tags } = data

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const newItem = await prisma.items.create({
    data: {
      img: imgUrl,
      name,
      price,
      category: {
        connect: {
          id: category
        }
      },
      availability,
      ingredients: JSON.stringify(ingredients),
      description,
      cautions,
      tags: JSON.stringify(tags),
      Menus: {
        connect: {
          id: menuId
        }
      }
    }
  })

  return newItem
}


export const updateItem = async (data: z.infer<typeof updateMenuItem>, itemId: string) => {

  const { imgUrl, name, price, category, availability, ingredients, description, cautions, tags } = data

  const itemToUpdate = await prisma.items.findUnique({
    where: {
      id: itemId,
    }
  })

  if (!itemToUpdate) throw new Error("Item não encontrado.")

  if (imgUrl !== itemToUpdate.img) {
    const oldFilePath = itemToUpdate.img.split("/").pop()
    await deleteImage(`${oldFilePath}`)
    console.log("deletado")
  }

  const updatedItem = await prisma.items.update({
    where: {
      id: itemToUpdate.id
    },
    data: {
      img: imgUrl,
      name,
      price,
      category: {
        connect: {
          name: category
        }
      },
      availability,
      ingredients: JSON.stringify(ingredients),
      description,
      cautions,
      tags: JSON.stringify(tags),
    }
  })

  return updatedItem;
}

export const getItemById = async (id: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const item = await prisma.items.findUnique({
    where: {
      id,
    },
    include: {
      category: true
    }
  })

  return item
}