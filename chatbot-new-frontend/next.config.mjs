/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['images.unsplash.com'],
    },
    // Fix chunk loading issues
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        };
      }
      return config;
    },
    // Increase timeout for chunk loading
    experimental: {
      webpackBuildWorker: true,
    },
  };
  
  export default nextConfig;
