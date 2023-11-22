import styles from "../../styles/heading.module.css";

import { doubleify, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function TransferForm({ apply, onRelease }) {
	const [card, setCard] = useState("");
	const [amount, setAmount] = useState(0);

	const formInputs = [
		<input
			type="text"
			placeholder="Transfer from"
			required
			onChange={(event) => {
				setCard(event.target.value);
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
		console.log(card, amount);
		apply({ name: card, amount });
	};

	return (
		<Form formType={"Transfer"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Transfer
			</button>
		</Form>
	);
}
