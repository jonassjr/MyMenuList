"use client"

import { ReactNode, createContext, useState } from 'react'

interface SideBarContextType {
  toggle: boolean
  HandleSetToggle: () => void
}

export const SideBarContext = createContext({} as SideBarContextType)

interface SideBarProviderProps {
  children: ReactNode
}

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [toggle, setToggle] = useState(false)

  const HandleSetToggle = () => {
    setToggle((prev) => !prev)
  }

  return (
    <SideBarContext.Provider value={{ toggle, HandleSetToggle }}>
      {children}
    </SideBarContext.Provider>
  )
}