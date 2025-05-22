/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    domains: ['images.unsplash.com'], // Your existing config
  },
};

export default nextConfig;
