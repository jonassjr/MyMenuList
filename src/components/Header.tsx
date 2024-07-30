"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

import { usePathname } from "next/navigation"

export const Header = () => {
  const pathName = usePathname()

  const paths = pathName.split("/").filter(Boolean)

  console.log(paths)

  return (
    <header className="sticky top-0 flex w-full py-6 bg-white border-b border-zinc-300 z-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home"><Home /></BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`
            return (
              <span key={href} className="flex items-center gap-x-1.5">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {/* <BreadcrumbLink href={href}>{path}</BreadcrumbLink> */}
                  <span>{path}</span>
                </BreadcrumbItem>
              </span>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

    </header >
  )
}