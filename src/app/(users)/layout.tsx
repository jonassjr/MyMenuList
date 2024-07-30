import { Header } from "@/components/Header"
import { SideBar } from "@/components/sideBar"
import { auth } from "@/services/auth"

export default async function UsersLayout({ children }: { children: React.ReactNode }) {

  const session = await auth()

  return (
    <main className="flex min-h-screen ">
      <SideBar user={session?.user} />
      <section className="ml-64 w-full mx-auto min-h-full flex flex-col">
        <section className="flex flex-col gap-y-8 px-6 mx-auto w-full max-w-5xl z-0 ">
          <Header />
          {children}
        </section>
      </section>
    </main>
  )
}