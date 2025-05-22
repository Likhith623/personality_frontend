/** @type {import('next').NextConfig} */
 it is treated as an ES module, and you need to use `export default` instead of `module.exports`.

###const nextConfig = {
  output: 'export', // Enables static export Solution

Update the `next.config.mjs` file as
  images: {
    domains: ['images.unsplash.com'], // Keep your existing config
  },
};

export default next follows:

```javascript
/** @type {import('next').NextConfig;
