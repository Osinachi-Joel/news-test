import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'agc-storage.s3.eu-north-1.amazonaws.com',
      // add other allowed domains here if needed
    ],
  },
};

export default nextConfig;
