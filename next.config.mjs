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
  // Add basePath and assetPrefix for GitHub Pages only in production
  basePath: process.env.NODE_ENV === "production" ? "/NekoCanvas" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/NekoCanvas/" : "",
};

export default nextConfig;
