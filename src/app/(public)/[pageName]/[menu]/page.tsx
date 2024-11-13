import Image from "next/image"
import Link from "next/link"
import Logo from "../../../../../public/Logo-v2.svg"
import coverReference from "../../../../../public/cover-reference.svg"

import { getMenuData } from "@/app/(users)/actions"
import { ItemsDisplay } from "./_components/ItemsDisplay"

export default async function Page({ params }: { params: { menuSlug: string } }) {
  const { menuSlug } = params

  const menu = await getMenuData(menuSlug)
  const items = menu?.items
  const categories = menu?.categories

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-16">
      <header className="py-4 border-b">
        <Link href={"/"}>
          <Image src={Logo} width={155} alt="MyMenuList logo image" />
        </Link>
      </header>

      <div className="flex flex-col pt-8 pb-8 md:pb-24 gap-y-8">
        <section>
          <div className="relative w-full aspect-[16/5] rounded-md overflow-hidden">
            <Image src={menu?.coverImg || coverReference} fill className="object-cover" alt="cover Image" />
          </div>
        </section>

        <section>
          <ItemsDisplay categories={categories} items={items} menuSlug={menuSlug} />
        </section>
      </div>
      <footer className="w-full pt-8 md:pt-24">
        <div className="flex mb-10 flex-col justify-center items-center">
          <Image src={Logo} alt="Meu Menu logo" />
          <p className="w-[120px] text-sm text-center text-muted-foreground">Simplifique seu menu Digital.</p>
        </div>
        <hr />
        <p className="text-center mt-2">© 2024 MeuMenu Todos os direitos reservados</p>
      </footer>
    </main>
  )
}