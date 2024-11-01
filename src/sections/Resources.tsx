import { Pencil, QrCode, SquareMenu } from "lucide-react"

export const Resources = () => {
  return (
    <section id="Recursos" className="w-full flex flex-col gap-y-8 scroll-my-20">
      <span className="self-center bg-zinc-200 rounded-full py-2 px-5">Recursos</span>
      <p className="text-center text-muted-foreground">Recursos práticos para criar, editar e acessar menus digitais com um simples QR Code.</p>
      <div className="flex gap-4">
        <article className="border rounded w-full min-w-[240px] p-4">
          <span className="w-fit flex bg-zinc-200 p-[10px] rounded-full">
            <SquareMenu className="text-zinc-700" />
          </span>
          <div className="mt-2">
            <p className="font-semibold">Criar Menus </p>
            <p className="text-muted-foreground"> você tem total controle para montar,
              editar e personalizar seu cardápio digital.
            </p>
          </div>
        </article>
        <article className="border rounded w-full min-w-[240px] p-4">
          <span className="w-fit flex bg-zinc-200 p-[10px] rounded-full">
            <Pencil className="text-zinc-700" />
          </span>
          <div className="mt-2">
            <p className="font-semibold">Editar Items </p>
            <p className="text-muted-foreground"> Adicione itens, organize categorias
              e ajuste detalhes com facilidade.
            </p>
          </div>
        </article>
        <article className="border rounded w-full min-w-[240px] p-4">
          <span className="w-fit flex bg-zinc-200 p-[10px] rounded-full">
            <QrCode className="text-zinc-700" />
          </span>
          <div className="mt-2">
            <p className="font-semibold">Acesso </p>
            <p className="text-muted-foreground"> Com um simples escaneamento, seus clientes
              têm acesso rápido.
            </p>
          </div>
        </article>
      </div>
    </section >
  )
}