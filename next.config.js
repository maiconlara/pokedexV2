/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 31;

const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/**",
      },
    ],
    imageSizes: [64, 128, 256],
    minimumCacheTTL: ONE_MONTH_IN_SECONDS,
  },
};

module.exports = nextConfig;
