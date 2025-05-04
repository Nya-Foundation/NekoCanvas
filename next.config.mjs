/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  // Add basePath and assetPrefix for GitHub Pages
  basePath: "/neko-canvas",
  assetPrefix: "/neko-canvas/",
};

export default nextConfig;
