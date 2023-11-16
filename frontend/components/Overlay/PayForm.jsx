import styles from "../../styles/heading.module.css";

import { doubleify, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function PayForm({ apply, onRelease }) {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState(0);

	const formInputs = [
		<input
			type="text"
			placeholder="Recipient"
			required
			onChange={(event) => {
				setRecipient(event.target.value);
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
	];

	const handleSubmit = async (event) => {
		event.preventDefault();
		const recipientObject = {};
		if (recipient.startsWith("@")) recipientObject.username = recipient.replace("@", "");
		else recipientObject.name = recipient;
		console.log(recipientObject, recipient, amount);
		apply({ ...recipientObject, amount});
	};

	return (
		<Form formType={"Pay"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Send
			</button>
		</Form>
	);
}
