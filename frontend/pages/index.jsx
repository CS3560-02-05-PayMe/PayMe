import styles from "../styles/main.module.css";

import Header from "../components/header";
import CurrentBalance from "../components/CurrentBalance";
import AccountDetails from "../components/AccountDetails";
import RecentActivity from "../components/RecentActivity";

import React from "react";
import { configureChains, mainnet, WagmiConfig, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";

/**
 * Default location Next.js checks to render website
 */
const { provider, webSocketProvider } = configureChains([mainnet, polygonMumbai], [publicProvider()]);

const config = createConfig({
	autoConnect: true,
	provider,
	webSocketProvider,
});

export default function PayMeApp() {
	return (
		<WagmiConfig config={config}>
			<Header />
			<div className={`contentContainer d-flex overflow-auto h-100 p-5 ${styles.transparentContainer}`}>
				<div className={`accountContainer p-2 ${styles.leftContainer}`}>
					<CurrentBalance dollarBalance={100} />
					<AccountDetails address={"0x00400004"} name={"Simon"} pointsBalance={0} />
				</div>
				<div className={`activityContainer p-2 ${styles.rightContainer}`}>
					<RecentActivity />
				</div>
			</div>
		</WagmiConfig>
	);
}
