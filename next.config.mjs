
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.prod.website-files.com",
      "embed-ssl.wistia.com",
      "i.postimg.cc",
      "i.ibb.co",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
