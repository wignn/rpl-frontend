import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:'standalone',
  images:{
    domains:[
      "localhost",
      "yucky-vonni-va5to-ccb92850.koyeb.app"
    ]
  }
};

export default nextConfig;
