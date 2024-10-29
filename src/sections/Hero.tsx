import Image from "next/image"

import HeroImage from "../../public/HomePreview.png"

export const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h1 className="w-[800px] text-center text-4xl font-medium">Crie e personalize cardápios digitais com facilidade e agilidade.
      </h1>
      <div className="mt-14 w-[1000px] mx-auto rounded">
        <Image src={HeroImage} alt="Home image" className="rounded" />
      </div>
    </section>
  )
}