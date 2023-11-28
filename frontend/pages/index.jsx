import styles from "../styles/main.module.css";

import Header from "../components/Header";
import CurrentBalance from "../components/Account/CurrentBalance";
import AccountDetails from "../components/Account/AccountDetails";
import RecentActivity from "../components/Account/RecentActivity";
import Pay from "../components/Transactions/Pay";
import Request from "../components/Transactions/Request";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { configureChains, mainnet, WagmiConfig, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "wagmi/chains";
import { checkSufficientBalance, fetchPM, fullName, getOtherPartyUUID, isRecipient, postPM } from "../components/util/helpers";
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

export default function PayMeApp() {
	const [loading, setLoading] = useState(true);
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
				settled: true,
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

				const tempAccount = { ...account, balance: parseFloat((account.balance - amount).toFixed(2)) };
				updateAccount(tempAccount);
				postPM("/updateAccount", tempAccount, account.accountID);

				const tempRecipientAccount = { ...recipientAccount, balance: parseFloat((recipientAccount.balance + amount).toFixed(2)) };
				postPM("/updateAccount", tempRecipientAccount, recipientAccount.accountID);
			});
		});
	};

	// account object with property amount
	const handleRequestPay = async ({ recipient, amount, message, transactionId }) => {
		checkSufficientBalance(account.balance, amount);

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

				const tempAccount = { ...account, balance: parseFloat((account.balance - amount).toFixed(2)) };
				updateAccount(tempAccount);
				postPM("/updateAccount", tempAccount, account.accountID);

				const tempRecipientAccount = { ...recipientAccount, balance: parseFloat((recipientAccount.balance + amount).toFixed(2)) };
				postPM("/updateAccount", tempRecipientAccount, recipientAccount.accountID);
			});
		});
	};

	const handleRequestRemove = async ({ selected, updatedRequests = [], toRemove = [] }) => {
		if (selected === 0) {
			updateRequestInList(updatedRequests);
		} else {
			updateRequestOutList(updatedRequests);
		}

		toRemove.forEach((request) => {
			const { requestId, transactionId } = request;
			const requestBody = {
				...request,
				settled: true,
			};
			postPM("/updateRequest", requestBody, requestId, transactionId);
		});

		return updatedRequests;
	};

	const handleTransfer = ({ amount }) => {
		checkSufficientBalance(account.balance, amount);

		const tempAccount = { ...account, balance: parseFloat((account.balance - amount).toFixed(2)) };
		updateAccount(tempAccount);
		postPM("/updateAccount", tempAccount, account.accountID);
	};

	const handleDeposit = ({ amount }) => {
		const tempAccount = { ...account, balance: parseFloat((account.balance + amount).toFixed(2)) };
		updateAccount(tempAccount);
		postPM("/updateAccount", tempAccount, account.accountID);
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

			return Promise.all([accountPromise, transactionPromise, requestPromise]).then(([payerAccount, transaction, request]) => {
				request = {
					key: requestOutList.length,
					requestId: request.requestID,
					transactionId: transaction.transactionID,
					subject: fullName(payerAccount),
					username: payerAccount.username,
					message: transaction.message,
					amount: transaction.transactionAmount,
				};
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
		// initial login
		updateAccount(null);

		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<WagmiConfig config={config}>
			<Header loggedIn={loggedIn} handleLogout={handleLogout} />
			<div className={clsx("contentContainer d-flex h-100 p-md-3 p-xl-5", styles.transparentContainer)}>
				<div className={clsx("accountContainer p-2", styles.leftContainer)}>
					<div className={clsx("d-md-flex flex-md-column h-100 w-100 justify-content-md-between", styles.leftInnerContainer)}>
						{/* <Switch checked={!loading} onChange={onChange} /> */}
						<CurrentBalance loggedIn={loggedIn} loading={loading} handleRequest={handleRequestPay} handleRequestRemove={handleRequestRemove} handleDeposit={handleDeposit} />
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
				</div>
				<div className={clsx("activityContainer p-2 pb-3 pb-md-2", styles.rightContainer)}>
					<RecentActivity loggedIn={loggedIn} loading={loading} history={historyList} />
				</div>
			</div>
		</WagmiConfig>
	);
}
