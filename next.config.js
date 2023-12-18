/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/api/auth/signin",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
