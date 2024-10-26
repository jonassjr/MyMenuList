"use client"

import Image from "next/image"

const navLinks = ['Sobre', 'Preços', 'Perguntas Frequentes']

import Logo from "../../public/Logo-v2.svg"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export const Nav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="relative py-5 padding-x z-10">
      <nav className=" w-full max-container flex items-center justify-between">
        <Image src={Logo} alt="Meu Menu Logo" />

        {/* mobile navigation */}
        <div className={`fixed bg-gradient ${toggle ? 'top-0' : '-top-full'} 
          left-0 w-full py-12 px-20 text-center transition-top duration-500 
          shadow sm:hidden z-20`}>
          <ul className="flex flex-col items-center gap-y-4">
            {navLinks.map((link, i) => (
              <li key={i} className="font-semibold">
                <a href={`#${link}`}>{link}</a>
              </li>
            ))}
          </ul>

          <div className=" absolute top-7 right-4 sm:hidden"
            onClick={() => setToggle(false)}
          >
            <X />
          </div>
        </div>

        {/* desktop navigation */}
        <div className="hidden sm:block">
          <ul className="flex items-center gap-x-4">
            {navLinks.map((link, i) => (
              <li key={i} className="font-semibold">
                <a href={`#${link}`}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:hidden"
          onClick={() => setToggle(true)}
        >
          <Menu />
        </div>
      </nav>
    </header>
  )
}