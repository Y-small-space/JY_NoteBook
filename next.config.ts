import type { NextConfig } from "next";
import withLess from 'next-with-less';

const nextConfig: NextConfig = withLess({
  reactStrictMode: true,
  experimental: {
    appDir: true,
    turbo: false, // ✅ 显式关闭 Turbopack，强制使用 Webpack
  },
});

export default nextConfig;
