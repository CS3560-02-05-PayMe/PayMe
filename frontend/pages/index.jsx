import styles from "../styles/main.module.css";

import Header from "../components/Header";
import CurrentBalance from "../components/Account/CurrentBalance";
import AccountDetails from "../components/Account/AccountDetails";
import RecentActivity from "../components/Account/RecentActivity";
import Pay from "../components/Transactions/Pay";
import Request from "../components/Transactions/Request";

import { Switch } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
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

// TEMPORARY FOR SAMPLE DATA GENERATOR ---------------
const sampleNames = ["Mike", "Amanda", "Roy", "Charlie", "Jimmy"];
const sampleTypes = ["Send", "Receive"];
const sampleMessage = ["Cookies", "Dinner", "Lunch", "Movie Tickets", "Golf", "Gatorade", "Poker", "Car Fix"];

const randomElement = (data) => {
	return data[Math.floor(Math.random() * data.length)];
};
// ---------------------------------------------------

export default function PayMeApp() {
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(true);
	// User Account (name/username/pass(?)/address/phone)
	const [account, setAccount] = useState({ name: "Simon" });
	// User balance
	const [balance, setBalance] = useState(0);
	// User RecentActivity (send/receive money)
	const [history, setHistory] = useState([]);
	// Requests from other people asking for money
	const [requests, setRequests] = useState([]);

	// TEMPORARY TO TEST LOADING SCREEN ----------------------
	const onChange = (checked) => {
		setLoading(!checked);
	};
	// -------------------------------------------------------

	const handleLogout = () => {
		setAccount(null);
		setLoggedIn(false);
	};

	const handlePay = (user, amount) => {
		if (balance < amount) {
			console.log("UNABLE TO RESOLVE REQUEST :: INSUFFICIENT BALANCE");
		}

		setBalance(balance - amount);
		// user.balance += amount;
	};

	const handleRequest = () => {};

	useEffect(() => {
		// TEMPORARY FOR SAMPLE DATA GENERATOR ---------------
		const tempHistory = [];
		for (let i = 0; i < 23; i++) {
			tempHistory.push({
				key: i + 1,
				subject: randomElement(sampleNames),
				type: randomElement(sampleTypes),
				address: "0x12...2345",
				message: randomElement(sampleMessage),
				amount: (Math.random() * 100).toFixed(2),
			});
		}
		// ---------------------------------------------------
		setHistory(tempHistory);

		setRequests([
			{ name: "John", amount: 15.68 },
			{ name: "Sam", amount: 25 },
		]);

		setBalance((Math.random() * 1000).toFixed(2));

		// Temporary buffer
		// Will be replaced in the future when we need to wait for
		// API calls to be made to retrieve data
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<WagmiConfig config={config}>
			<Header loggedIn={loggedIn} account={account} handleLogout={handleLogout} />
			<div className={clsx("contentContainer d-flex h-100 p-md-3 p-xl-5", styles.transparentContainer)}>
				<div className={clsx("accountContainer p-2", styles.leftContainer)}>
					{/* <Switch checked={!loading} onChange={onChange} /> */}
					<CurrentBalance handleRequest={handlePay} loading={loading} dollarBalance={balance} requests={requests} />
					<div className={clsx("d-flex flex-column flex-md-row w-100 mx-2 mx-md-0", styles.buttonWrapper)}>
						<div className={clsx("mb-3 me-md-2", styles.buttonContainer)}>
							<Pay apply={handlePay} />
						</div>
						<div className={clsx("mb-3 ms-md-2", styles.buttonContainer)}>
							<Request apply={handleRequest} />
						</div>
					</div>
					<AccountDetails loading={loading} address={"0x00400004"} name={"Simon"} pointsBalance={0} />
				</div>
				<div className={clsx("activityContainer p-2 pb-3 pb-md-2", styles.rightContainer)}>
					<RecentActivity loading={loading} history={history} />
				</div>
			</div>
		</WagmiConfig>
	);
}
