import { z } from 'zod'

export const upsertMenu = z.object({
  title: z.string().min(1, "Por favor informe o nome do menu")
})

export const menuItem = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  price: z.string().min(1, "Campo obrigatório"),
  imgFile: z.instanceof(File),
  imgUrl: z.string().min(1, "Por favor adicione uma Imagem"),
  category: z.string({ required_error: "Campo obrigatorio" }),
  availability: z.string({
    required_error: "Campo obrigatorio",
  }),
  ingredients: z.array(
    z.string(), { required_error: "Adicione ao menos uma Ingrediente" }
  ),
  tags: z.array(z.string()).optional(),
  cautions: z.string(),
  description: z.string().min(1, "Adcione uma descrição")
})

export const updateMenuItem = z.object({
  name: z.string().optional(),
  imgFile: z.instanceof(File).optional(),
  price: z.string().optional(),
  imgUrl: z.string().optional(),
  category: z.string().optional(),
  availability: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  cautions: z.string().optional(),
  description: z.string().optional()
})