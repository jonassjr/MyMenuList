import { getMenuData } from "@/app/(users)/actions"
import { Form } from "./_components/form"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function RegisterItem({ params }: PageProps) {

  const { slug } = params
  const menu = await getMenuData(slug)

  return (
    <main className="">
      <header>
        <h2>Registrar Novo item</h2>
      </header>
      <Form menu={menu} />
    </main>
  )
}