"use client"

import { deleteImage, uploadImage } from '@/lib/supabase/upload'
import { Edit, ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type PreviewFile = {
  file: File | null
  preview: string;
};

interface ItemImgUploaderProps {
  menuId: string
  initialItemImg?: string
  onChange: (value: File) => void
}

export const ItemImgUploader = ({ menuId, onChange, initialItemImg }: ItemImgUploaderProps) => {
  const [itemImg, setItemImg] = useState<PreviewFile[]>([]);

  useEffect(() => {
    if (initialItemImg) {
      setItemImg([{ file: null, preview: initialItemImg }])
    }

  }, [initialItemImg])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setItemImg(newFiles)

    const fileToUpload = newFiles[0].file
    if (!fileToUpload) return

    onChange(fileToUpload)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}
      className={`relative aspect-[16/12] max-w-[309px] rounded-md ${itemImg[0] ? "" : "border-2 border-dashed border-zinc-400"} ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 `}
    >
      {itemImg[0] &&
        <span className='transition-all absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-100 cursor-pointer 
          hover:bg-zinc-200 z-10 grid place-content-center'>
          <Edit size={20} className="text-zinc-800" />
        </span>
      }
      <input {...getInputProps()} className="focus:outline-none" />
      {
        itemImg && itemImg.length > 0 ? (
          <Image
            src={itemImg[0].preview}
            fill
            alt="image uploaded"
            className="rounded-md object-cover"
          />
        ) : (
          <div className="text-center flex flex-col justify-center items-center h-full gap-y-2 p-2">
            <ImagePlus size={32} className="text-sky-500" />
            <p className="text-sm text-zinc-400">Arraste e solte sua imagem aqui, ou <span className='text-sky-500'>clique</span> para selecionar um arquivo</p>
          </div>
        )
      }
    </div >
  )
}