import styles from "../../styles/heading.module.css";

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
			type="number"
			placeholder="Amount"
			required
			onChange={(event) => {
				setAmount(event.target.value);
			}}
		/>,
	];

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(recipient, amount);
	};

	return (
		<Form formType={"Pay"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Send
			</button>
		</Form>
	);
}
