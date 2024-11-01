import { Circle } from "lucide-react"

export const Prices = () => {
  return (
    <section id="Preços" className="w-full flex flex-col gap-y-8 scroll-my-20">
      <span className="self-center bg-zinc-200 rounded-full py-2 px-5">Preços</span>
      <div className="w-full flex justify-center gap-x-4">
        <article className="min-w-[400px] min-h-[400px] p-6 border rounded-md flex flex-col gap-y-4">
          <div className="text-center flex flex-col gap-y-2">
            <p className="text-2xl font-semibold">Grátis</p>
            <span className="text-xl text-muted-foreground">R$ 0,00/mês</span>
          </div>
          <hr />
          <ul className="flex flex-col gap-y-2" >
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Criação de 1 Menu</li>
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Criação de 15 items</li>
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Edição de items</li>
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Suporte</li>
          </ul>
        </article>
        <article className="min-w-[400px] min-h-[400px] p-6 border rounded-md flex flex-col gap-y-4">
          <div className="text-center flex flex-col gap-y-2">
            <p className="text-2xl font-semibold">Pró</p>
            <span className="text-xl text-muted-foreground">R$ 19,90/mês</span>
          </div>
          <hr />
          <ul className="flex flex-col gap-y-2">
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Criação de menus ilimitados</li>
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Criação de items ilimitados</li>
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Edição de items</li>
            <li className="flex gap-x-2 items-center"> <Circle size={12} /> Suporte</li>
          </ul>
        </article>
      </div >
    </section >
  )
}