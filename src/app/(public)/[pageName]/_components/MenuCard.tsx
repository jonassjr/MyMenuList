"use client"

interface MenuCardProps {
  menuData: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    coverImg: string | null;
  }
  index: number
  pageName: string
}

import Link from "next/link";

export const MenuCard = ({ menuData, index, pageName }: MenuCardProps) => {

  const { title, slug } = menuData


  return (
    <article className="relative">
      <Link href={`/${pageName}/${slug}`}>
        <div className="w-44 h-56 bg-zinc-800 rounded-sm relative transition-colors duration-300 hover:bg-zinc-800/95">
          <span className="border-l-4 rounded-l border-zinc-400 h-12 absolute top-5 -left-[4px] " />
          <span className="text-zinc-100 text-2xl absolute top-7 left-2" >
            {index + 1}
          </span>
          <p className="text-zinc-100 absolute bottom-2 left-2">{title}</p>
        </div>
      </Link>
    </article>
  )
}