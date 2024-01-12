/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = { i18n };
