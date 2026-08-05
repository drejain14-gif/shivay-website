/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/services/highway-analysis",
        destination: "/services/engineering-consultancy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
