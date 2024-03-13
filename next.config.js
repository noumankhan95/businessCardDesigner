/** @type {import('next').NextConfig} */
// next.config.js

const nextConfig = {
    webpack: (config) => {
        // Configure file-loader for images
        config.module.rules.push({
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    },
                },
            ],
        });

        // Add externals for canvas and sharp
        config.externals.push({
            sharp: 'commonjs sharp',
            canvas: 'commonjs canvas',
        });

        return config;
    },
};

module.exports = nextConfig;