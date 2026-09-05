import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/actualite', destination: '/articles?categorie=actualite', permanent: true },
      { source: '/business', destination: '/articles?categorie=business', permanent: true },
      { source: '/societe', destination: '/articles?categorie=societe', permanent: true },
      { source: '/analyses', destination: '/articles?categorie=analyse', permanent: true },
      { source: '/recherche', destination: '/articles', permanent: true },
    ];
  },
};

export default nextConfig;
