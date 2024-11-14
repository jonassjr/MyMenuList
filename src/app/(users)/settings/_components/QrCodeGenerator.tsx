"use client"

import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import { QRCodeCanvas } from "qrcode.react"
import { useRef } from "react"

interface QrCodeProps {
  pageName: string
}

export const QrCodeGenerator: React.FC<QrCodeProps> = ({ pageName }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/${pageName}`

  const handleDownload = () => {
    if (svgRef.current) {
      const svgElement = svgRef.current

      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgElement)

      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${pageName}-qrcode.svg`
      link.click()
    }
  }

  return (

    <article className="flex relative flex-col sm:flex-row gap-6 border rounded-lg p-4">
      <div className="rounded-lg w-full max-w-[350px] max-h-[380px] border aspect-square">
        <QRCodeSVG
          value={url}
          level="H"
          marginSize={2}
          className="min-w-full min-h-full"
          ref={svgRef}
        />
      </div>
      <div className="w-full flex flex-col justify-end pb-10">
        <h1 className="text-2xl font-medium">Download</h1>
        <p className="max-w-96 text-sm text-muted-foreground">
          Faça o download e use o código qr para compartilhar os seus menus.
        </p>
        <Button onClick={handleDownload} className="mt-4 w-fit">Download</Button>
      </div>
    </article>
  )
}