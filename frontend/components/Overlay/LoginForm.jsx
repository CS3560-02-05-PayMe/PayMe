import styles from "../../styles/heading.module.css";
import { useAccount } from "../providers/AccountProvider";
import { fetchPM, fullName, getOtherPartyUUID, isRecipient } from "../util/helpers";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param apply 	   Calls provided function from parent (ensure conditional state is correct)
 * @param onRelease    Closes login form
 * @param onAltRelease Opens register form
 *
 */
export default function LoginForm({ apply, onRelease, onAltRelease }) {
	const { account, updateAccount, updateAddressList, updateCardList, updateHistoryList, updateRequestInList } = useAccount();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// log user in
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(username, password);

		const accountPromise = fetchPM("/getAccount", username, password);

		accountPromise
			.then(async (account) => {
				const addressListPromise = fetchPM("/getAddressList", account.accountID);
				const cardListPromise = addressListPromise.then(() => fetchPM("/getCreditCardList", account.accountID));
				const historyListPromise = cardListPromise.then(() => fetchPM("/getTransactionList", account.accountID));
				const requestInListPromise = historyListPromise.then(() => fetchPM("/getRequestInList", account.accountID));

				return Promise.all([accountPromise, addressListPromise, cardListPromise, historyListPromise, requestInListPromise]).then(
					async ([account, addressList, cardList, historyList, requestInList]) => {
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

						const requests = [];

						for (let i = 0; i < requestInList.length; i++) {
							const request = requestInList[i];
							console.log(request);

							const transaction = await fetchPM("/getTransaction", request.transactionID);
							console.log(transaction)
							const otherParty = await fetchPM("/getAccountByUuid", transaction.recipientID);
							console.log(otherParty)
							const requestDetails = {
								key: i,
								subject: fullName(otherParty),
								username: otherParty.username,
								message: transaction.message,
								amount: transaction.transactionAmount,
							};
							requests.push(requestDetails);
						}
						updateRequestInList(requests);
					}
				);
			})
			.then(apply) // ensure all data is correctly retrieved before closing form
			.catch(console.error);
	};

	const formInputs = [
		// {/* <UserOutlined className={clsx("", styles.formInputIcon)} style={{ color: "black" }} /> */}
		<input
			type="text"
			placeholder="Username"
			required
			onChange={(event) => {
				setUsername(event.target.value);
			}}
		/>,
		// {/* <LockOutlined className={clsx("", styles.formInputIcon)} style={{ color: "black" }} /> */}
		<input
			type="password"
			placeholder="Password"
			required
			onChange={(event) => {
				setPassword(event.target.value);
			}}
		/>,
	];

	return (
		<Form formType={"Login"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease} outsideClick={apply}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Login
			</button>
			<div className={clsx("my-2", styles.formRegister)}>
				<span>
					Don't have an account?{" "}
					<a
						href="#"
						onClick={(event) => {
							onRelease(event);
							onAltRelease(event);
						}}
					>
						Register
					</a>
				</span>
			</div>
		</Form>
	);
}
