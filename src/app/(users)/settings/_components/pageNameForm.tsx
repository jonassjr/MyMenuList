"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { updatePageName } from "../../actions"

interface FormValue {
  pageName: string | undefined
}

interface PageNameFormProps {
  pageName: string
}

export const PageNameForm = ({ pageName }: PageNameFormProps) => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting, } } = useForm<FormValue>({
    defaultValues: {
      pageName: pageName
    },
  })

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const pageName = data.pageName

    try {
      if (pageName) {
        await updatePageName(pageName)
      }

    } catch (err) {
      if (err instanceof Error) {
        setError("pageName", { type: 'custom', message: err.message })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-3">
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col gap-y-3">
          <p className="text-muted-foreground text-sm">Endereço</p>
          <p className="border p-[0.6rem] rounded-md self-end text-sm font-semibold">www.meumenu.com</p>
        </div>
        <span className="text-2xl mt-5">/</span>
        <div className="w-full flex flex-col gap-y-3">
          <Label htmlFor="name" className="flex justify-between w-full">
            <p className="text-sm">Nome do estabelecimento</p>
            {errors.pageName && <p className="text-red-400 text-sm">{errors.pageName.message}</p>}
          </Label>

          <Input
            id="pageName"
            type="text"
            placeholder="Lugar-da-Massa"
            {...register("pageName", {
              pattern: {
                value: /^[a-zA-Z0-9\-]+$/,
                message: "Não use caracteres especiais como @, #, %, &, etc.",
              },
              minLength: {
                value: 3,
                message: "O nome deve ter pelo menos 3 caracteres.",
              },
            })}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
      >
        {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
      </Button>
    </form>
  )
}