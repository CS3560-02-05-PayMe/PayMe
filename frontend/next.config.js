// PostCSS preprocessing added to allow nested CSS
// still testing
// const withCSS = require("@zeit/next-css");
// const withTM = require("next-transpile-modules")(["tailwindcss"]);

module.exports = {
	output: "standalone",
	publicRuntimeConfig: {
		NODE_ENV: process.env.NODE_ENV,

		PORT: process.env.PORT,
	},
	generateBuildId: async () => {
		return "PayMe-v1.0";
	},
};
