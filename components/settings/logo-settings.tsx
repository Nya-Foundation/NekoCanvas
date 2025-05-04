"use client";

import type React from "react";

import type { CanvasConfig } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";

interface LogoSettingsProps {
  config: CanvasConfig;
  updateConfig: (updates: Partial<CanvasConfig>) => void;
}

const objectFitOptions = [
  { value: "cover", label: "Cover" },
  { value: "contain", label: "Contain" },
  { value: "fill", label: "Fill" },
  { value: "scale-down", label: "Scale Down" },
];

const filterOptions = [
  { value: "none", label: "None" },
  { value: "grayscale", label: "Grayscale" },
  { value: "sepia", label: "Sepia" },
  { value: "invert", label: "Invert" },
  { value: "brightness-110", label: "Brighten" },
  { value: "contrast-125", label: "Increase Contrast" },
  { value: "saturate-150", label: "Saturate" },
  { value: "hue-rotate-90", label: "Hue Rotate" },
  { value: "blur-sm", label: "Blur" },
  { value: "drop-shadow", label: "Drop Shadow" },
  { value: "duotone", label: "Duotone" },
  { value: "glitch-filter", label: "Glitch" },
  { value: "hologram", label: "Hologram" },
  { value: "noise", label: "Noise" },
];

const animationOptions = [
  { value: "none", label: "None" },
  { value: "float", label: "Float" },
  { value: "pulse-soft", label: "Pulse" },
  { value: "rotate-slow", label: "Rotate" },
  { value: "bounce-subtle", label: "Bounce" },
  { value: "sparkle", label: "Sparkle" },
  { value: "shake", label: "Shake" },
  { value: "flip", label: "Flip" },
  { value: "morph", label: "Morph" },
  { value: "zoom", label: "Zoom" },
];

export function LogoSettings({ config, updateConfig }: LogoSettingsProps) {
  const updateLogo = (updates: Partial<typeof config.logo>) => {
    updateConfig({
      logo: { ...config.logo, ...updates },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        updateLogo({ url: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    updateLogo({ url: null });
  };

  return (
    <Card className="neko-card">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="logoVisible"
            checked={config.logo.visible}
            onCheckedChange={(checked) => updateLogo({ visible: checked })}
          />
          <Label htmlFor="logoVisible">Show logo</Label>
        </div>

        <div className="space-y-2">
          <Label>Logo Image</Label>
          <div className="flex flex-col gap-4">
            {config.logo.url && (
              <div className="flex justify-center p-4 bg-muted/30 rounded-md">
                <img
                  src={config.logo.url || "/placeholder.svg"}
                  alt="Logo Preview"
                  className="max-w-full max-h-24 object-contain"
                  style={{
                    borderRadius:
                      config.logo.shape === "circle"
                        ? "50%"
                        : `${config.logo.borderRadius}px`,
                  }}
                />
              </div>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="logo-upload">Upload Logo</Label>
              <div className="flex gap-2">
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                {config.logo.url && (
                  <Button
                    variant="outline"
                    onClick={removeLogo}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Logo Shape</Label>
          <RadioGroup
            value={config.logo.shape}
            onValueChange={(value) =>
              updateLogo({ shape: value as "square" | "circle" })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="square" id="logo-square" />
              <Label htmlFor="logo-square">Square</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="circle" id="logo-circle" />
              <Label htmlFor="logo-circle">Circle</Label>
            </div>
          </RadioGroup>
        </div>

        {config.logo.shape === "square" && (
          <div className="space-y-2">
            <Label htmlFor="logoBorderRadius">Border Radius (px)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="logoBorderRadius"
                min={0}
                max={24}
                step={1}
                value={[config.logo.borderRadius]}
                onValueChange={(value) =>
                  updateLogo({ borderRadius: value[0] })
                }
                className="flex-1"
              />
              <Input
                type="number"
                value={config.logo.borderRadius}
                onChange={(e) =>
                  updateLogo({ borderRadius: Number(e.target.value) })
                }
                className="w-20 neko-input"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="logoSize">Size (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="logoSize"
              min={32}
              max={200}
              step={1}
              value={[config.logo.size]}
              onValueChange={(value) => updateLogo({ size: value[0] })}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.logo.size}
              onChange={(e) => updateLogo({ size: Number(e.target.value) })}
              className="w-20 neko-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Logo Position</Label>
          <RadioGroup
            value={config.logo.position}
            onValueChange={(value) =>
              updateLogo({ position: value as "left" | "right" })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="left" id="logo-left" />
              <Label htmlFor="logo-left">Left</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="right" id="logo-right" />
              <Label htmlFor="logo-right">Right</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoOffsetX">X Offset (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="logoOffsetX"
              min={-1000}
              max={1000}
              step={1}
              value={[config.logo.offsetX]}
              onValueChange={(value) => updateLogo({ offsetX: value[0] })}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.logo.offsetX}
              onChange={(e) => updateLogo({ offsetX: Number(e.target.value) })}
              className="w-20 neko-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoOffsetY">Y Offset (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="logoOffsetY"
              min={-1000}
              max={1000}
              step={1}
              value={[config.logo.offsetY]}
              onValueChange={(value) => updateLogo({ offsetY: value[0] })}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.logo.offsetY}
              onChange={(e) => updateLogo({ offsetY: Number(e.target.value) })}
              className="w-20 neko-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoObjectFit">Object Fit</Label>
          <Select
            value={config.logo.objectFit || "cover"}
            onValueChange={(value) => updateLogo({ objectFit: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select object fit" />
            </SelectTrigger>
            <SelectContent>
              {objectFitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoFilter">Filter Effect</Label>
          <Select
            value={config.logo.filter || "none"}
            onValueChange={(value) => updateLogo({ filter: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoAnimation">Animation</Label>
          <Select
            value={config.logo.animation || "none"}
            onValueChange={(value) => updateLogo({ animation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select animation" />
            </SelectTrigger>
            <SelectContent>
              {animationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="logoShadow"
            checked={config.logo.shadow || false}
            onCheckedChange={(checked) => updateLogo({ shadow: checked })}
          />
          <Label htmlFor="logoShadow">Add shadow</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="logoBorder"
            checked={config.logo.border || false}
            onCheckedChange={(checked) => updateLogo({ border: checked })}
          />
          <Label htmlFor="logoBorder">Add border</Label>
        </div>

        {config.logo.border && (
          <>
            <div className="space-y-2">
              <Label htmlFor="logoBorderWidth">Border Width (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="logoBorderWidth"
                  min={1}
                  max={10}
                  step={1}
                  value={[config.logo.borderWidth || 2]}
                  onValueChange={(value) =>
                    updateLogo({ borderWidth: value[0] })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.logo.borderWidth || 2}
                  onChange={(e) =>
                    updateLogo({ borderWidth: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Border Color</Label>
              <ColorPicker
                color={config.logo.borderColor || "#ffffff"}
                onChange={(color) => updateLogo({ borderColor: color })}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Logo Opacity</Label>
          <div className="flex items-center gap-4">
            <Slider
              min={10}
              max={100}
              step={5}
              value={[config.logo.opacity || 100]}
              onValueChange={(value) => updateLogo({ opacity: value[0] })}
              className="flex-1"
            />
            <span className="w-12 text-center">
              {config.logo.opacity || 100}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
