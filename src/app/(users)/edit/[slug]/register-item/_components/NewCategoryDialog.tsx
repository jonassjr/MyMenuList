"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRef } from "react"

type newCategoryProps = {
  children: React.ReactNode
}

export const NewCategoryDialog = ({ children }: newCategoryProps) => {

  const ref = useRef<HTMLDivElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle >Adicionar Categoria</DialogTitle>
          <DialogDescription >
            Aqui você pode criar uma nova cateogoria.
          </DialogDescription>
        </DialogHeader>
        <Label>Categoria</Label>
        <Input placeholder="saladas" />
      </DialogContent>
    </Dialog>
  )
}