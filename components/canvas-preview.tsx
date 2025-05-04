"use client";

import type React from "react";

import { forwardRef } from "react";
import type { CanvasConfig } from "@/lib/types";

interface CanvasPreviewProps {
  config: CanvasConfig;
}

export const CanvasPreview = forwardRef<HTMLDivElement, CanvasPreviewProps>(
  ({ config }, ref) => {
    const {
      width,
      height,
      borderRadius,
      layout,
      background,
      title,
      subtitle,
      logo,
      isExporting = false, // Add default value for isExporting
    } = config;

    // Background style
    const backgroundStyle: React.CSSProperties = {};

    if (background.type === "color") {
      backgroundStyle.backgroundColor = background.color;
    } else if (background.type === "gradient") {
      backgroundStyle.background = `linear-gradient(${background.gradientAngle}deg, ${background.gradientStart} 0%, ${background.gradientEnd} 100%)`;
    } else if (background.type === "preset") {
      backgroundStyle.className = background.preset;
    } else if (background.type === "pattern") {
      backgroundStyle.className = `pattern-${background.pattern}`;
      backgroundStyle.backgroundColor = background.patternBackground;
    } else if (background.type === "image" && background.imageUrl) {
      backgroundStyle.backgroundImage = `url(${background.imageUrl})`;
      backgroundStyle.backgroundSize = background.imageSize || "cover";
      backgroundStyle.backgroundPosition = "center";
      backgroundStyle.backgroundRepeat = "no-repeat";

      if (background.blur) {
        backgroundStyle.filter = `blur(${background.blurAmount || 5}px)`;
      }

      if (background.grayscale) {
        backgroundStyle.filter =
          (backgroundStyle.filter || "") + " grayscale(100%)";
      }
    }

    // Logo style
    const logoStyle: React.CSSProperties = {
      width: `${logo.size}px`,
      height: `${logo.size}px`,
      borderRadius: logo.shape === "circle" ? "50%" : `${logo.borderRadius}px`,
      objectFit: logo.objectFit || "cover",
      objectPosition: "center",
      boxShadow: logo.shadow ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
      border: logo.border
        ? `${logo.borderWidth || 2}px solid ${logo.borderColor || "#ffffff"}`
        : "none",
      transition: "all 0.3s ease",
      opacity: (logo.opacity || 100) / 100,
      maxWidth: "none", // Prevent max-width constraints
      maxHeight: "none", // Prevent max-height constraints
    };

    // Text container style based on layout
    const textContainerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: layout === "vertical" ? "column" : "row",
      alignItems: layout === "vertical" ? "flex-start" : "baseline",
      gap: `${config.titleSubtitleGap || title.spacing}px`,
      position: "relative", // Add position relative to contain absolutely positioned elements
      width: "100%", // Ensure the container takes full width
    };

    // Apply text effects
    const getTitleStyle = () => {
      const style: React.CSSProperties = {
        margin: 0,
        fontSize: `${title.size}px`,
        fontWeight: title.weight,
        color: title.color,
        fontFamily: title.font,
        textShadow: title.shadow ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
        letterSpacing: title.letterSpacing || "normal",
        lineHeight: title.lineHeight || "1.2",
        textTransform: title.transform || "none",
        transition: "all 0.3s ease",
        position: "relative", // Use relative positioning
      };

      // Apply transform separately to avoid conflicts with animations
      if ((title.offsetX || 0) !== 0 || (title.offsetY || 0) !== 0) {
        style.transform = `translate(${title.offsetX || 0}px, ${
          title.offsetY || 0
        }px)`;
      }

      if (title.effect === "gradient") {
        style.background = `linear-gradient(to right, ${
          title.gradientStart || "#0ea5e9"
        }, ${title.gradientEnd || "#9e3ce7"})`;
        style.WebkitBackgroundClip = "text";
        style.WebkitTextFillColor = "transparent";
        style.backgroundClip = "text";
      } else if (title.effect === "glow") {
        style.textShadow = `0 0 10px ${
          title.glowColor || "rgba(56, 189, 248, 0.7)"
        }, 0 0 20px ${title.glowColor || "rgba(56, 189, 248, 0.5)"}`;
      } else if (title.effect === "outline") {
        style.WebkitTextStroke = `1px ${title.outlineColor || "#000000"}`;
        style.color = title.color || "#ffffff";
      } else if (title.effect === "shadow") {
        style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
      } else if (title.effect === "emboss") {
        style.textShadow =
          "0px 1px 1px rgba(255, 255, 255, 0.5), 0px -1px 1px rgba(0, 0, 0, 0.5)";
      } else if (title.effect === "3d") {
        style.textShadow = `1px 1px 0px #ccc, 
                        2px 2px 0px #ccc, 
                        3px 3px 0px #ccc, 
                        4px 4px 0px #ccc,
                        5px 5px 0px #ccc,
                        6px 6px 10px rgba(0, 0, 0, 0.2)`;
      } else if (title.effect === "retro") {
        style.textShadow = `3px 3px 0px ${title.outlineColor || "#ff00ff"}`;
        style.letterSpacing = "2px";
      } else if (title.effect === "neon") {
        style.textShadow = `0 0 5px #fff, 
                        0 0 10px #fff, 
                        0 0 15px ${title.glowColor || "#0fa"}, 
                        0 0 20px ${title.glowColor || "#0fa"}, 
                        0 0 25px ${title.glowColor || "#0fa"}`;
      } else if (title.effect === "glitch") {
        style.position = "relative";
        // The actual glitch effect will be applied via CSS class
      }

      return style;
    };

    const getSubtitleStyle = () => {
      const style: React.CSSProperties = {
        margin: 0,
        fontSize: `${subtitle.size}px`,
        fontWeight: subtitle.weight,
        color: subtitle.color,
        fontFamily: subtitle.font,
        opacity: 0.9,
        textShadow: subtitle.shadow ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
        letterSpacing: subtitle.letterSpacing || "normal",
        lineHeight: subtitle.lineHeight || "1.5",
        textTransform: subtitle.transform || "none",
        transition: "all 0.3s ease",
        position: "relative", // Use relative positioning
      };

      // Apply transform separately to avoid conflicts with animations
      if ((subtitle.offsetX || 0) !== 0 || (subtitle.offsetY || 0) !== 0) {
        style.transform = `translate(${subtitle.offsetX || 0}px, ${
          subtitle.offsetY || 0
        }px)`;
      }

      if (subtitle.effect === "gradient") {
        style.background = `linear-gradient(to right, ${
          subtitle.gradientStart || "#0ea5e9"
        }, ${subtitle.gradientEnd || "#9e3ce7"})`;
        style.WebkitBackgroundClip = "text";
        style.WebkitTextFillColor = "transparent";
        style.backgroundClip = "text";
      } else if (subtitle.effect === "glow") {
        style.textShadow = `0 0 5px ${
          subtitle.glowColor || "rgba(56, 189, 248, 0.7)"
        }, 0 0 10px ${subtitle.glowColor || "rgba(56, 189, 248, 0.5)"}`;
      } else if (subtitle.effect === "shadow") {
        style.textShadow = "1px 1px 3px rgba(0, 0, 0, 0.5)";
      } else if (subtitle.effect === "emboss") {
        style.textShadow =
          "0px 1px 1px rgba(255, 255, 255, 0.5), 0px -1px 1px rgba(0, 0, 0, 0.5)";
      } else if (subtitle.effect === "3d") {
        style.textShadow = `1px 1px 0px #ccc, 
                        2px 2px 0px #ccc, 
                        3px 3px 5px rgba(0, 0, 0, 0.2)`;
      } else if (subtitle.effect === "retro") {
        style.textShadow = `2px 2px 0px ${subtitle.outlineColor || "#ff00ff"}`;
        style.letterSpacing = "1px";
      } else if (subtitle.effect === "neon") {
        style.textShadow = `0 0 5px #fff, 
                        0 0 10px ${subtitle.glowColor || "#0fa"}, 
                        0 0 15px ${subtitle.glowColor || "#0fa"}`;
      } else if (subtitle.effect === "glitch") {
        style.position = "relative";
        // The actual glitch effect will be applied via CSS class
      }

      return style;
    };

    return (
      <div
        className="canvas-preview"
        style={
          {
            width: `${config.width}px`,
            height: `${config.height}px`,
            "--animation-progress": "1", // Default to completed animation
          } as React.CSSProperties
        }
      >
        <div
          ref={ref}
          className={`canvas-container ${
            config.previewBorder ? "border" : "border-0"
          } ${background.type === "preset" ? background.preset : ""}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: `${borderRadius}px`,
            overflow: "hidden",
            position: "relative",
            ...backgroundStyle,
          }}
        >
          {background.overlay && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                  background.overlayColor || "rgba(0, 0, 0, 0.3)",
                opacity: (background.overlayOpacity || 30) / 100,
                zIndex: 1,
              }}
            />
          )}

          {background.type === "pattern" && (
            <div
              className={`pattern-${background.pattern}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
              }}
            />
          )}

          <div
            style={{
              width: "100%",
              height: "100%",
              padding: `${config.contentPadding || 40}px`,
              display: "flex",
              flexDirection: layout === "horizontal" ? "row" : "column",
              alignItems: "center",
              gap: "24px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {logo.visible && (
              <div
                style={{
                  order: logo.position === "left" ? 0 : 1,
                  display: "flex", // Use flex to properly size the container
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `translateX(${logo.offsetX}px) translateY(${logo.offsetY}px)`,
                  transition: "all 0.3s ease",
                  minWidth: `${logo.size}px`, // Set minimum width to logo size
                  minHeight: `${logo.size}px`, // Set minimum height to logo size
                }}
                className={
                  logo.animation && logo.animation !== "none"
                    ? `animate-${logo.animation}`
                    : ""
                }
              >
                <img
                  src={
                    logo.url ||
                    "/placeholder.svg?height=80&width=80&query=project logo"
                  }
                  alt="Project Logo"
                  style={logoStyle}
                  className={
                    logo.filter && logo.filter !== "none"
                      ? `filter-${logo.filter}`
                      : ""
                  }
                />
              </div>
            )}

            <div
              style={{
                flex: 1,
                order: logo.position === "left" ? 1 : 0,
                zIndex: 2,
                position: "relative", // Add position relative
                display: "flex", // Use flex for better control
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={textContainerStyle}>
                {title.visible && (
                  <div
                    style={{
                      position: "relative", // Container for title with relative positioning
                      zIndex: 2,
                    }}
                  >
                    <h1
                      style={getTitleStyle()}
                      className={`${
                        title.animation && title.animation !== "none"
                          ? isExporting
                            ? `animate-progress-${title.animation}`
                            : `animate-${title.animation}`
                          : ""
                      }`}
                    >
                      {title.text || "Project Title"}
                    </h1>
                  </div>
                )}

                {subtitle.visible && (
                  <div
                    style={{
                      position: "relative", // Container for subtitle with relative positioning
                      zIndex: 1,
                    }}
                  >
                    <p
                      style={getSubtitleStyle()}
                      className={`${
                        subtitle.animation && subtitle.animation !== "none"
                          ? isExporting
                            ? `animate-progress-${subtitle.animation}`
                            : `animate-${subtitle.animation}`
                          : ""
                      }`}
                    >
                      {subtitle.text ||
                        "A short description of your awesome project"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CanvasPreview.displayName = "CanvasPreview";
