/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  optimizeFonts: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    // Allow importing GLSL shader files as raw strings
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
};
module.exports = nextConfig;
