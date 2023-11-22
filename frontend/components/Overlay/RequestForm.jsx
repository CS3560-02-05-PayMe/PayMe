import styles from "../../styles/heading.module.css";

import { doubleify, formatUsername, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param apply 	Calls provided function from parent (sends request to mentioned account)
 * @param onRelease Closes request form
 *
 */
export default function RequestForm({ apply, onRelease }) {
	const [debtor, setDebtor] = useState("");
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState("");

	const formInputs = [
		<input
			type="text"
			placeholder="Request From"
			required
			onChange={(event) => {
				const formattedPayer = formatUsername(event.target.value);
				event.target.value = formattedPayer;
				setDebtor(formattedPayer);
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

	// send request to mentioned account's inbox
	const handleSubmit = async (event) => {
		event.preventDefault();

		apply({ payer: debtor, amount, message });
	};

	return (
		<Form formType={"Request"} formAltType={"Request Sent"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease} formAltSrc={"requestSent"}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Request
			</button>
		</Form>
	);
}
