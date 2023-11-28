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
	const { updateAccount, updateAddressList, updateCardList, updateHistoryList, updateRequestInList, updateRequestOutList, updateFriendList } = useAccount();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// log user in
	const handleSubmit = async (event) => {
		event.preventDefault();

		const account = await fetchPM("/getAccount", "u1", "p1");
		console.log(account);
		updateAccount(account);

		const [addressList, cardList, historyList, requestInList, requestOutList, friendList] = await Promise.all([
			fetchPM("/getAddressList", account.accountID),
			fetchPM("/getCreditCardList", account.accountID),
			fetchPM("/getTransactionList", account.accountID),
			fetchPM("/getRequestInList", account.accountID),
			fetchPM("/getRequestOutList", account.accountID),
			fetchPM("/getFriendList", account.accountID),
		]);

		updateAddressList(addressList);
		updateCardList(cardList);

		const history = await Promise.all(
			historyList.map(async (record, index) => {
				const otherPartyUUID = getOtherPartyUUID(record, account);
				const otherParty = await fetchPM("/getAccountByUuid", otherPartyUUID);
				return {
					key: index,
					subject: otherParty.firstName,
					username: otherParty.username,
					type: isRecipient(record, account) ? "Receive" : "Send",
					message: record.message,
					amount: record.transactionAmount,
				};
			})
		);

		updateHistoryList(history);

		const updateRequests = async (requestList, updateFunction, isPayer) => {
			const requests = await Promise.all(
				requestList.map(async (request, index) => {
					if (request.settled) return null;

					const transaction = await fetchPM("/getTransaction", request.transactionID);
					const otherParty = await fetchPM("/getAccountByUuid", isPayer ? transaction.recipientID : transaction.payerID);

					return {
						key: index,
						transactionId: transaction.transactionID,
						requestId: request.requestID,
						subject: fullName(otherParty),
						username: otherParty.username,
						message: transaction.message,
						amount: transaction.transactionAmount,
					};
				})
			);

			updateFunction(requests.filter(Boolean));
		};

		await updateRequests(requestInList, updateRequestInList, true);
		await updateRequests(requestOutList, updateRequestOutList, false);

		updateFriendList(friendList);

		apply(); // ensure all data is correctly retrieved before closing form
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
