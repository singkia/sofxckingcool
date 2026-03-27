import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/bounties",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
