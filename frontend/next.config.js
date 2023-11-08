module.exports = {
    output: "standalone",
    publicRuntimeConfig: {
        NODE_ENV: process.env.NODE_ENV,

        PORT: process.env.PORT
    },
    generateBuildId: async() => {
        return "PayMe-v1.0"
    }
}
