"use client";

import type { CanvasConfig } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface GeneralSettingsProps {
  config: CanvasConfig;
  updateConfig: (updates: Partial<CanvasConfig>) => void;
}

export function GeneralSettings({
  config,
  updateConfig,
}: GeneralSettingsProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="width"
              min={600}
              max={1200}
              step={10}
              value={[config.width]}
              onValueChange={(value) => updateConfig({ width: value[0] })}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.width}
              onChange={(e) => updateConfig({ width: Number(e.target.value) })}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">Height (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="height"
              min={200}
              max={600}
              step={10}
              value={[config.height]}
              onValueChange={(value) => updateConfig({ height: value[0] })}
              className="flex-1"
            />
            <Input
              type="number"
              value={config.height}
              onChange={(e) => updateConfig({ height: Number(e.target.value) })}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="borderRadius">Border Radius (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="borderRadius"
              min={0}
              max={32}
              step={1}
              value={[config.borderRadius]}
              onValueChange={(value) =>
                updateConfig({ borderRadius: value[0] })
              }
              className="flex-1"
            />
            <Input
              type="number"
              value={config.borderRadius}
              onChange={(e) =>
                updateConfig({ borderRadius: Number(e.target.value) })
              }
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="titleSubtitleGap">Title-Subtitle Gap (px)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="titleSubtitleGap"
              min={0}
              max={50}
              step={1}
              value={[config.titleSubtitleGap || 12]}
              onValueChange={(value) =>
                updateConfig({ titleSubtitleGap: value[0] })
              }
              className="flex-1"
            />
            <Input
              type="number"
              value={config.titleSubtitleGap || 12}
              onChange={(e) =>
                updateConfig({ titleSubtitleGap: Number(e.target.value) })
              }
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Layout</Label>
          <RadioGroup
            value={config.layout}
            onValueChange={(value) =>
              updateConfig({ layout: value as "horizontal" | "vertical" })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="horizontal" id="horizontal" />
              <Label htmlFor="horizontal">Horizontal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vertical" id="vertical" />
              <Label htmlFor="vertical">Vertical</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="previewBorder"
            checked={config.previewBorder}
            onCheckedChange={(checked) =>
              updateConfig({ previewBorder: checked })
            }
          />
          <Label htmlFor="previewBorder">Show preview border</Label>
        </div>
      </CardContent>
    </Card>
  );
}
