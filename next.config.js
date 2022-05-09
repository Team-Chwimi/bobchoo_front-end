/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_LOCALHOST_URL: process.env.NEXT_PUBLIC_LOCALHOST_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_GOOGLE_KEY: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    NEXT_PUBLIC_GOOGLE_PLACE_KEY: process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY,
  },
};

module.exports = nextConfig;
