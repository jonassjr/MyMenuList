/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['dmvouuubfssczkjnhdos.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dmvouuubfssczkjnhdos.supabase.co',
        pathname:'**'
      }
    ]
  }
};

export default nextConfig;
