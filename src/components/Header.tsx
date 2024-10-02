"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SideBarContext } from "@/contexts/SideBarContext"
import { Home, Menu } from "lucide-react"

import { usePathname } from "next/navigation"
import { useContext } from "react"

export const Header = () => {
  const pathName = usePathname()

  const { HandleSetToggle } = useContext(SideBarContext)

  const paths = pathName
    .split("/")
    .filter(Boolean)
    .map(part => part.replace(/-/g, " "))


  return (
    <header className="sticky top-0 flex w-full py-6 bg-white border-b border-border z-20">
      <Breadcrumb>
        <BreadcrumbList>
          <div className="block md:hidden"
            onClick={HandleSetToggle}
          >
            <Menu className="text-zinc-900" />
          </div>

          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/home"><Home /></BreadcrumbLink>
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`
            return (
              <span key={index} className="hidden sm:flex items-center gap-x-1.5">
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
    </header>
  )
}