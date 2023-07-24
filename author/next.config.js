/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "load.9tailanime.com",
      "sv3.9tailmanga.com",
    ],
    // minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
