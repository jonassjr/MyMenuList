import { getMenuData } from "@/app/(users)/actions"
import { Form } from "./_components/form"
import { getPlanByPrice } from "@/services/stripe"
import { auth } from "@/services/auth"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function RegisterItem({ params }: PageProps) {

  const { slug } = params

  const menu = await getMenuData(slug)

  const session = await auth()

  const plan = getPlanByPrice(session?.user.stripePriceId as string)

  if (plan.name !== "pro") {
    notFound()
  }

  return (
    <main className="">
      <header>
        <h2 className="text-2xl sm:text-4xl font-medium">Registrar Novo item</h2>
        <p className="text-base text-muted-foreground">Aqui você pode criar um novo item.</p>
      </header>
      <Form menu={menu} />
    </main>
  )
}