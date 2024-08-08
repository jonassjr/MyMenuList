"use client"

import { convertFilesToUrl } from '@/lib/utils'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type PreviewFile = {
  file: File;
  preview: string;
};

export const ItemImgUploader = () => {
  const [itemImg, setItemImg] = useState<PreviewFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: convertFilesToUrl(file)
    }));
    setItemImg(newFiles)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}
      className='relative h-[220px] w-[344px] rounded-md border-2 border-dashed border-zinc-400 ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 '
    >
      <input {...getInputProps()} className="focus:outline-none" />
      {
        itemImg && itemImg.length > 0 ? (
          <Image
            src={itemImg[0].preview}
            fill
            object-fit="cover"
            alt="image uploaded"
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