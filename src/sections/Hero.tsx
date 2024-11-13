import Image from "next/image"

import HeroImage from "../../public/HomePreview.png"

export const Hero = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h1 className="w-[320px] lg:w-[800px] text-xl sm:text-5xl text-zinc-800 text-center font-bold">
        Crie e personalize cardápios digitais com facilidade e agilidade.
      </h1>
      <div className="relative mt-14 aspect-video w-full mx-auto rounded">
        <Image src={HeroImage} alt="Home image" fill className="rounded object-cover drop-shadow-xl md:drop-shadow-2xl" />
      </div>
    </section>
  )
}