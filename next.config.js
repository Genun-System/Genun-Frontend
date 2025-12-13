/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Suppress WebSocket warnings in development
  webpack: (config, { dev, isServer }) => {
    // Add externals for wallet compatibility
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    if (dev && !isServer) {
      // Suppress WebSocket connection warnings in development
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
  
  // Environment variables
  env: {
    SUPPRESS_WEBSOCKET_ERRORS: 'true',
  },
  
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;