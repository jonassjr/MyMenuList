import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/Logo-v2.svg"

import { getMenuData } from "@/app/(users)/actions";
import { ItemsDisplay } from "./_components/ItemsDisplay";

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

      <div className="flex flex-col py-8 gap-y-8">
        <section>
          <div className="relative w-full aspect-[16/5] bg-zinc-300 rounded-md overflow-hidden">
            {menu?.coverImg && <Image src={menu?.coverImg} fill className="object-cover" alt="cover Image" />}
          </div>
        </section>

        <section>
          <ItemsDisplay categories={categories} items={items} menuSlug={menuSlug} />
        </section>

      </div>
      <footer className="border-t py-3 text-center mt-10">
        <p>© 2024 MeuMenu Todos os direitos reservados</p>
      </footer>
    </main>
  )
}