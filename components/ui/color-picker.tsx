"use client";

import type React from "react";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [localColor, setLocalColor] = useState(color);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value);
    onChange(e.target.value);
  };

  const presetColors = [
    "#000000",
    "#ffffff",
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#0f172a",
    "#1e293b",
    "#334155",
    "#475569",
    "#64748b",
    "#94a3b8",
    "#cbd5e1",
    "#ef4444",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start", className)}
          style={{ backgroundColor: localColor }}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: localColor }}
            />
            <span className={localColor === "#ffffff" ? "text-black" : ""}>
              {localColor}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              type="color"
              value={localColor}
              onChange={handleColorChange}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label>Hex</Label>
            <Input
              value={localColor}
              onChange={handleColorChange}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>Presets</Label>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className={cn(
                    "h-6 w-6 rounded-md border",
                    presetColor === localColor && "ring-2 ring-primary"
                  )}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => {
                    setLocalColor(presetColor);
                    onChange(presetColor);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
