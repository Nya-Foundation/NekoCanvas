"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function WelcomeTooltip() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("nekocanvas-visited")
    if (!hasVisited) {
      setIsVisible(true)
      localStorage.setItem("nekocanvas-visited", "true")
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Card className="w-full max-w-md mx-4 shadow-xl animate-fade-in neko-glass-card neko-glow-purple">
        <CardContent className="p-8 relative overflow-hidden">
          <div className="absolute top-3 right-3">
            <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center mb-6 relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary/30 blur-xl animate-pulse-soft"></div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-secondary/30 blur-xl animate-pulse-soft"></div>

            <h2 className="text-2xl font-bold neko-gradient-text mb-2 relative z-10">Welcome to NekoCanvas!</h2>
            <p className="text-muted-foreground">Create stunning GitHub repository headers in minutes</p>
          </div>

          <div className="space-y-6 mt-8 relative">
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">1</span>
              </div>
              <div>
                <h3 className="font-medium">Customize Your Header</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust text, background, and logo settings to match your project's style
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">2</span>
              </div>
              <div>
                <h3 className="font-medium">Try Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Use our pre-designed templates or create your own unique style
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/20 p-2 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">3</span>
              </div>
              <div>
                <h3 className="font-medium">Export & Share</h3>
                <p className="text-sm text-muted-foreground">
                  Download your header as PNG or GIF and add it to your GitHub README
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full mt-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 neko-glow"
            onClick={() => setIsVisible(false)}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
