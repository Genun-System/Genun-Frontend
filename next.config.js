/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Suppress WebSocket warnings in development
  webpack: (config, { dev, isServer }) => {
    // Add externals for wallet compatibility
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Suppress React Native async storage warning (not needed for web)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };
    
    // Handle browser-only APIs during SSR
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
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
  
  // Experimental features for better SSR handling
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;