import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const fontPoppins = Poppins({
	weight: ["300", "400", "500", "600", "700", "900"],
	preload: true,
	fallback: ["sans-serif"],
	subsets: ["latin"],
	display: "swap",
});

const queryClient = new QueryClient();

/**
 * App.jsx wraps entire application. It is currently set up to
 * apply any layout/loading screen on each page initial load.
 *
 * Example: coding the loading screen once and reusing it for all
 *          pages of the website
 */
const App = ({ Component, pageProps }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleLoadStart = (url) => {
			setIsLoading(true);
		};

		const handleLoadComplete = (url) => {
			setIsLoading(false);
		};

		setIsLoading(false);

		// router events to allow dry coding of inter-page loading screens
		router.events.on("routeChangeStart", handleLoadStart);
		router.events.on("routeChangeComplete", handleLoadComplete);
		router.events.on("routeChangeError", handleLoadComplete);

		return () => {
			router.events.off("routeChangeStart", handleLoadStart);
			router.events.off("routeChangeComplete", handleLoadComplete);
			router.events.off("routeChangeError", handleLoadComplete);
		};
	});

	return (
		<>
			<Head>
				<title>PayMe</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<style jsx global>
					{`
						html {
							--font-Poppins: ${fontPoppins.style.fontFamily};
						}
					`}
				</style>
				<Component {...pageProps} />
				{/* add loading screen */}
			</QueryClientProvider>
		</>
	);
};

export default App;
