/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/viewer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
