"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

export function AnimatedOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Generate random orbs
    const generateOrbs = () => {
      const count = Math.min(Math.floor(window.innerWidth / 200), 6);
      const newOrbs: Orb[] = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 200 + 100;
        newOrbs.push({
          id: i,
          size,
          x: Math.random() * 90,
          y: Math.random() * 90,
          color: getRandomColor(isDark),
          delay: Math.random() * 5,
        });
      }

      setOrbs(newOrbs);
    };

    generateOrbs();

    window.addEventListener("resize", generateOrbs);
    return () => {
      window.removeEventListener("resize", generateOrbs);
    };
  }, [isDark]);

  // Get random pastel colors that match our theme
  const getRandomColor = (isDark: boolean) => {
    const colors = isDark
      ? [
          "rgba(56, 189, 248, 0.15)",
          "rgba(168, 85, 247, 0.15)",
          "rgba(59, 130, 246, 0.15)",
          "rgba(139, 92, 246, 0.15)",
        ]
      : [
          "rgba(186, 230, 253, 0.4)",
          "rgba(223, 182, 255, 0.4)",
          "rgba(191, 219, 254, 0.4)",
          "rgba(221, 214, 254, 0.4)",
        ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full animate-floating-light blur-3xl"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            backgroundColor: orb.color,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
