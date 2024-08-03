"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { upsertMenu } from "../../schema";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { createMenu } from "../../actions"
import { useRef } from "react";
import { LoaderCircle } from "lucide-react";

type FormValues = z.infer<typeof upsertMenu>

type MenuUpsertSheetProps = {
  children: React.ReactNode
}

export const MenuUpsertSheet = ({ children }: MenuUpsertSheetProps) => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(upsertMenu)
  });

  const onSubmit: SubmitHandler<FormValues> = (async (data) => {
    await createMenu(data)
    router.refresh()
    reset()
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref} >
          {children}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar um cardápio?</SheetTitle>
          <SheetDescription>
            Escolha um nome para seu cardápio.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            <Label htmlFor="title" className="">Nome do Cardápio</Label>
            <Input
              id="title"
              type="text"
              placeholder="Menu Principal"
              {...register("title")}
            />
            {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed `}
          >
            {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}