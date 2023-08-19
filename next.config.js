const withTwin = require('./withTwin.js');

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: false,
  images: {
    domains: ['seniors-for-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
});
