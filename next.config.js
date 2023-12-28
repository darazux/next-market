/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    ...require(`./config/${process.env.APP_ENV || 'local'}.json`),
  },
};

module.exports = nextConfig;
