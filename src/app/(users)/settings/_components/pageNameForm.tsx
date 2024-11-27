"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoaderCircle, Slash } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { updatePageName } from "../../actions"
import { useRouter } from "next/navigation"

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

  const router = useRouter()

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const pageName = data.pageName

    try {
      if (pageName) {
        await updatePageName(pageName)
        router.refresh()
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
      <div className="flex flex-col sm:flex-row items-center gap-y-2 gap-x-6">
        <div className="flex w-full sm:w-fit flex-col gap-y-3">
          <p className="text-muted-foreground text-sm">Endereço</p>
          <div className="flex items-center">
            <p
              className="w-fit border p-[0.6rem] rounded-md text-sm font-semibold">
              {`${process.env.NEXT_PUBLIC_APP_URL}`}
            </p>
            <span className="relative left-3 text-2xl">/</span>
          </div>

        </div>

        <div className="w-full flex flex-col gap-y-3">
          <Label htmlFor="name" className="flex justify-between w-full">
            <p className="text-sm">Nome do estabelecimento</p>
            {errors.pageName && <p className="text-red-400 text-sm">{errors.pageName.message}</p>}
          </Label>

          <Input
            id="pageName"
            type="text"
            {...register("pageName", {
              pattern: {
                value: /^[a-zA-Z0-9\-]+$/,
                message: "Não use caracteres especiais como @, #, %, espaços, etc.",
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
        className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed`}
      >
        {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
      </Button>
    </form>
  )
}