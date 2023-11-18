import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Document.jsx is mainly for adding metadata, external scripts or styles,
 * and server-side rendering setups.
 *
 * Example: instead of including Bootstrap5 as a node module, we can include
 *          it with <link> tag (which I'm not sure why is not working atm)
 */
class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* <link
						rel="stylesheet"
						href="https://maxcdn.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css"
						integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
						crossOrigin="anonymous"
					/> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
