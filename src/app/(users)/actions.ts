'use server'

import { auth } from "@/services/auth"
import prisma from "@/services/database"
import { z } from 'zod'
import { upsertMenu } from "./schema"

export async function getUserMenus() {

  const session = await auth()

  const menus = await prisma.menus.findMany({
    where: {
      userId: session?.user?.id
    }, orderBy: {
      createdAt: 'desc'
    }
  })

  return menus
}

export async function createMenu(input: z.infer<typeof upsertMenu>) {

  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User not authenticated")
  }

  const menu = await prisma.menus.create({
    data: {
      title: input.title,
      userId: session.user.id
    }
  })

  return menu
}