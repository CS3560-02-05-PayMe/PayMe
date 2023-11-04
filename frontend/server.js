require("dotenv-flow").config();
const express = require("express");
const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";


const next = require("next");
const app = next({ isDevelopment });
const handle = app.getRequestHandler();

// WIP

const apiPaths = {
	"/v2.api": {
		target: "http://localhost:8080",
		pathRewrite: {
			"^/v2.api": "/v2.api",
		},
		changeOrigin: true,
	},
};

app.prepare()
	.then(() => {
		const server = express();
		// automatically parses data to JSON
		server.use(express.json());

		// server.post("/")

		if (isDevelopment) {
			for (const [path, config] of Object.entries(apiPaths)) {
				server.use(path, createProxyMiddleware(config));
			}
		}

		server.all("*", (req, res) => {
			return handle(req, res);
		});

		server.listen(PORT, (err) => {
			if (err) throw err;
			console.log(`> Ready on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log("SERVER ERROR::::", err);
	});
