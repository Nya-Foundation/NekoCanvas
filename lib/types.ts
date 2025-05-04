export interface TextConfig {
  visible: boolean
  text: string
  font: string
  size: number
  weight: number
  color: string
  spacing: number
  shadow: boolean
  letterSpacing?: string
  lineHeight?: string
  transform?: string
  effect?: string
  gradientStart?: string
  gradientEnd?: string
  glowColor?: string
  outlineColor?: string
  animation?: string
  offsetX?: number
  offsetY?: number
}

export interface BackgroundConfig {
  type: "color" | "gradient" | "pattern" | "preset" | "image"
  color: string
  gradientStart: string
  gradientEnd: string
  gradientAngle: number
  pattern: "grid" | "dots" | "waves" | "zigzag" | "polka"
  patternBackground: string
  preset: string
  imageUrl?: string
  imageSize?: string
  blur?: boolean
  blurAmount?: number
  grayscale?: boolean
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
}

export interface LogoConfig {
  visible: boolean
  url: string | null
  size: number
  shape: "square" | "circle"
  borderRadius: number
  position: "left" | "right"
  offsetX: number
  offsetY: number
  objectFit?: string
  filter?: string
  animation?: string
  shadow?: boolean
  border?: boolean
  borderWidth?: number
  borderColor?: string
  opacity?: number
}

export interface CanvasConfig {
  width: number;
  height: number;
  borderRadius: number;
  layout: "vertical" | "horizontal"; 
  contentPadding?: number;
  titleSubtitleGap?: number;
  previewBorder?: boolean;
  isExporting?: boolean; // Flag for GIF export mode
  exportQuality?: number;
  exportFormat?: "png" | "gif";
  transparentBackground?: boolean;
  title: TextConfig;
  subtitle: TextConfig;
  background: BackgroundConfig;
  logo: LogoConfig;
}
