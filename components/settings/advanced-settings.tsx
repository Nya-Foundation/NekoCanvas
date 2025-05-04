"use client"

import type { CanvasConfig } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { defaultCanvasConfig } from "@/lib/default-config"
import { Sparkles, Wand2 } from "lucide-react"

interface AdvancedSettingsProps {
  config: CanvasConfig
  updateConfig: (updates: Partial<CanvasConfig>) => void
}

const templates = [
  { id: "minimal", name: "Minimal" },
  { id: "modern", name: "Modern" },
  { id: "gradient", name: "Gradient" },
  { id: "dark", name: "Dark Mode" },
  { id: "pattern", name: "Pattern" },
  { id: "kawaii", name: "Kawaii" },
  { id: "neon", name: "Neon" },
  { id: "pastel", name: "Pastel" },
  { id: "cosmic", name: "Cosmic" },
  { id: "tech", name: "Tech" },
  { id: "elegant", name: "Elegant" },
  { id: "vibrant", name: "Vibrant" },
  { id: "retro", name: "Retro" },
  { id: "minimalist", name: "Minimalist" },
  { id: "glassmorphism", name: "Glassmorphism" },
  { id: "anime-dream", name: "Anime Dream" },
]

export function AdvancedSettings({ config, updateConfig }: AdvancedSettingsProps) {
  const applyTemplate = (templateId: string) => {
    switch (templateId) {
      case "minimal":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "color",
            color: "#ffffff",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#000000",
            size: 36,
            weight: 600,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#666666",
            size: 18,
            weight: 400,
          },
        })
        break
      case "modern":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "gradient",
            gradientStart: "#f8fafc",
            gradientEnd: "#e2e8f0",
            gradientAngle: 135,
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#0f172a",
            size: 42,
            weight: 700,
            shadow: true,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#334155",
            size: 20,
            weight: 500,
          },
        })
        break
      case "gradient":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "preset",
            preset: "gradient-bluelavender",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#ffffff",
            size: 48,
            weight: 800,
            shadow: true,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#f8fafc",
            size: 22,
            weight: 500,
            shadow: true,
          },
        })
        break
      case "dark":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "color",
            color: "#0f172a",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#f8fafc",
            size: 40,
            weight: 700,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#94a3b8",
            size: 20,
            weight: 400,
          },
        })
        break
      case "pattern":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "pattern",
            pattern: "grid",
            patternBackground: "#f1f5f9",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#0f172a",
            size: 38,
            weight: 700,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#334155",
            size: 19,
            weight: 500,
          },
        })
        break
      case "kawaii":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "preset",
            preset: "gradient-lavender",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#ffffff",
            size: 44,
            weight: 800,
            effect: "glow",
            glowColor: "rgba(181, 97, 245, 0.7)",
            shadow: true,
            font: "Comic Sans MS, cursive",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#ffffff",
            size: 20,
            weight: 500,
            shadow: true,
            font: "Comic Sans MS, cursive",
          },
          logo: {
            ...defaultCanvasConfig.logo,
            shadow: true,
            animation: "float",
          },
        })
        break
      case "neon":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "color",
            color: "#0f172a",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#ffffff",
            size: 46,
            weight: 800,
            effect: "glow",
            glowColor: "rgba(56, 189, 248, 0.8)",
            font: "Montserrat, sans-serif",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#38bdf8",
            size: 20,
            weight: 500,
            effect: "glow",
            glowColor: "rgba(56, 189, 248, 0.5)",
            font: "Montserrat, sans-serif",
          },
          logo: {
            ...defaultCanvasConfig.logo,
            shadow: true,
            animation: "pulse-soft",
          },
        })
        break
      case "pastel":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "preset",
            preset: "gradient-pastel",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#0f172a",
            size: 42,
            weight: 700,
            font: "Poppins, sans-serif",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#334155",
            size: 18,
            weight: 400,
            font: "Poppins, sans-serif",
          },
          logo: {
            ...defaultCanvasConfig.logo,
            border: true,
            borderColor: "#ffffff",
            borderWidth: 3,
          },
        })
        break
      case "cosmic":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "gradient",
            gradientStart: "#0c4a6e",
            gradientEnd: "#3e0764",
            gradientAngle: 135,
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#ffffff",
            size: 48,
            weight: 800,
            effect: "glow",
            glowColor: "rgba(181, 97, 245, 0.7)",
            shadow: true,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#e0f2fe",
            size: 20,
            weight: 500,
            shadow: true,
          },
        })
        break
      case "tech":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "gradient",
            gradientStart: "#0f172a",
            gradientEnd: "#1e293b",
            gradientAngle: 120,
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#38bdf8",
            size: 44,
            weight: 700,
            effect: "glow",
            glowColor: "rgba(56, 189, 248, 0.7)",
            font: "Consolas, monospace",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#94a3b8",
            size: 18,
            weight: 400,
            font: "Consolas, monospace",
          },
        })
        break
      case "elegant":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "color",
            color: "#ffffff",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#1e293b",
            size: 46,
            weight: 300,
            font: "Playfair Display, serif",
            letterSpacing: "2px",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#64748b",
            size: 18,
            weight: 300,
            font: "Playfair Display, serif",
            letterSpacing: "1px",
          },
        })
        break
      case "vibrant":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "gradient",
            gradientStart: "#f43f5e",
            gradientEnd: "#8b5cf6",
            gradientAngle: 135,
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#ffffff",
            size: 48,
            weight: 800,
            shadow: true,
            effect: "glow",
            glowColor: "rgba(244, 63, 94, 0.7)",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#f8fafc",
            size: 20,
            weight: 500,
            shadow: true,
          },
        })
        break
      case "retro":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "preset",
            preset: "gradient-retro",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#f8fafc",
            size: 42,
            weight: 700,
            effect: "retro",
            font: "Courier New, monospace",
            transform: "uppercase",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#f8fafc",
            size: 18,
            weight: 400,
            font: "Courier New, monospace",
          },
        })
        break
      case "minimalist":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "color",
            color: "#f8fafc",
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#0f172a",
            size: 36,
            weight: 500,
            font: "Inter, sans-serif",
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#64748b",
            size: 16,
            weight: 400,
            font: "Inter, sans-serif",
          },
        })
        break
      case "glassmorphism":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "image",
            imageUrl: "/abstract-digital-pattern.png",
            blur: true,
            blurAmount: 8,
            overlay: true,
            overlayColor: "rgba(255, 255, 255, 0.25)",
            overlayOpacity: 50,
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#ffffff",
            size: 44,
            weight: 700,
            shadow: true,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#f8fafc",
            size: 18,
            weight: 400,
            shadow: true,
          },
        })
        break
      case "anime-dream":
        updateConfig({
          ...defaultCanvasConfig,
          background: {
            ...defaultCanvasConfig.background,
            type: "gradient",
            gradientStart: "#bae6fd",
            gradientEnd: "#c4b5fd",
            gradientAngle: 135,
            overlay: true,
            overlayColor: "rgba(255, 255, 255, 0.15)",
            overlayOpacity: 40,
          },
          title: {
            ...defaultCanvasConfig.title,
            color: "#1e3a8a",
            size: 48,
            weight: 700,
            font: "Poppins, sans-serif",
            effect: "glow",
            glowColor: "rgba(56, 189, 248, 0.7)",
            shadow: true,
          },
          subtitle: {
            ...defaultCanvasConfig.subtitle,
            color: "#334155",
            size: 20,
            weight: 500,
            font: "Poppins, sans-serif",
          },
          logo: {
            ...defaultCanvasConfig.logo,
            shadow: true,
            animation: "floating-light",
            border: true,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        })
        break
    }
  }

  const resetConfig = () => {
    updateConfig(defaultCanvasConfig)
  }

  const applyRandomStyle = () => {
    // Generate random colors
    const hue1 = Math.floor(Math.random() * 360)
    const hue2 = (hue1 + Math.floor(Math.random() * 60) + 30) % 360

    const gradientStart = `hsl(${hue1}, 80%, 65%)`
    const gradientEnd = `hsl(${hue2}, 80%, 55%)`

    // Random layout
    const layout = Math.random() > 0.5 ? "horizontal" : "vertical"

    // Random title effect
    const titleEffects = ["none", "gradient", "glow"]
    const titleEffect = titleEffects[Math.floor(Math.random() * titleEffects.length)]

    // Random logo animation
    const logoAnimations = ["none", "float", "pulse-soft", "rotate-slow"]
    const logoAnimation = logoAnimations[Math.floor(Math.random() * logoAnimations.length)]

    updateConfig({
      ...config,
      layout,
      background: {
        ...config.background,
        type: "gradient",
        gradientStart,
        gradientEnd,
        gradientAngle: Math.floor(Math.random() * 360),
      },
      title: {
        ...config.title,
        effect: titleEffect as any,
        gradientStart,
        gradientEnd,
        glowColor: `${gradientStart}cc`,
      },
      logo: {
        ...config.logo,
        animation: logoAnimation,
      },
    })
  }

  return (
    <Card className="neko-card">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <Label>Templates</Label>
            <Button variant="ghost" size="sm" onClick={applyRandomStyle} className="flex items-center gap-1.5">
              <Wand2 className="h-4 w-4 text-secondary" />
              <span>Random</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                onClick={() => applyTemplate(template.id)}
                className="justify-start"
              >
                {template.id === "kawaii" && <Sparkles className="mr-2 h-4 w-4 text-lavender-400" />}
                {template.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content Padding (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              min={0}
              max={80}
              step={4}
              value={[config.contentPadding || 40]}
              onValueChange={(value) => updateConfig({ contentPadding: value[0] })}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.contentPadding || 40}
              onChange={(e) => updateConfig({ contentPadding: Number(e.target.value) })}
              className="w-20 neko-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Export Quality</Label>
          <Select
            value={config.exportQuality?.toString() || "2"}
            onValueChange={(value) => updateConfig({ exportQuality: Number(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Standard (1x)</SelectItem>
              <SelectItem value="2">High (2x)</SelectItem>
              <SelectItem value="3">Ultra (3x)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Export Format</Label>
          <Select
            value={config.exportFormat || "png"}
            onValueChange={(value) => updateConfig({ exportFormat: value as "png" | "gif" })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG Image</SelectItem>
              <SelectItem value="gif">GIF Animation</SelectItem>
            </SelectContent>
          </Select>
          {config.exportFormat === "gif" && (
            <div className="text-xs text-muted-foreground mt-1">GIF export is available when animations are used</div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="transparentBackground"
            checked={config.transparentBackground || false}
            onCheckedChange={(checked) => updateConfig({ transparentBackground: checked })}
          />
          <Label htmlFor="transparentBackground">Transparent background when exporting</Label>
        </div>

        <Button variant="outline" onClick={resetConfig} className="w-full">
          Reset All Settings
        </Button>
      </CardContent>
    </Card>
  )
}
