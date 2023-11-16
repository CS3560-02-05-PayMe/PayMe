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
	const [loggedIn, setLoggedIn] = useState(false);
	// User Account (name/username/pass(?)/address/phone)
	const [account, setAccount] = useState({ name: null });
	// User balance
	const [balance, setBalance] = useState(0);
	// User RecentActivity (send/receive money)
	const [history, setHistory] = useState([]);
	// Requests from other people asking for money
	const [requests, setRequests] = useState([]);
	// User primary credit card (changeable)
	const [cards, setCards] = useState([]);
	// User primary address
	const [addresses, setAddresses] = useState([]);
	// User extra addresses

	// TEMPORARY TO TEST LOADING SCREEN ----------------------
	const onChange = (checked) => {
		setLoading(!checked);
	};
	// -------------------------------------------------------

	const handleLogout = () => {
		setAccount({ name: null });
		setLoggedIn(false);
	};

	// account object with property amount
	const handleRequestPay = ({ uuid, name, amount }) => {
		if (balance < amount) {
			console.log("UNABLE TO RESOLVE REQUEST :: INSUFFICIENT BALANCE");
			console.log(`Current Balance: ${balance}, Needed: ${amount}`);
			return;
		}

		setBalance((balance - amount).toFixed(2));
		setRequests(requests.filter((request) => request.uuid !== uuid));

		const tempHistory = history.map((transaction) => ({
			...transaction,
			key: transaction.key + 1,
		}));
		tempHistory.unshift({ key: 0, subject: name, type: "Send", address: "0x12...2345", message: randomElement(sampleMessage), amount });
		setHistory(tempHistory);
	};

	const handlePay = ({ name = null, username = null, amount }) => {
		if (!!name && !!username) {
			console.log("Invalid user");
			return;
		}

		if (balance < amount) {
			console.log("UNABLE TO RESOLVE REQUEST :: INSUFFICIENT BALANCE");
			console.log(`Current Balance: ${balance}, Needed: ${amount}`);
			return;
		}

		if (!!name) {
			// send to getAccount by fullName
		} else {
			// send to getAccount by user handle
		}

		setBalance((balance - amount).toFixed(2));

		const request = requests.filter((r) => r.username === username || r.name === name);
		if (!!request.length) {
			const requestIndex = requests.findIndex((r) => (r.username === username || r.name === name) && r.amount === amount);
			requests.splice(requestIndex, 1);
			setRequests(requests);
		}

		const tempHistory = history.map((transaction) => ({
			...transaction,
			key: transaction.key + 1,
		}));
		tempHistory.unshift({ key: 0, subject: name || "@" + username, type: "Send", address: "0x12...2345", message: randomElement(sampleMessage), amount });
		setHistory(tempHistory);
	};

	const handleRequest = ({ name, amount }) => {
		// sends request to backend to push request to their inbox
		// sendRequest(name, amount)
	};

	const handleAddressUpdate = ({ street }) => {
		const knownAddress = addresses.findIndex((a) => a.street.toLowerCase().trim() === street.toLowerCase().trim());
		let updatedAddresses;

		if (knownAddress !== -1) {
			updatedAddresses = addresses.map((a, index) => ({ ...a, primary: index === knownAddress }));
		} else {
			updatedAddresses = [{ street, primary: true }, ...addresses.map((a) => ({ ...a, primary: false }))];
		}

		setAddresses(updatedAddresses);
	};

	const handleCardUpdate = ({ cardNumber }) => {
		const knownCards = cards.findIndex((c) => c.cardNumber === cardNumber);
		let updatedCards;

		if (knownCards !== -1) {
			updatedCards = cards.map((c, index) => ({ ...c, primary: index === knownCards }));
		} else {
			updatedCards = [{ cardNumber, primary: true }, ...cards.map((c) => ({ ...c, primary: false }))];
		}

		setCards(updatedCards);
	};

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
			// { uuid: 1, name: "John", username: "joster", amount: 15.68 },
			{ uuid: 2, name: "Sam", username: "s0m", amount: 25 },
			{ uuid: 3, name: "Sam", username: "s0m", amount: 15.68 },
		]);

		setBalance((Math.random() * 1000).toFixed(2));

		setAddresses([{ street: "3400 Poly Vista", primary: true }]);

		setCards([{ cardNumber: "0040", primary: true }]);

		setAccount({ name: "Simon Ly", username: "simonly" });

		setLoggedIn(true);

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
					<CurrentBalance loggedIn={loggedIn} loading={loading} dollarBalance={balance} requests={requests} handleRequest={handleRequestPay} />
					<div className={clsx("d-flex flex-column flex-md-row w-100 mx-2 mx-md-0", styles.buttonWrapper)}>
						<div className={clsx("mb-3 me-md-2", styles.buttonContainer)}>
							<Pay apply={handlePay} />
						</div>
						<div className={clsx("mb-3 ms-md-2", styles.buttonContainer)}>
							<Request apply={handleRequest} />
						</div>
					</div>
					<AccountDetails loggedIn={loggedIn} loading={loading} addresses={addresses} account={account} cards={cards} changeAddress={handleAddressUpdate} changeCard={handleCardUpdate} />
				</div>
				<div className={clsx("activityContainer p-2 pb-3 pb-md-2", styles.rightContainer)}>
					<RecentActivity loading={loading} history={history} />
				</div>
			</div>
		</WagmiConfig>
	);
}
