import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:'standalone',
  images:{
    domains:[
      "localhost",
      "yucky-vonni-va5to-ccb92850.koyeb.app",
      "backendkosan-6545aa32801f.herokuapp.com"
    ]
  }
};

export default nextConfig;
