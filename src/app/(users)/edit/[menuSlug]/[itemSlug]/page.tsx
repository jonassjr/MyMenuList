import { getItemById, getMenuData } from "@/app/(users)/actions"
import { EditItemForm } from "./_components/EditItemForm"
import { notFound } from "next/navigation"

interface EditItemPageProps {
  params: {
    slug: string
    itemSlug: string
  }
}

export default async function EditItemPage({ params }: EditItemPageProps) {

  const { slug, itemSlug } = params

  const menu = await getMenuData(slug)

  if (!menu) {
    notFound()
  }

  const item = await getItemById(itemSlug, menu?.id)

  return (
    <main className="">
      <header>
        <h2>Editar item</h2>
      </header>
      {menu && item && <EditItemForm menu={menu} itemToEdit={item} />}
    </main>
  )
}