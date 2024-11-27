import { Button } from "@/components/ui/button"
import { createCheckoutSessionAction } from "./actions"
import { auth } from "@/services/auth"
import { getPlanByPrice } from "@/services/stripe"

export default async function Plan() {

  const session = await auth()
  const plan = getPlanByPrice(session?.user.stripePriceId as string)

  return (
    <main className="flex flex-col gap-y-8">

      <header className="flex flex-col gap-y-2">
        <h1 className="text-2xl sm:text-4xl font-medium">Assinatura</h1>
        <p className="text-base text-muted-foreground">Aqui você pode alterar seu plano.</p>
      </header>

      <form action={createCheckoutSessionAction} className="p-4 rounded-md border flex flex-col gap-y-4">
        <div className="flex flex-col">
          <p className="text-muted-foreground text-sm">Você está atualemente no plano <span className="text-black font-semibold">{plan.name === "free" ? "GRATUITO" : "PRO"}</span> </p>
        </div>

        <ul className="pl-6 list-disc border-t pt-4 text-sm text-muted-foreground">
          <li>{plan.quota.menus === 1 ? "Criação de 1 menu." : "Criação de menus ilimitado."}</li>
          <li>Criação de items {plan.quota.items === 15 ? "15" : "ilimitado"}.</li>
        </ul>
        {plan.name === "free" ? (

          <div className="pt-4 flex justify-between border-t items-center font-semibold">
            <p className="text-sm">Para ter maior limite assine o PRO. </p>
            <Button type="submit">Assine por R$ 19,90</Button>
          </div>
        ) : ""
        }

      </form>
    </main>
  )
}