import { getItemById, getMenuData } from "@/app/(users)/actions"
import { EditItemForm } from "./_components/EditItemForm"

interface EditItemPageProps {
  params: {
    id: string
    slug: string
  }
}

export default async function EditItemPage({ params }: EditItemPageProps) {

  const { id, slug } = params
  const item = await getItemById(id)
  const menu = await getMenuData(slug)


  return (
    <main className="">
      <header>
        <h2>Editar item</h2>
      </header>
      {menu && item && <EditItemForm menu={menu} itemToEdit={item} />}
    </main>
  )
}