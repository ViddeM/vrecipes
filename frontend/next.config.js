module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "se"],
    defaultLocale: "se",
  },
  images: {
    domains: process.env.NEXT_PUBLIC_DOMAIN
      ? [process.env.NEXT_PUBLIC_DOMAIN]
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
  publicRuntimeConfig: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "/api",
  },
};
