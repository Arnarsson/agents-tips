/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "**",
      //   port: "",
      //   pathname: "**",
      // },
      // {
      //   protocol: "http",
      //   hostname: "**",
      //   port: "",
      //   pathname: "**",
      // },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-logos/**/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/tools/:path*",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
