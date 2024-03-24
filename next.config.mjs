/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/homepage',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
