/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_LOCALHOST_URL: process.env.NEXT_APP_LOCALHOST_URL,
    NEXT_APP_SERVER_URL: process.env.NEXT_APP_SERVER_URL,
    NEXT_APP_GOOGLE_KEY: process.env.NEXT_APP_GOOGLE_KEY,
  },
};

module.exports = nextConfig;
