/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ["turkmentv.gov.tm", "smstv.gov.tm", "turkmenistaninfo.gov.tm"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "turkmentv.gov.tm",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "sms.turkmentv.gov.tm",
        port: "",
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "smstv.gov.tm",
        port: "",
      },
      {
        protocol: "https",
        hostname: "turkmenistaninfo.gov.tm",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
