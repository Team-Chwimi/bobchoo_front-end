/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_LOCALHOST_URL: process.env.NEXT_PUBLIC_LOCALHOST_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_GOOGLE_KEY: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    NEXT_PUBLIC_GOOGLE_PLACE_KEY: process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY,
    NEXT_PUBLIC_KAKAOMAP_APPKEY: process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY,
    NEXT_PUBLIC_KAKAOMAP_REST_APPKEY:
      process.env.NEXT_PUBLIC_KAKAOMAP_REST_APPKEY,
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
};

module.exports = {
  nextConfig,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};
