"use client"

import { updateCoverImg } from '@/app/(users)/actions'
import { Button } from '@/components/ui/button'
import { uploadImage, deleteImage } from '@/lib/supabase/upload'
import { Edit, ImagePlus, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

type PreviewFile = {
  file: File | null
  preview: string
};

interface CoverImgUploaderProps {
  menuId: string
  initialCoverImg?: string
}

export const CoverImgUploader = ({ menuId, initialCoverImg }: CoverImgUploaderProps) => {
  const [coverImg, setCoverImg] = useState<PreviewFile[]>(initialCoverImg ? [{ file: null, preview: initialCoverImg }] : []);

  const [saveButton, setSaveButton] = useState(false)

  const [recentlyUploadedImg, setRecentlyUploadedImg] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setCoverImg(newFiles)
    setSaveButton(true)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const { handleSubmit, formState: { isSubmitting } } = useForm()

  const onSubmit = async () => {
    if (coverImg.length === 0 || !coverImg[0].file) return;

    if (initialCoverImg || recentlyUploadedImg) {

      if (initialCoverImg) {
        const oldFilePath = initialCoverImg.split("/").pop()
        await deleteImage(`${oldFilePath}`)
      }

      if (recentlyUploadedImg) {
        const oldFilePath = recentlyUploadedImg.split("/").pop()
        await deleteImage(`${oldFilePath}`)
      }
    }

    const coverImgUrl = await uploadImage(coverImg[0].file, `coverImg-${Date.now()}-${menuId}`)

    await updateCoverImg(menuId, coverImgUrl)

    setRecentlyUploadedImg(coverImgUrl)
    setSaveButton(false)

  }

  return (
    <section className="flex flex-col gap-y-8">

      <div {...getRootProps()}
        className={`relative w-full h-[22rem] rounded-md  ${coverImg[0] ? "" : "border-2 border-dashed border-zinc-400"} ring-offset-2 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 overflow-hidden `}
      >
        {coverImg[0] &&
          <span className='transition-all absolute top-4 right-4 w-12 h-12 rounded-full bg-zinc-100 cursor-pointer 
          hover:bg-zinc-200 z-10 grid place-content-center'>
            <Edit size={22} className="text-zinc-800" />
          </span>}

        <input {...getInputProps()} className="focus:outline-none" />
        {
          coverImg && coverImg.length > 0 ? (
            <Image
              src={coverImg[0].preview}
              fill
              alt="image uploaded"
              className="object-cover"
            />
          ) : (
            <div className="text-center flex flex-col justify-center items-center h-full gap-y-2 p-2">
              <ImagePlus size={32} className="text-sky-500" />
              <p className="text-sm text-zinc-400">Arraste e solte sua imagem aqui, ou <span className='text-sky-500'>clique</span> para selecionar um arquivo</p>
            </div>
          )
        }
      </div >

      {saveButton &&
        < Button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="w-fit self-end gap-x-2 disabled:pointer-events-auto disabled:cursor-not-allowed "
        >
          {isSubmitting ? <><LoaderCircle className="animate-spin" /> Salvando</> : 'Salvar'}
        </Button>
      }

      <hr />
    </section >
  )
}