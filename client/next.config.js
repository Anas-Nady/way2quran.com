/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Update the target URL accordingly
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
