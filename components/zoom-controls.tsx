"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"

interface ZoomControlsProps {
  onZoomChange: (zoom: number) => void
  defaultZoom?: number
}

export function ZoomControls({ onZoomChange, defaultZoom = 100 }: ZoomControlsProps) {
  const [zoom, setZoom] = useState(defaultZoom)

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0]
    setZoom(newZoom)
    onZoomChange(newZoom)
  }

  const zoomIn = () => {
    const newZoom = Math.min(zoom + 10, 200)
    setZoom(newZoom)
    onZoomChange(newZoom)
  }

  const zoomOut = () => {
    const newZoom = Math.max(zoom - 10, 50)
    setZoom(newZoom)
    onZoomChange(newZoom)
  }

  const resetZoom = () => {
    setZoom(100)
    onZoomChange(100)
  }

  return (
    <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-lg shadow-sm">
      <Button variant="ghost" size="icon" onClick={zoomOut} className="h-8 w-8">
        <ZoomOut className="h-4 w-4" />
      </Button>

      <Slider min={50} max={200} step={5} value={[zoom]} onValueChange={handleZoomChange} className="w-24" />

      <Button variant="ghost" size="icon" onClick={zoomIn} className="h-8 w-8">
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" onClick={resetZoom} className="h-8 w-8">
        <Maximize className="h-4 w-4" />
      </Button>

      <span className="text-xs font-medium ml-1">{zoom}%</span>
    </div>
  )
}
