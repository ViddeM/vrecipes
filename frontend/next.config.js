/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  i18n: {
    locales: ["en", "se"],
    defaultLocale: "se",
  },
  images: {
    domains: process.env.NEXT_PUBLIC_BASE_URL
      ? [process.env.NEXT_PUBLIC_BASE_URL]
      : [],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:ep*",
          destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:ep*`,
        },
      ];
    } else {
      return [];
    }
  },
};
