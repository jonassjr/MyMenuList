'use server'

import { auth } from "@/services/auth"
import prisma from "@/services/database"
import { z } from 'zod'
import { upsertMenu } from "./schema"
import { createSlug } from "@/lib/utils"

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
    }
  })

  return menu
}

export async function createMenu(input: z.infer<typeof upsertMenu>) {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const slug = createSlug(input.title)

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

export const CreateItem = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }
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