import React, { createContext, useContext, useState, useEffect } from "react";

const WindowSizeContext = createContext();

export const useWindowSize = () => {
	return useContext(WindowSizeContext);
};

export const WindowSizeProvider = ({ children }) => {
	const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined });

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		// Attach the resize event listener
		window.addEventListener("resize", handleResize);

		// Initial call to set the current window size
		handleResize();

		// Cleanup by removing the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <WindowSizeContext.Provider value={windowSize}>{children}</WindowSizeContext.Provider>;
};