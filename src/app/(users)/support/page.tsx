import Image from "next/image";
import { Faqs } from "./_components/Faqs";

import Logo2 from "../../../../public/Logo-v2.svg"

export default function Support() {
  return (
    <main className="mb-8 flex flex-col gap-y-8">
      <section className="flex flex-col gap-y-8">
        <header className="flex flex-col gap-y-2">
          <h1 className="text-2xl sm:text-4xl font-medium">Pergunntas Frequentes</h1>
          <p className="text-base text-muted-foreground">Algumas duvidas que são comuns entre os usuários.</p>
        </header>

        <Faqs />
      </section>

      <section className="flex flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="text-2xl sm:text-4xl font-medium">Entre em contato</h1>
          <p className="text-base text-muted-foreground">Caso tenha alguma duvida ou precise de uma ajuda com algo em especifico.</p>
        </header>

        <div className="flex flex-col gap-y-4 bg-zinc-100 rounded py-10 text-center">
          <p className="text-lg font-semibold">meumenu@email.com</p>
          <div className="flex flex-col justify-center items-center">
            <Image src={Logo2} width={120} alt="Meu Menu logo" />
            <p className="w-[120px] text-xs text-center text-muted-foreground">Simplifique seu menu Digital.</p>
          </div>
        </div>
      </section>

    </main >
  )
}