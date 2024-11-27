/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xcskycthnkpvedkbhslj.supabase.co',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig;
