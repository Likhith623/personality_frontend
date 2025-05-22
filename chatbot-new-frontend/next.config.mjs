/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    domains: ['images.unsplash.com'], // Keep your existing config
  },
};

module.exports = nextConfig;
