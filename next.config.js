// const million = require("million/compiler");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

module.exports = withMDX(nextConfig);
