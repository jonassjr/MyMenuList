import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Settings() {

  // const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  return (
    <main className="flex flex-col gap-y-8">
      <header className="flex flex-col gap-y-2">
        <h1 className="text-2xl sm:text-4xl font-medium">Configurações</h1>
        <p className="text-base text-muted-foreground">Gerencie configurações da sua conta e defina preferências.</p>
      </header>

      <section className="border rounded-lg p-4 flex flex-col gap-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Perfil</h1>
          <p className="text-sm text-muted-foreground">Esta é a forma como os usuários irão te ver.</p>
        </div>

        <form className="w-full flex flex-col gap-y-3">
          <Label htmlFor="name" className="relative w-full">
            Nome do estabelecimento
            {/* {errors.name && <p className="absolute top-0 right-0 text-red-400 text-xs">{errors.name.message}</p>} */}
          </Label>

          <Input
            id="name"
            type="text"
            placeholder="Lugar da Massa"
          />

          <Button
            type="submit"
            // disabled={isSubmitting}
            className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
          >
            {/* {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'} */}
            Salvar
          </Button>
        </form>
      </section>

      <section className="flex gap-4 border rounded-lg p-4">
        <div className="flex flex-1 w-full border rounded-lg p-4"></div>
        <div className="flex flex-1 flex-col">
          <h1 className="text-2xl font-medium">Código QR</h1>
          <p className="text-sm text-muted-foreground">Use o qr-code para gerar acesso rápido ao seus cardápios.</p>
        </div>
      </section>
    </main>
  )
}