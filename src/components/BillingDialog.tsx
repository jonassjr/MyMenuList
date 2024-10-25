"use client"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { DialogTrigger } from "@radix-ui/react-dialog"

import Link from "next/link"

import { useRef } from "react"

interface BillingDialogProps {
  children: React.ReactNode
}

export const BillingDialog = ({ children }: BillingDialogProps) => {

  const ref = useRef<HTMLDivElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Você não pode criar mais menus.</DialogTitle>
          <DialogDescription>
            Assine nosso serviço e tenha acesso ilimitado a criação de menus e de items.
          </DialogDescription>
        </DialogHeader>
        <Button className="w-fit self-end">
          <Link href={"/billing"}>Assinaturas</Link>
        </Button>
      </DialogContent>
    </Dialog>
  )
}