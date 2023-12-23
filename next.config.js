/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ...require(`./config/${process.env.APP_ENV || 'local'}.json`),
  },
};

module.exports = nextConfig;
