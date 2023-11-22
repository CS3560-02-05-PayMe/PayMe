import styles from "../../styles/heading.module.css";

import { doubleify, formatUsername, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param apply 	Handles pay submission
 * @param onRelease Closes pay form
 *
 */
export default function PayForm({ apply, onRelease }) {
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

		apply({ recipient, amount, message });
	};

	return (
		<Form formType={"Pay"} formAltType={"Payment Sent"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Send
			</button>
		</Form>
	);
}
