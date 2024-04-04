/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        DOMAIN: process.env.DOMAIN,
        BASE_URL: process.env.API_URL
    }
}


export default nextConfig;
