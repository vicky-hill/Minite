/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        DOMAIN: process.env.DOMAIN,
        BASE_URL: process.env.BASE_URL,
        IK_PUBLIC_KEY: 'public_nC0iM2AKxJN+PFW7nO2D9lhdE94='
    },
    images: {
        domains: [
            "ik.imagekit.io",
        ]
    }
}


export default nextConfig;
