import Image from "next/image"

import Logo2 from "../../public/Logo-v2.svg"

export const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex mb-10 flex-col justify-center items-center">
        <Image src={Logo2} alt="Meu Menu logo" />
        <p className="w-[120px] text-sm text-center text-muted-foreground">Simplifique seu menu Digital.</p>
      </div>
      <hr />
      <p className="text-center mt-2">© 2024 MeuMenu Todos os direitos reservados</p>
    </footer>
  )
}