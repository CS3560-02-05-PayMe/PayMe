import styles from "../../styles/heading.module.css";

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
		console.log(debtor, amount);
	};

	return (
		<Form formType={"Request"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Request
			</button>
		</Form>
	);
}
