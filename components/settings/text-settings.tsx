"use client";

import type { CanvasConfig } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker";

interface TextSettingsProps {
  config: CanvasConfig;
  updateConfig: (updates: Partial<CanvasConfig>) => void;
}

const fontOptions = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Open Sans, sans-serif", label: "Open Sans" },
  { value: "Playfair Display, serif", label: "Playfair Display" },
  { value: "Merriweather, serif", label: "Merriweather" },
  { value: "Courier New, monospace", label: "Courier New" },
  { value: "Consolas, monospace", label: "Consolas" },
  { value: "Comic Sans MS, cursive", label: "Comic Sans" },
];

const fontWeightOptions = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
  { value: "800", label: "Extrabold" },
  { value: "900", label: "Black" },
];

const textTransformOptions = [
  { value: "none", label: "None" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "capitalize", label: "Capitalize" },
];

const textEffectOptions = [
  { value: "none", label: "None" },
  { value: "gradient", label: "Gradient" },
  { value: "glow", label: "Glow" },
  { value: "outline", label: "Outline (Title only)" },
  { value: "shadow", label: "Shadow" },
  { value: "emboss", label: "Emboss" },
  { value: "3d", label: "3D" },
  { value: "retro", label: "Retro" },
  { value: "neon", label: "Neon Glow" },
  { value: "glitch", label: "Glitch" },
  { value: "blur", label: "Blur" },
  { value: "underline", label: "Underline" },
  { value: "strikethrough", label: "Strikethrough" },
  { value: "italic", label: "Italic" },
  { value: "highlight", label: "Highlight" },
];

const animationOptions = [
  { value: "none", label: "None" },
  { value: "float", label: "Float" },
  { value: "pulse-soft", label: "Pulse" },
  { value: "shimmer", label: "Shimmer" },
  { value: "bounce-subtle", label: "Bounce" },
  { value: "typing", label: "Typing" },
  { value: "fade-in", label: "Fade In" },
  { value: "glitch-anim", label: "Glitch" },
  { value: "wave", label: "Wave" },
];

export function TextSettings({ config, updateConfig }: TextSettingsProps) {
  const updateTitle = (updates: Partial<typeof config.title>) => {
    updateConfig({ title: { ...config.title, ...updates } });
  };

  const updateSubtitle = (updates: Partial<typeof config.subtitle>) => {
    updateConfig({ subtitle: { ...config.subtitle, ...updates } });
  };

  return (
    <Tabs defaultValue="title">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="title">Title</TabsTrigger>
        <TabsTrigger value="subtitle">Subtitle</TabsTrigger>
      </TabsList>

      <TabsContent value="title">
        <Card className="neko-card">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="titleVisible"
                checked={config.title.visible}
                onCheckedChange={(checked) => updateTitle({ visible: checked })}
              />
              <Label htmlFor="titleVisible">Show title</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleText">Title Text</Label>
              <Input
                id="titleText"
                value={config.title.text}
                onChange={(e) => updateTitle({ text: e.target.value })}
                placeholder="Project Title"
                className="neko-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleFont">Font Family</Label>
              <Select
                value={config.title.font}
                onValueChange={(value) => updateTitle({ font: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleWeight">Font Weight</Label>
              <Select
                value={config.title.weight.toString()}
                onValueChange={(value) =>
                  updateTitle({ weight: Number(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  {fontWeightOptions.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      {weight.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleSize">Font Size (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="titleSize"
                  min={16}
                  max={72}
                  step={1}
                  value={[config.title.size]}
                  onValueChange={(value) => updateTitle({ size: value[0] })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.title.size}
                  onChange={(e) =>
                    updateTitle({ size: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleSpacing">Spacing (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="titleSpacing"
                  min={0}
                  max={48}
                  step={1}
                  value={[config.title.spacing]}
                  onValueChange={(value) => updateTitle({ spacing: value[0] })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.title.spacing}
                  onChange={(e) =>
                    updateTitle({ spacing: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleOffsetX">Horizontal Position (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="titleOffsetX"
                  min={-800}
                  max={800}
                  step={1}
                  value={[config.title.offsetX || 0]}
                  onValueChange={(value) => updateTitle({ offsetX: value[0] })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.title.offsetX || 0}
                  onChange={(e) =>
                    updateTitle({ offsetX: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleOffsetY">Vertical Position (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="titleOffsetY"
                  min={-800}
                  max={800}
                  step={1}
                  value={[config.title.offsetY || 0]}
                  onValueChange={(value) => updateTitle({ offsetY: value[0] })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.title.offsetY || 0}
                  onChange={(e) =>
                    updateTitle({ offsetY: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleLetterSpacing">Letter Spacing</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="titleLetterSpacing"
                  min={-2}
                  max={10}
                  step={0.5}
                  value={[
                    config.title.letterSpacing
                      ? Number.parseFloat(config.title.letterSpacing.toString())
                      : 0,
                  ]}
                  onValueChange={(value) =>
                    updateTitle({ letterSpacing: `${value[0]}px` })
                  }
                  className="flex-1"
                />
                <span className="w-20 text-center">
                  {config.title.letterSpacing || "0px"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleTransform">Text Transform</Label>
              <Select
                value={config.title.transform || "none"}
                onValueChange={(value) => updateTitle({ transform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transform" />
                </SelectTrigger>
                <SelectContent>
                  {textTransformOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleEffect">Text Effect</Label>
              <Select
                value={config.title.effect || "none"}
                onValueChange={(value) => updateTitle({ effect: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
                <SelectContent>
                  {textEffectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {config.title.effect === "gradient" && (
              <>
                <div className="space-y-2">
                  <Label>Gradient Start Color</Label>
                  <ColorPicker
                    color={config.title.gradientStart || "#0ea5e9"}
                    onChange={(color) => updateTitle({ gradientStart: color })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gradient End Color</Label>
                  <ColorPicker
                    color={config.title.gradientEnd || "#9e3ce7"}
                    onChange={(color) => updateTitle({ gradientEnd: color })}
                  />
                </div>
              </>
            )}

            {config.title.effect === "glow" && (
              <div className="space-y-2">
                <Label>Glow Color</Label>
                <ColorPicker
                  color={config.title.glowColor || "rgba(56, 189, 248, 0.7)"}
                  onChange={(color) => updateTitle({ glowColor: color })}
                />
              </div>
            )}

            {config.title.effect === "outline" && (
              <div className="space-y-2">
                <Label>Outline Color</Label>
                <ColorPicker
                  color={config.title.outlineColor || "#000000"}
                  onChange={(color) => updateTitle({ outlineColor: color })}
                />
              </div>
            )}

            {config.title.effect !== "gradient" && (
              <div className="space-y-2">
                <Label htmlFor="titleColor">Text Color</Label>
                <ColorPicker
                  color={config.title.color}
                  onChange={(color) => updateTitle({ color })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="titleAnimation">Animation</Label>
              <Select
                value={config.title.animation || "none"}
                onValueChange={(value) => updateTitle({ animation: value })}
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
                id="titleShadow"
                checked={config.title.shadow}
                onCheckedChange={(checked) => updateTitle({ shadow: checked })}
              />
              <Label htmlFor="titleShadow">Text shadow</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="subtitle">
        <Card className="neko-card">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="subtitleVisible"
                checked={config.subtitle.visible}
                onCheckedChange={(checked) =>
                  updateSubtitle({ visible: checked })
                }
              />
              <Label htmlFor="subtitleVisible">Show subtitle</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleText">Subtitle Text</Label>
              <Input
                id="subtitleText"
                value={config.subtitle.text}
                onChange={(e) => updateSubtitle({ text: e.target.value })}
                placeholder="A short description of your awesome project"
                className="neko-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleFont">Font Family</Label>
              <Select
                value={config.subtitle.font}
                onValueChange={(value) => updateSubtitle({ font: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleWeight">Font Weight</Label>
              <Select
                value={config.subtitle.weight.toString()}
                onValueChange={(value) =>
                  updateSubtitle({ weight: Number(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  {fontWeightOptions.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      {weight.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleSize">Font Size (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="subtitleSize"
                  min={12}
                  max={48}
                  step={1}
                  value={[config.subtitle.size]}
                  onValueChange={(value) => updateSubtitle({ size: value[0] })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.subtitle.size}
                  onChange={(e) =>
                    updateSubtitle({ size: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleSpacing">Spacing (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="subtitleSpacing"
                  min={0}
                  max={48}
                  step={1}
                  value={[config.subtitle.spacing]}
                  onValueChange={(value) =>
                    updateSubtitle({ spacing: value[0] })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.subtitle.spacing}
                  onChange={(e) =>
                    updateSubtitle({ spacing: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleOffsetX">Horizontal Position (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="subtitleOffsetX"
                  min={-800}
                  max={800}
                  step={1}
                  value={[config.subtitle.offsetX || 0]}
                  onValueChange={(value) =>
                    updateSubtitle({ offsetX: value[0] })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.subtitle.offsetX || 0}
                  onChange={(e) =>
                    updateSubtitle({ offsetX: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleOffsetY">Vertical Position (px)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="subtitleOffsetY"
                  min={-800}
                  max={800}
                  step={1}
                  value={[config.subtitle.offsetY || 0]}
                  onValueChange={(value) =>
                    updateSubtitle({ offsetY: value[0] })
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={config.subtitle.offsetY || 0}
                  onChange={(e) =>
                    updateSubtitle({ offsetY: Number(e.target.value) })
                  }
                  className="w-20 neko-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleLetterSpacing">Letter Spacing</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="subtitleLetterSpacing"
                  min={-2}
                  max={10}
                  step={0.5}
                  value={[
                    config.subtitle.letterSpacing
                      ? Number.parseFloat(
                          config.subtitle.letterSpacing.toString()
                        )
                      : 0,
                  ]}
                  onValueChange={(value) =>
                    updateSubtitle({ letterSpacing: `${value[0]}px` })
                  }
                  className="flex-1"
                />
                <span className="w-20 text-center">
                  {config.subtitle.letterSpacing || "0px"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleTransform">Text Transform</Label>
              <Select
                value={config.subtitle.transform || "none"}
                onValueChange={(value) => updateSubtitle({ transform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transform" />
                </SelectTrigger>
                <SelectContent>
                  {textTransformOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitleEffect">Text Effect</Label>
              <Select
                value={config.subtitle.effect || "none"}
                onValueChange={(value) => updateSubtitle({ effect: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
                <SelectContent>
                  {textEffectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {config.subtitle.effect === "gradient" && (
              <>
                <div className="space-y-2">
                  <Label>Gradient Start Color</Label>
                  <ColorPicker
                    color={config.subtitle.gradientStart || "#0ea5e9"}
                    onChange={(color) =>
                      updateSubtitle({ gradientStart: color })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gradient End Color</Label>
                  <ColorPicker
                    color={config.subtitle.gradientEnd || "#9e3ce7"}
                    onChange={(color) => updateSubtitle({ gradientEnd: color })}
                  />
                </div>
              </>
            )}

            {config.subtitle.effect === "glow" && (
              <div className="space-y-2">
                <Label>Glow Color</Label>
                <ColorPicker
                  color={config.subtitle.glowColor || "rgba(56, 189, 248, 0.7)"}
                  onChange={(color) => updateSubtitle({ glowColor: color })}
                />
              </div>
            )}

            {config.subtitle.effect !== "gradient" && (
              <div className="space-y-2">
                <Label htmlFor="subtitleColor">Text Color</Label>
                <ColorPicker
                  color={config.subtitle.color}
                  onChange={(color) => updateSubtitle({ color })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subtitleAnimation">Animation</Label>
              <Select
                value={config.subtitle.animation || "none"}
                onValueChange={(value) => updateSubtitle({ animation: value })}
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
                id="subtitleShadow"
                checked={config.subtitle.shadow}
                onCheckedChange={(checked) =>
                  updateSubtitle({ shadow: checked })
                }
              />
              <Label htmlFor="subtitleShadow">Text shadow</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
