import Image from "next/image"
import Link from "next/link"
import Logo from "../../../../public/Logo-v1.svg"
import { getPageData } from "@/app/(users)/actions"
import { MenuCard } from "./_components/MenuCard"

export default async function Page({ params }: { params: { pageName: string } }) {
  const { pageName } = params

  const data = await getPageData(pageName)
  const menus = data?.Menus

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-16">
      <header className="py-4 bg-zinc-300">
        <Link href={"/"}>
          <Image src={Logo} width={155} alt="MyMenuList logo image" />
        </Link>
      </header>

      <section>
        <div className="mt-10 flex flex-col gap-y-2">
          <h1 className="text-2xl sm:text-4xl font-medium">Nossos Cardápios</h1>
          <p className="text-base text-muted-foreground">Sinta-se a vontade e econtre algo de seu agrado.</p>
        </div>

        <div className="my-10 flex flex-wrap gap-16">
          {menus && menus.map((menu, i) => (
            <MenuCard menuData={menu} index={i} key={menu.id} pageName={pageName} />
          ))}
        </div>

      </section>
    </main>
  )
}