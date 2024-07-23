import { Header } from "@/components/Header"
import { SideBar } from "@/components/sideBar"

export default function UsersLayout({ children }: { children: React.ReactNode }) {

  return (
    <main className="flex min-h-screen bg-zinc-200">
      <SideBar />

      <section className="ml-64 w-full mx-auto min-h-full flex flex-col">
        <Header />
        <section className="mt-10 px-6 mx-auto w-full max-w-5xl z-0">
          {children}
        </section>
      </section>
    </main>
  )
}