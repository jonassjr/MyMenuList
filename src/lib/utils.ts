import { auth } from "@/services/auth"
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
