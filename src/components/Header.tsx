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

  return (
    <header className="sticky top-0 flex w-full py-6 bg-white border-b border-border z-10">
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