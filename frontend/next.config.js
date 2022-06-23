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
    domains: [process.env.NEXT_PUBLIC_DOMAIN ?? ""],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      console.log();
      return [
        {
          source: "/api/:ep*",
          destination: `http://host.docker.internal:5000/api/:ep*`,
        },
      ];
    } else {
      return [];
    }
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? "/api",
  },
};
