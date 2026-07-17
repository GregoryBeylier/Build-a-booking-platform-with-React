import type { NextConfig } from "next";

/**
 * Configuration Next.js du projet : autorise le chargement des images
 * distantes depuis le bucket S3 d'OpenClassrooms et le serveur local.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-eu-west-1.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
};
export default nextConfig;
