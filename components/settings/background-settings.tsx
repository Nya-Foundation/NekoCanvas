"use client"

import type React from "react"

import type { CanvasConfig } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Upload, Trash2 } from "lucide-react"

interface BackgroundSettingsProps {
  config: CanvasConfig
  updateConfig: (updates: Partial<CanvasConfig>) => void
}

const patternOptions = [
  { value: "grid", label: "Grid" },
  { value: "dots", label: "Dots" },
  { value: "waves", label: "Waves" },
  { value: "zigzag", label: "Zigzag" },
  { value: "polka", label: "Polka Dots" },
  { value: "triangles", label: "Triangles" },
  { value: "hexagons", label: "Hexagons" },
  { value: "stripes", label: "Stripes" },
  { value: "confetti", label: "Confetti" },
  { value: "circuit", label: "Circuit" },
]

const presetOptions = [
  { value: "gradient-blue", label: "Blue Gradient" },
  { value: "gradient-lavender", label: "Lavender" },
  { value: "gradient-bluelavender", label: "Blue-Lavender" },
  { value: "gradient-sunset", label: "Sunset" },
  { value: "gradient-forest", label: "Forest" },
  { value: "gradient-candy", label: "Candy" },
  { value: "gradient-pastel", label: "Pastel" },
  { value: "gradient-neon", label: "Neon" },
  { value: "gradient-cosmic", label: "Cosmic" },
  { value: "gradient-midnight", label: "Midnight" },
  { value: "gradient-ocean", label: "Ocean" },
  { value: "gradient-fire", label: "Fire" },
  { value: "gradient-retro", label: "Retro" },
  { value: "gradient-tech", label: "Tech" },
  { value: "gradient-dreamy-blue", label: "Dreamy Blue" },
  { value: "gradient-pastel-dream", label: "Pastel Dream" },
  { value: "gradient-sky-dream", label: "Sky Dream" },
  { value: "gradient-twilight", label: "Twilight" },
]

const imageSizeOptions = [
  { value: "cover", label: "Cover" },
  { value: "contain", label: "Contain" },
  { value: "100% 100%", label: "Stretch" },
  { value: "auto", label: "Original" },
]

export function BackgroundSettings({ config, updateConfig }: BackgroundSettingsProps) {
  const updateBackground = (updates: Partial<typeof config.background>) => {
    updateConfig({
      background: { ...config.background, ...updates },
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        updateBackground({
          type: "image",
          imageUrl: event.target.result,
          imageSize: "cover",
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const removeBackgroundImage = () => {
    updateBackground({
      type: "preset",
      preset: "gradient-blue",
      imageUrl: undefined,
    })
  }

  return (
    <Card className="neko-card">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label>Background Type</Label>
          <RadioGroup
            value={config.background.type}
            onValueChange={(value) => updateBackground({ type: value as any })}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="color" id="bg-color" />
              <Label htmlFor="bg-color">Solid Color</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient" id="bg-gradient" />
              <Label htmlFor="bg-gradient">Gradient</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pattern" id="bg-pattern" />
              <Label htmlFor="bg-pattern">Pattern</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="preset" id="bg-preset" />
              <Label htmlFor="bg-preset">Preset</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="image" id="bg-image" />
              <Label htmlFor="bg-image">Image</Label>
            </div>
          </RadioGroup>
        </div>

        {config.background.type === "color" && (
          <div className="space-y-2">
            <Label>Background Color</Label>
            <ColorPicker color={config.background.color} onChange={(color) => updateBackground({ color })} />
          </div>
        )}

        {config.background.type === "gradient" && (
          <>
            <div className="space-y-2">
              <Label>Gradient Start Color</Label>
              <ColorPicker
                color={config.background.gradientStart}
                onChange={(color) => updateBackground({ gradientStart: color })}
              />
            </div>
            <div className="space-y-2">
              <Label>Gradient End Color</Label>
              <ColorPicker
                color={config.background.gradientEnd}
                onChange={(color) => updateBackground({ gradientEnd: color })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradientAngle">Gradient Angle (degrees)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="gradientAngle"
                  min={0}
                  max={360}
                  step={1}
                  value={[config.background.gradientAngle]}
                  onValueChange={(value) => updateBackground({ gradientAngle: value[0] })}
                  className="flex-1"
                />
                <span className="w-12 text-center">{config.background.gradientAngle}°</span>
              </div>
            </div>
          </>
        )}

        {config.background.type === "pattern" && (
          <>
            <div className="space-y-2">
              <Label>Pattern Type</Label>
              <Select
                value={config.background.pattern}
                onValueChange={(value) => updateBackground({ pattern: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  {patternOptions.map((pattern) => (
                    <SelectItem key={pattern.value} value={pattern.value}>
                      {pattern.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pattern Background Color</Label>
              <ColorPicker
                color={config.background.patternBackground}
                onChange={(color) => updateBackground({ patternBackground: color })}
              />
            </div>
          </>
        )}

        {config.background.type === "preset" && (
          <div className="space-y-2">
            <Label>Preset</Label>
            <Select
              value={config.background.preset}
              onValueChange={(value) => updateBackground({ preset: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                {presetOptions.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {config.background.type === "image" && (
          <>
            <div className="space-y-2">
              <Label>Background Image</Label>
              <div className="flex flex-col gap-4">
                {config.background.imageUrl && (
                  <div className="flex justify-center p-4 bg-muted/30 rounded-md">
                    <img
                      src={config.background.imageUrl || "/placeholder.svg"}
                      alt="Background Preview"
                      className="max-w-full max-h-24 object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <div className="flex gap-2">
                    <Input
                      id="bg-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("bg-upload")?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                    {config.background.imageUrl && (
                      <Button variant="outline" onClick={removeBackgroundImage} className="flex-shrink-0">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Image Size</Label>
              <Select
                value={config.background.imageSize || "cover"}
                onValueChange={(value) => updateBackground({ imageSize: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {imageSizeOptions.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image Filters</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="bgBlur"
                    checked={config.background.blur || false}
                    onCheckedChange={(checked) => updateBackground({ blur: checked })}
                  />
                  <Label htmlFor="bgBlur">Blur effect</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="bgGrayscale"
                    checked={config.background.grayscale || false}
                    onCheckedChange={(checked) => updateBackground({ grayscale: checked })}
                  />
                  <Label htmlFor="bgGrayscale">Grayscale</Label>
                </div>
              </div>
            </div>

            {config.background.blur && (
              <div className="space-y-2">
                <Label htmlFor="blurAmount">Blur Amount</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="blurAmount"
                    min={1}
                    max={20}
                    step={1}
                    value={[config.background.blurAmount || 5]}
                    onValueChange={(value) => updateBackground({ blurAmount: value[0] })}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{config.background.blurAmount || 5}px</span>
                </div>
              </div>
            )}
          </>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="bgOverlay"
              checked={config.background.overlay || false}
              onCheckedChange={(checked) => updateBackground({ overlay: checked })}
            />
            <Label htmlFor="bgOverlay">Add overlay</Label>
          </div>

          {config.background.overlay && (
            <div className="space-y-2">
              <Label>Overlay Color</Label>
              <ColorPicker
                color={config.background.overlayColor || "rgba(0, 0, 0, 0.3)"}
                onChange={(color) => updateBackground({ overlayColor: color })}
              />
              <div className="space-y-2">
                <Label htmlFor="overlayOpacity">Overlay Opacity</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="overlayOpacity"
                    min={0}
                    max={100}
                    step={1}
                    value={[config.background.overlayOpacity || 30]}
                    onValueChange={(value) => updateBackground({ overlayOpacity: value[0] })}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{config.background.overlayOpacity || 30}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
