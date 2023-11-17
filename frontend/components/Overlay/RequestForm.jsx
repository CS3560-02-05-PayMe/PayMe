import styles from "../../styles/heading.module.css";

import { doubleify, toFloat } from "../util/helpers";
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

	// send request to mentioned account's inbox
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
