/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "http", hostname: "localhost" }],
    remotePatterns: [{ hostname: "platven.ke", protocol: "https" }],
  },
};

module.exports = nextConfig;
