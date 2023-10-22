/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  reactStrictMode: false,
  // dnd 를 사용하기 위해선 reactStrictMode 를 false 로 설정해야 한다.
  // dnd 의 ref 를 사용하기 위해선 forwardRef 를 사용해야 하는데,
  // strict mode 에서는 forwardRef 가 제대로 작동하지 않는다.
  swcMinify: true,
};

module.exports = nextConfig;
