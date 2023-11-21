import styles from "../../styles/heading.module.css";
import { useAccount } from "../providers/AccountProvider";

import { doubleify, fetchPM, formatUsername, isRecipient, postPM, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param onRelease Closes pay form
 *
 */
export default function PayForm({ onRelease }) {
	const { account, updateAccount, historyList, updateHistoryList } = useAccount();

	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState("None provided.");

	const formInputs = [
		<input
			type="text"
			placeholder="Recipient"
			required
			onChange={(event) => {
				const formattedRecipient = formatUsername(event.target.value);
				event.target.value = formattedRecipient;
				setRecipient(formattedRecipient);
			}}
		/>,
		<input
			type="text"
			placeholder="Amount"
			required
			onChange={(event) => {
				const formattedNumber = doubleify(event.target.value);
				event.target.value = formattedNumber;
				setAmount(toFloat(formattedNumber));
			}}
		/>,
		<input
			type="text"
			placeholder="Message"
			required
			onChange={(event) => {
				setMessage(event.target.value);
			}}
		/>,
	];

	// update user balance and transaction history
	const handleSubmit = async (event) => {
		event.preventDefault();

		const accountPromise = fetchPM("/getAccount", recipient.replace("@", ""));

		accountPromise.then((recipientAccount) => {
			const transactionBody = {
				message,
				transactionDate: new Date().toISOString(),
				transactionAmount: amount,
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
				console.log(tempAccount);
				postPM("/updateAccount", tempAccount, account.accountID);
				// const tempRecipientAccount = { ...recipientAccount, balance: (recipientAccount.balance + amount).toFixed(2) };
				// postPM("/updateAccount", tempRecipientAccount, recipientAccount.accountID);
			});
		});
	};

	return (
		<Form formType={"Pay"} formAltType={"Payment Sent"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Send
			</button>
		</Form>
	);
}
