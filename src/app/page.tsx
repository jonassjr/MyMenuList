import { Nav } from "@/components/Nav";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Prices } from "@/sections/Prices";
import { Resources } from "@/sections/Resources";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient">
      <header>
        <Nav />
      </header>
      <section className="padding-x padding-y">
        <Hero />
      </section>
      <section className="padding-x padding-y">
        <Resources />
      </section>
      <section className="padding-x padding-y">
        <Prices />
      </section>
      <footer className="padding-x pt-8 md:pt-24 pb-2">
        <Footer />
      </footer>
    </main>
  )
}
