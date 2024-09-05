import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-5xl font-bold text-zinc-500">404</h1>
      <p className="text-xl mt-4">Página não encontrada</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-zinc-900 text-white rounded-md">
        Voltar para a página inicial
      </Link>
    </div>
  )
}