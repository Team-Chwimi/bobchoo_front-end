/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_LOCALHOST_URL: process.env.REACT_APP_LOCALHOST_URL,
    REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    REACT_APP_GOOGLE_KEY: process.env.REACT_APP_GOOGLE_KEY,
  },
};

module.exports = nextConfig;
