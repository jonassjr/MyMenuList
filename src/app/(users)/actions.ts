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

export const DeleteMenu = async (id: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  await prisma.menus.delete({
    where: {
      id,
    }
  })

}