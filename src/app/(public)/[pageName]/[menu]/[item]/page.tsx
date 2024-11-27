import Link from "next/link"
import Image from "next/image"
import Logo from "../../../../../../public/Logo-v2.svg"
import { getItemById, getMenuData } from "@/app/(users)/actions"

export default async function Page({ params }: { params: { item: string, menu: string } }) {
  const { item, menu } = params

  const menuData = await getMenuData(menu)

  let itemData

  if (menuData) {
    itemData = await getItemById(item, menuData?.id)
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-16">
      <header className="py-4 border-b">
        <Link href={"/"}>
          <Image src={Logo} width={155} alt="MyMenuList logo image" />
        </Link>
      </header>

      <section className="flex flex-col min-[512px]:items-center min-[1120px]:items-start min-[1120px]:flex-row pt-8 pb-16 gap-8">
        <div className="relative rounded-md w-full min-[512px]:max-w-[480px] aspect-[16/12]">
          {itemData &&
            <Image src={itemData?.img}
              fill
              className="object-cover rounded-md"
              alt={`Imagem do ${itemData?.name}`}
            />
          }
        </div>

        <article className="flex min-[512px]:w-[480px] min-[1120px]:w-full flex-col gap-y-10">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-4">
              <h1 className="text-2xl font-semibold">{itemData?.name}</h1>
              <span className="px-4 py-2 bg-border font-semibold rounded-md text-base">{itemData?.availability}</span>
            </div>
            <p>{itemData?.description}</p>
          </div>

          {itemData?.ingredients &&
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Igredientes</p>
              <div className="flex ">
                <span >
                  {(JSON.parse(itemData?.ingredients) as string[]).join(", ")}
                </span>
              </div>
            </div>
          }

          {itemData?.cautions &&
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Informações adicionais</p>
              <p>{itemData?.cautions}</p>
            </div>
          }

          {itemData?.tags &&
            <div className="flex gap-x-2">
              {(JSON.parse(itemData?.tags) as string[]).map((tag, i) => (
                <span key={i} className="text-sm bg-border py-1 px-3 rounded">{tag}</span>
              ))}
            </div>
          }
        </article>
      </section>
    </main>
  )
}