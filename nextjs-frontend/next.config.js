/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = {
    nextConfig,
    i18n: {
        locales: ['en', 'se'],
        defaultLocale: 'se',
    },
    async rewrites() {
        return [
            {
                source: "/api/:ep*",
                destination: `http://host.docker.internal:5000/api/:ep*`
            }
        ]
    }
};

