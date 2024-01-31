/** @type {import('next').NextConfig} */
const nextConfig = {
    devServer: {
        port: 3006
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    }
}

module.exports = nextConfig
