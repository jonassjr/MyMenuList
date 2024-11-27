import { auth } from "@/services/auth"
import prisma from "@/services/database"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createSlug = (name: String) => {
  const cleanedName = name
    .toString()              // Converte o valor para string (caso não seja)
    .normalize("NFD")        // Normaliza a string em forma de decomposição (NFD)
    .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
    .toLowerCase()           // Converte para minúsculas
    .trim()                  // Remove espaços em branco no início e no fim
    .replace(/[^a-z0-9 -]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-")    // Substitui espaços por hífens
    .replace(/-+/g, "-")   // Remove hífens consecutivos

  return `${cleanedName}`
}

export const createPageName = async (name: string) => {
  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // substitui espaços por hifens
      .replace(/[^\w\-]+/g, '') // remove caracteres especiais
      .replace(/\-\-+/g, '-') // substitui múltiplos hifens por um único
      .replace(/^-+/, '') // remove hifens do início
      .replace(/-+$/, ''); // remove hifens do final

  let slug = slugify(name)

  let isPageNameExist = await prisma.user.findUnique({
    where: {
      pageName: slug
    }
  })

  let counter = 1

  while (isPageNameExist) {
    slug = `${slugify(name)}-${counter}`;
    isPageNameExist = await prisma.user.findUnique({
      where: { pageName: slug }
    })
    counter++
  }

  return slug
}
