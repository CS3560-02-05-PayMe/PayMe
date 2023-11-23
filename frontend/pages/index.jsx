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
import { fetchPM, fullName, getOtherPartyUUID, isRecipient, postPM } from "../components/util/helpers";
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
	const {
		account,
		updateAccount,
		loggedIn,
		updateLoggedIn,
		addressList,
		updateAddressList,
		cardList,
		updateCardList,
		historyList,
		updateHistoryList,
		requestInList,
		updateRequestInList,
		requestOutList,
		updateRequestOutList,
	} = useAccount();
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

	const handlePay = async ({ recipient, amount, message }) => {
		const accountPromise = fetchPM("/getAccount", recipient.replace("@", ""));

		return accountPromise.then(async (recipientAccount) => {
			const transactionBody = {
				message,
				transactionDate: new Date().toISOString(),
				transactionAmount: amount,
				isSettled: true,
			};
			const transactionPromise = postPM("/addTransaction", transactionBody, account.accountID, recipientAccount.accountID);

			const paymentBody = {
				paymentAmount: amount,
			};
			const paymentPromise = transactionPromise.then((transaction) => postPM("/addPayment", paymentBody, transaction.transactionID));

			return Promise.all([accountPromise, transactionPromise, paymentPromise]).then(([recipientAccount, transaction, payment]) => {
				const tempHistory = [...historyList];
				tempHistory.unshift({
					key: historyList.length,
					subject: recipientAccount.firstName,
					username: recipientAccount.username,
					type: "Send",
					message,
					amount,
				});
				updateHistoryList(tempHistory);

				const tempAccount = { ...account, balance: (account.balance - amount).toFixed(2) };
				updateAccount(tempAccount);
				postPM("/updateAccount", tempAccount, account.accountID);

				const tempRecipientAccount = { ...recipientAccount, balance: (recipientAccount.balance + amount).toFixed(2) };
				postPM("/updateAccount", tempRecipientAccount, recipientAccount.accountID);
			});
		});
	};

	// account object with property amount
	const handleRequestPay = async ({ recipient, amount, message, transactionId }) => {
		const accountPromise = fetchPM("/getAccount", recipient.replace("@", ""));

		return accountPromise.then(async (recipient) => {
			const transactionPromise = fetchPM("/getTransaction", transactionId);
			const requestPromise = transactionPromise.then(() => fetchPM("/getRequest", transactionId));

			return Promise.all([accountPromise, transactionPromise, requestPromise]).then(([recipientAccount, transaction, request]) => {
				const tempHistory = [...historyList];
				tempHistory.unshift({
					key: historyList.length,
					subject: recipientAccount.firstName,
					username: recipientAccount.username,
					type: "Send",
					message,
					amount,
				});
				updateHistoryList(tempHistory);

				const requestBody = {
					...request,
					settled: true,
				};
				postPM("/updateRequest", requestBody, request.requestID, transactionId).then((r) => {
					const tempRequestInList = [...requestInList];
					console.log(tempRequestInList);
					updateRequestInList(tempRequestInList.filter((request) => request.transactionId !== transactionId));
				});

				const tempAccount = { ...account, balance: (account.balance - amount).toFixed(2) };
				updateAccount(tempAccount);
				postPM("/updateAccount", tempAccount, account.accountID);

				const tempRecipientAccount = { ...recipientAccount, balance: (recipientAccount.balance + amount).toFixed(2) };
				postPM("/updateAccount", tempRecipientAccount, recipientAccount.accountID);
			});
		});
	};

	const handleRequestRemove = ({ selected, updatedList = [] }) => {
		const requestList = selected === 0 ? requestInList : requestOutList;

		console.log(selected, requestList, updatedList);
		if (selected === 0) {
			updateRequestOutList(requestList);
		} else {
			updateRequestInList(requestList);
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

	const handleRequest = ({ payer, amount, message }) => {
		const accountPromise = fetchPM("/getAccount", payer.replace("@", ""));

		accountPromise.then((payerAccount) => {
			const transactionBody = {
				message,
				transactionDate: new Date().toISOString(),
				transactionAmount: amount,
			};
			const transactionPromise = postPM("/addTransaction", transactionBody, payerAccount.accountID, account.accountID);

			const requestBody = {
				requestAmount: amount,
				isSettled: false,
			};
			const requestPromise = transactionPromise.then((transaction) => postPM("/addRequest", requestBody, transaction.transactionID));

			return Promise.all([accountPromise, transactionPromise, requestPromise]).then(([account, transaction, request]) => {
				updateRequestOutList([...requestOutList, request]);
			});
		});
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

		// setRequests([
		// 	{ uuid: 1, name: "John Doe", username: "joster", amount: 19.94 },
		// 	{ uuid: 2, name: "Sam Oh", username: "s0m", amount: 25 },
		// 	{ uuid: 2, name: "Sam Oh", username: "s0m", amount: 20.23 },
		// 	{ uuid: 3, name: "Sam Oh", username: "fakes0m", amount: 17.38 },
		// 	{ uuid: 4, name: "Caitlyn Kiramman", username: "kuppcake", amount: 17.38 },
		// ]);

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
				const requestInListPromise = historyListPromise.then(() => fetchPM("/getRequestInList", account.accountID));
				const requestOutListPromise = requestInListPromise.then(() => fetchPM("/getRequestOutList", account.accountID));

				return Promise.all([accountPromise, addressListPromise, cardListPromise, historyListPromise, requestInListPromise, requestOutListPromise]).then(
					async ([account, addressList, cardList, historyList, requestInList, requestOutList]) => {
						updateAccount(account);
						updateAddressList(addressList);
						updateCardList(cardList);

						const history = [];

						for (let i = 0; i < historyList.length; i++) {
							const record = historyList[i];

							const otherPartyUUID = getOtherPartyUUID(record, account);
							const otherParty = await fetchPM("/getAccountByUuid", otherPartyUUID);
							console.log(record);
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

						var requests = [];

						for (let i = 0; i < requestInList.length; i++) {
							const request = requestInList[i];
							if (request.settled) continue;
							console.log(request);

							const transaction = await fetchPM("/getTransaction", request.transactionID);
							const otherParty = await fetchPM("/getAccountByUuid", transaction.recipientID);
							const requestDetails = {
								key: i,
								transactionId: transaction.transactionID,
								subject: fullName(otherParty),
								username: otherParty.username,
								message: transaction.message,
								amount: transaction.transactionAmount,
							};
							requests.push(requestDetails);
						}
						updateRequestInList(requests);

						requests = [];

						for (let i = 0; i < requestOutList.length; i++) {
							const request = requestOutList[i];
							if (request.settled) continue;
							console.log(request);

							const transaction = await fetchPM("/getTransaction", request.transactionID);
							const otherParty = await fetchPM("/getAccountByUuid", transaction.payerID);
							const requestDetails = {
								key: i,
								transactionId: transaction.transactionID,
								subject: fullName(otherParty),
								username: otherParty.username,
								message: transaction.message,
								amount: transaction.transactionAmount,
							};
							requests.push(requestDetails);
						}
						updateRequestOutList(requests);
					}
				);
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
					<CurrentBalance loggedIn={loggedIn} loading={loading} handleRequest={handleRequestPay} handleRequestRemove={handleRequestRemove} />
					<div className={clsx("d-flex flex-column flex-md-row w-100 mx-2 mx-md-0", styles.buttonWrapper)}>
						<div className={clsx("mb-3 me-md-2", styles.buttonContainer)}>
							<Pay handlePay={handlePay} />
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
