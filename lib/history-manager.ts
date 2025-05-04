import type { CanvasConfig } from "./types"

export class HistoryManager {
  private history: CanvasConfig[] = []
  private currentIndex = -1
  private maxHistorySize = 30

  constructor(initialState: CanvasConfig) {
    this.push(initialState)
  }

  push(state: CanvasConfig): void {
    // If we're not at the end of the history, remove all future states
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1)
    }

    // Add the new state
    this.history.push(JSON.parse(JSON.stringify(state)))
    this.currentIndex = this.history.length - 1

    // Limit history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift()
      this.currentIndex--
    }
  }

  undo(): CanvasConfig | null {
    if (this.currentIndex <= 0) return null
    this.currentIndex--
    return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
  }

  redo(): CanvasConfig | null {
    if (this.currentIndex >= this.history.length - 1) return null
    this.currentIndex++
    return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
  }

  canUndo(): boolean {
    return this.currentIndex > 0
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1
  }

  getCurrentState(): CanvasConfig {
    return JSON.parse(JSON.stringify(this.history[this.currentIndex]))
  }
}
