module.exports = {
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    API_KEY_POLYGON: process.env.API_KEY_POLYGON,
    ALCHEMY_KEY: process.env.ALCHEMY_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: ""
      }
    ]
  }
}
