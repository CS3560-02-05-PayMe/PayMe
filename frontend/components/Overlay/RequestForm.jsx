import styles from "../../styles/heading.module.css";

import { doubleify, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function RequestForm({ apply, onRelease }) {
	const [debtor, setDebtor] = useState("");
	const [amount, setAmount] = useState(0);

	const formInputs = [
		<input
			type="text"
			placeholder="Request From"
			required
			onChange={(event) => {
				setDebtor(event.target.value);
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
		console.log(debtor, amount);
		apply({ name: debtor, amount });
	};

	return (
		<Form formType={"Request"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Request
			</button>
		</Form>
	);
}
