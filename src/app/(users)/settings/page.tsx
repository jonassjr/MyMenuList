import { auth } from "@/services/auth";
import { PageNameForm } from "./_components/pageNameForm";
import { Button } from "@/components/ui/button";

export default async function Settings() {

  const session = await auth()
  const user = session?.user


  return (
    <main className="mb-8 flex flex-col gap-y-8">

      <section className="flex flex-col gap-y-8">
        <header className="flex flex-col gap-y-2">
          <h1 className="text-2xl sm:text-4xl font-medium">Endereço da página</h1>
          <p className="text-base text-muted-foreground">Endereço para encontrar meus menus.</p>
        </header>

        <article className="border rounded-lg p-4 flex flex-col gap-y-6">
          <PageNameForm pageName={user?.pageName} />
        </article>
      </section>

      <section className="flex flex-col gap-y-8">
        <header className="flex flex-col gap-y-2">
          <h1 className="text-2xl sm:text-4xl font-medium">Código QR</h1>
          <p className="text-base text-muted-foreground">Use o qr-code para gerar acesso rápido ao seus cardápios.</p>
        </header>

        <article className="flex gap-4 border rounded-lg p-4">
          <div className="flex flex-1 w-full border rounded-lg p-4"></div>
          <div className="flex flex-1 flex-col">
            <h1 className="text-2xl font-medium">Download</h1>
            <p className="text-sm text-muted-foreground">Faça o download e use o código como bem entender.</p>
            <Button className="mt-4 w-fit">Download</Button>
          </div>
        </article>
      </section>
    </main>
  )
}