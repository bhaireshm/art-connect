/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  }
};

export default nextConfig;
