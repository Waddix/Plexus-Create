import path from "path";

export const reactStrictMode = true;
export const distDir = "dist";
export const images = {
  domains: [
    "res.cloudinary.com",
    "cloudinary.com",
    "localhost",
    "plexus-create.vercel.app",
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
