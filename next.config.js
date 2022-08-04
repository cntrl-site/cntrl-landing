/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_AIRTABLE_SUBMIT_URL: process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_URL,
  }
};

module.exports = nextConfig;
