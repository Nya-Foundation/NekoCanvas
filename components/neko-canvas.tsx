"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CanvasPreview } from "@/components/canvas-preview";
import { GeneralSettings } from "@/components/settings/general-settings";
import { TextSettings } from "@/components/settings/text-settings";
import { BackgroundSettings } from "@/components/settings/background-settings";
import { LogoSettings } from "@/components/settings/logo-settings";
import { AdvancedSettings } from "@/components/settings/advanced-settings";
import { WelcomeTooltip } from "@/components/welcome-tooltip";
import {
  Download,
  ChevronUp,
  ChevronDown,
  Sparkles,
  FileImageIcon as FileGif,
  Undo,
  Redo,
  Copy,
  Code,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { defaultCanvasConfig } from "@/lib/default-config";
import type { CanvasConfig } from "@/lib/types";
import { HistoryManager } from "@/lib/history-manager";
import { ZoomControls } from "@/components/zoom-controls";
import { AnimeBackground } from "@/components/anime-background";
import { getAssetPath } from "@/lib/utils";

export function NekoCanvas() {
  const [config, setConfig] = useState<CanvasConfig>(defaultCanvasConfig);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [historyManager, setHistoryManager] = useState<HistoryManager | null>(
    null
  );
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [zoom, setZoom] = useState(100);

  // Initialize history manager
  useEffect(() => {
    setHistoryManager(new HistoryManager(defaultCanvasConfig));
  }, []);

  const updateConfig = (updates: Partial<CanvasConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates };
      if (historyManager) {
        historyManager.push(newConfig);
      }
      return newConfig;
    });
  };

  const hasAnimations = () => {
    return (
      (config.title.animation && config.title.animation !== "none") ||
      (config.subtitle.animation && config.subtitle.animation !== "none") ||
      (config.logo.animation && config.logo.animation !== "none")
    );
  };

  const handleUndo = () => {
    if (historyManager && historyManager.canUndo()) {
      const previousState = historyManager.undo();
      if (previousState) {
        setConfig(previousState);
      }
    }
  };

  const handleRedo = () => {
    if (historyManager && historyManager.canRedo()) {
      const nextState = historyManager.redo();
      if (nextState) {
        setConfig(nextState);
      }
    }
  };

  const exportAsImage = async () => {
    if (!canvasRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasRef.current, {
        scale: config.exportQuality || 2,
        backgroundColor: config.transparentBackground ? null : undefined,
        logging: false,
      });

      if (config.exportFormat === "gif" && hasAnimations()) {
        await exportAsGif();
        return;
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${config.title.text || "github-header"}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Success!",
        description: "Your header has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your header.",
        variant: "destructive",
      });
    }
  };

  const exportAsGif = async () => {
    if (!canvasRef.current) return;

    try {
      // Load libraries
      const html2canvas = (await import("html2canvas")).default;
      const GIF = (await import("gif.js")).default;

      toast({
        title: "Creating animated GIF...",
        description: "This may take a few moments.",
      });

      // Create GIF with better settings
      const gif = new GIF({
        workers: 2,
        quality: 5,
        width: config.width,
        height: config.height,
        workerScript: "/workers/gif.worker.js",
        transparent: config.transparentBackground ? "rgba(0,0,0,0)" : undefined,
      });

      // Animation settings
      const totalFrames = 20;
      const animationDuration = 2000; // ms total
      const frameDelay = Math.floor(animationDuration / totalFrames);

      // Get the animation container
      const animationContainer = canvasRef.current;

      // Simply capture frames of the naturally running animations
      for (let currentFrame = 0; currentFrame < totalFrames; currentFrame++) {
        // Capture the current state of animations
        const canvas = await html2canvas(animationContainer, {
          scale: 1,
          backgroundColor: config.transparentBackground ? null : undefined,
          logging: false,
          allowTaint: true,
          useCORS: true,
        });

        // Add to GIF with appropriate delay
        gif.addFrame(canvas, {
          delay: frameDelay,
          copy: true,
        });

        // Wait for next animation frame
        await new Promise((resolve) => setTimeout(resolve, frameDelay));
      }

      // Begin rendering the GIF
      gif.render();

      // Handle GIF completion
      gif.on("finished", (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${config.title.text || "github-header"}.gif`;
        link.href = url;
        link.click();

        // Clean up
        URL.revokeObjectURL(url);

        toast({
          title: "Success!",
          description: "Your animated GIF has been downloaded.",
        });
      });
    } catch (error) {
      console.error("GIF export error:", error);
      toast({
        title: "GIF export failed",
        description: "There was an error creating your animated GIF.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasRef.current, {
        scale: config.exportQuality || 2,
        backgroundColor: config.transparentBackground ? null : undefined,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);

          toast({
            title: "Copied!",
            description: "Your header has been copied to clipboard.",
          });
        }
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "There was an error copying your header.",
        variant: "destructive",
      });
    }
  };

  const copyMarkdownToClipboard = async () => {
    if (!canvasRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasRef.current, {
        scale: config.exportQuality || 2,
        backgroundColor: config.transparentBackground ? null : undefined,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");

      // Create a temporary link to download the image
      const link = document.createElement("a");
      link.download = `${config.title.text || "github-header"}.png`;
      link.href = dataUrl;
      link.click();

      // Generate markdown for GitHub
      const markdown = `![${config.title.text || "GitHub Header"}](${
        link.download
      })`;

      // Copy to clipboard
      await navigator.clipboard.writeText(markdown);

      toast({
        title: "Markdown copied!",
        description: "Image downloaded and markdown copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "There was an error copying the markdown.",
        variant: "destructive",
      });
    }
  };

  // Apply a random preset when first loading
  useEffect(() => {
    const presets = [
      "gradient-blue",
      "gradient-lavender",
      "gradient-bluelavender",
      "gradient-candy",
      "gradient-neon",
    ];
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];

    setConfig((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        type: "preset",
        preset: randomPreset,
      },
    }));
  }, []);

  return (
    <div className="flex flex-col h-screen neko-theme-light">
      {/* Welcome tooltip */}
      <WelcomeTooltip />

      {/* Animated background */}
      <AnimeBackground />

      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center border-b border-border/50 bg-background/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={getAssetPath("/logo.svg")}
              alt="NekoCanvas Logo"
              className="h-16 w-16"
            />
            <div className="absolute -top-1 -right-1 h-3 w-3"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold neko-gradient-text">
              NekoCanvas
            </h1>
            <p className="text-xs text-muted-foreground">
              GitHub Repository Header Generator
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 mr-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleUndo}
              disabled={!historyManager?.canUndo()}
              className="h-8 w-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRedo}
              disabled={!historyManager?.canRedo()}
              className="h-8 w-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyMarkdownToClipboard}
            className="gap-1.5 hidden sm:flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">Markdown</span>
          </Button>
          <Button
            size="sm"
            onClick={exportAsImage}
            className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 neko-glow"
          >
            {config.exportFormat === "gif" && hasAnimations() ? (
              <FileGif className="h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {config.exportFormat === "gif" && hasAnimations()
                ? "Export GIF"
                : "Download"}
            </span>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center z-10">
        <div className="w-full max-w-5xl mx-auto">
          <Card className="neko-glass-card neko-glow overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="flex justify-end w-full mb-2">
                <ZoomControls onZoomChange={setZoom} defaultZoom={100} />
              </div>
              <div
                className="w-full overflow-auto neko-scrollbar"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "center top",
                  transition: "transform 0.2s ease-out",
                }}
              >
                <CanvasPreview config={config} ref={canvasRef} />
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all animate-dreamy-float"
            >
              {settingsOpen ? (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Hide Settings
                </>
              ) : (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Settings Panel */}
      <div
        className={`settings-panel transition-all duration-300 ease-in-out ${
          settingsOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto py-4 px-4">
          <Tabs defaultValue="general" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="grid grid-cols-5 w-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl">
                <TabsTrigger value="general" className="neko-tab">
                  General
                </TabsTrigger>
                <TabsTrigger value="text" className="neko-tab">
                  Text
                </TabsTrigger>
                <TabsTrigger value="background" className="neko-tab">
                  Background
                </TabsTrigger>
                <TabsTrigger value="logo" className="neko-tab">
                  Logo
                </TabsTrigger>
                <TabsTrigger value="advanced" className="neko-tab">
                  Advanced
                </TabsTrigger>
              </TabsList>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const templates = [
                    "gradient-dreamy-blue",
                    "gradient-pastel-dream",
                    "gradient-sky-dream",
                    "gradient-twilight",
                    "gradient-bluelavender",
                  ];
                  const randomPreset =
                    templates[Math.floor(Math.random() * templates.length)];

                  setConfig((prev) => ({
                    ...prev,
                    background: {
                      ...prev.background,
                      type: "preset",
                      preset: randomPreset,
                    },
                  }));

                  toast({
                    title: "Random style applied!",
                    description: "Try different styles with one click.",
                  });
                }}
                className="gap-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 text-secondary animate-sparkle-fade" />
                <span>Random Style</span>
              </Button>
            </div>
            <div className="h-[300px] overflow-y-auto neko-scrollbar pr-2">
              <TabsContent value="general">
                <GeneralSettings config={config} updateConfig={updateConfig} />
              </TabsContent>
              <TabsContent value="text">
                <TextSettings config={config} updateConfig={updateConfig} />
              </TabsContent>
              <TabsContent value="background">
                <BackgroundSettings
                  config={config}
                  updateConfig={updateConfig}
                />
              </TabsContent>
              <TabsContent value="logo">
                <LogoSettings config={config} updateConfig={updateConfig} />
              </TabsContent>
              <TabsContent value="advanced">
                <AdvancedSettings config={config} updateConfig={updateConfig} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
