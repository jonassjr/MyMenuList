import { notFound } from "next/navigation"

import { ItemsDisplay } from "./_components/itemsDisplay"

import { getMenuData } from "../../actions"
import { CoverImgUploader } from "./_components/coverImgUploader"
import { auth } from "@/services/auth"
import { getPlanByPrice } from "@/services/stripe"

export default async function EditMenuPage({ params }: { params: { menuSlug: string } }) {

  const { menuSlug } = params

  const menu = await getMenuData(menuSlug)

  const categories = menu?.categories

  const items = menu?.items

  const qtdItems = items?.length

  const session = await auth()

  const plan = getPlanByPrice(session?.user.stripePriceId as string)

  if (!menu) {
    notFound()
  }

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-medium">{menu?.title}</h1>
        <p className="text-base text-muted-foreground">Aqui você pode editar seu cardápio</p>
      </div>

      <div className="flex flex-col gap-y-8 my-6">
        <div className="">
          {menu && <CoverImgUploader menuId={menu?.id} initialCoverImg={menu.coverImg ?? undefined} />}
        </div>

        {qtdItems !== undefined &&
          <ItemsDisplay
            categories={categories}
            items={items}
            menuSlug={menuSlug}
            plan={plan.name}
            qtdItems={qtdItems}
          />
        }
      </div>
    </main>
  )
}