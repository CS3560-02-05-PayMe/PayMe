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
import { fetchPM, getOtherPartyUUID, isRecipient, postPM } from "../components/util/helpers";
import { useAccount } from "../components/providers/AccountProvider";

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
	// User Account (name/username/pass(?)/address/phone)
	const { account, updateAccount, loggedIn, updateLoggedIn, addressList, updateAddressList, cardList, updateCardList, historyList, updateHistoryList } = useAccount();
	// User balance
	const [balance, setBalance] = useState(0);
	// Requests from other people asking for money
	const [requests, setRequests] = useState([]);
	// User extra addresses

	// TEMPORARY TO TEST LOADING SCREEN ----------------------
	const onChange = (checked) => {
		setLoading(!checked);
	};
	// -------------------------------------------------------

	const handleLogout = () => {
		updateAccount(null);
	};

	// account object with property amount
	const handleRequestPay = ({ uuid, name, amount }) => {
		if (balance < amount) {
			console.log("UNABLE TO RESOLVE REQUEST :: INSUFFICIENT BALANCE");
			console.log(`Current Balance: ${balance}, Needed: ${amount}`);
			return;
		}

		setBalance((balance - amount).toFixed(2));

		const requestIndex = requests.findIndex((request) => request.uuid === uuid && request.amount === amount);
		if (requestIndex !== -1) {
			const updatedRequests = [...requests];
			updatedRequests.splice(requestIndex, 1);
			setRequests(updatedRequests);
		}

		const tempHistory = history.map((transaction) => ({
			...transaction,
			key: transaction.key + 1,
		}));
		tempHistory.unshift({ key: 0, subject: name, type: "Send", address: "0x12...2345", message: randomElement(sampleMessage), amount });
		setHistory(tempHistory);
	};

	const handleRequestRemove = ({ uuid, name, amount, updatedList = [] }) => {
		if (!!updatedList) {
			setRequests(updatedList);
			return;
		}

		const requestIndex = requests.findIndex((request) => request.uuid === uuid && request.amount === amount);
		if (requestIndex !== -1) {
			const updatedRequests = [...requests];
			updatedRequests.splice(requestIndex, 1);
			setRequests(updatedRequests);
		}
	};

	const handleTransfer = ({ uuid, transfer }) => {
		if (balance < transfer) {
			console.log("UNABLE TO RESOLVE TRANSFER :: INSUFFICIENT BALANCE");
			console.log(`Current Balance: ${balance}, Needed: ${transfer}`);
			return;
		}

		setBalance((balance - transfer).toFixed(2));
		setRequests(requests.filter((request) => request.uuid !== uuid));

		const tempHistory = history.map((transaction) => ({
			...transaction,
			key: transaction.key + 1,
		}));
		tempHistory.unshift({ key: 0, subject: "cc", type: "Transfer", address: "N/A", message: randomElement(sampleMessage), transfer });
		setHistory(tempHistory);
	};

	const handleDeposit = ({ uuid, deposit }) => {
		setBalance((balance + deposit).toFixed(2));
		setRequests(requests.filter((request) => request.uuid !== uuid));

		const tempHistory = history.map((transaction) => ({
			...transaction,
			key: transaction.key + 1,
		}));
		tempHistory.unshift({ key: 0, subject: "cc", type: "Deposit", address: "N/A", message: randomElement(sampleMessage), deposit });
		setHistory(tempHistory);
	};

	const handleRequest = ({ name, amount }) => {
		// sends request to backend to push request to their inbox
		// sendRequest(name, amount)
	};

	const handleAddressUpdate = (address) => {
		const knownAddress = addressList.findIndex((a) => a.primaryAddress.toLowerCase().trim() === address.primaryAddress.toLowerCase().trim());
		let updatedAddresses;

		if (knownAddress !== -1) {
			updatedAddresses = addressList.map((a, index) => ({ ...a, isPriority: index === knownAddress }));
		} else {
			updatedAddresses = [{ ...address, isPriority: true }, ...addressList.map((a) => ({ ...a, isPriority: false }))];
		}

		updateAddressList(updatedAddresses);
		postPM("/updateAddressList", updatedAddresses, account.accountID).then((updatedList) => console.log(updatedList));
	};

	const handleCardUpdate = (card) => {
		const knownCards = cardList.findIndex((c) => c.cardNumber === card.cardNumber);
		let updatedCards;

		if (knownCards !== -1) {
			updatedCards = cardList.map((c, index) => ({ ...c, isPriority: index === knownCards }));
		} else {
			updatedCards = [{ ...card, isPriority: true }, ...cardList.map((c) => ({ ...c, isPriority: false }))];
		}

		updateCardList(updatedCards);
		postPM("/updateCreditCardList", updatedCards, account.accountID).then((updatedList) => console.log(updatedList));
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

		setRequests([
			{ uuid: 1, name: "John Doe", username: "joster", amount: 19.94 },
			{ uuid: 2, name: "Sam Oh", username: "s0m", amount: 25 },
			{ uuid: 2, name: "Sam Oh", username: "s0m", amount: 20.23 },
			{ uuid: 3, name: "Sam Oh", username: "fakes0m", amount: 17.38 },
			{ uuid: 4, name: "Caitlyn Kiramman", username: "kuppcake", amount: 17.38 },
		]);

		setBalance((Math.random() * 1000).toFixed(2));

		// setAddresses([{ street: "3400 Poly Vista", primary: true }]);

		// setCards([{ cardNumber: "0040", primary: true }]);

		// initial login
		// updateAccount(null);
		const accountPromise = fetchPM("/getAccount", "u1", "p1");

		accountPromise
			.then(async (account) => {
				const addressListPromise = fetchPM("/getAddressList", account.accountID);
				const cardListPromise = addressListPromise.then(() => fetchPM("/getCreditCardList", account.accountID));
				const historyListPromise = cardListPromise.then(() => fetchPM("/getTransactionList", account.accountID));

				return Promise.all([accountPromise, addressListPromise, cardListPromise, historyListPromise]).then(async ([account, addressList, cardList, historyList]) => {
					updateAccount(account);
					updateAddressList(addressList);
					updateCardList(cardList);

					const history = [];

					for (let i = 0; i < historyList.length; i++) {
						const record = historyList[i];

						const otherPartyUUID = getOtherPartyUUID(record, account);
						const otherParty = await fetchPM("/getAccountByUuid", otherPartyUUID);
						const historyActivity = {
							key: i,
							subject: otherParty.firstName,
							username: otherParty.username,
							type: isRecipient(record, account) ? "Receive" : "Send",
							message: record.message,
							amount: record.transactionAmount,
						};
						history.unshift(historyActivity);
					}

					updateHistoryList(history);
				});
			})
			.catch(console.error);

		// Temporary buffer
		// Will be replaced in the future when we need to wait for
		// API calls to be made to retrieve data
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<WagmiConfig config={config}>
			<Header loggedIn={loggedIn} handleLogout={handleLogout} />
			<div className={clsx("contentContainer d-flex h-100 p-md-3 p-xl-5", styles.transparentContainer)}>
				<div className={clsx("accountContainer p-2", styles.leftContainer)}>
					{/* <Switch checked={!loading} onChange={onChange} /> */}
					<CurrentBalance loggedIn={loggedIn} loading={loading} requests={requests} handleRequest={handleRequestPay} handleRequestRemove={handleRequestRemove} />
					<div className={clsx("d-flex flex-column flex-md-row w-100 mx-2 mx-md-0", styles.buttonWrapper)}>
						<div className={clsx("mb-3 me-md-2", styles.buttonContainer)}>
							<Pay />
						</div>
						<div className={clsx("mb-3 ms-md-2", styles.buttonContainer)}>
							<Request apply={handleRequest} />
						</div>
					</div>
					<AccountDetails loggedIn={loggedIn} loading={loading} changeAddress={handleAddressUpdate} changeCard={handleCardUpdate} />
				</div>
				<div className={clsx("activityContainer p-2 pb-3 pb-md-2", styles.rightContainer)}>
					<RecentActivity loggedIn={loggedIn} loading={loading} history={historyList} />
				</div>
			</div>
		</WagmiConfig>
	);
}
