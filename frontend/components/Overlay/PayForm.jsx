import styles from "../../styles/heading.module.css";

import { doubleify, formatUsername, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";
import typingStyles from "../../styles/typing.module.css";

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

	const [step, setStep] = useState(1);

	const firstFormInput = [
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
	];

	const secondFormInput = [
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

	const toggleStep = (event) => {
		event.preventDefault();
		setStep((step === 1) + 1);
	};

	// update user balance and transaction history
	const handleSubmit = async (event) => {
		event.preventDefault();

		apply({ recipient, amount, message });
	};

	return (
		<Form formType={"Pay"} formAltType={"Payment Sent"} onSubmit={handleSubmit} onRelease={onRelease}>
			<fieldset className={clsx("w-100", { [styles.hide]: step > 1 })}>
				{firstFormInput.map((item, index) => (
					<div key={index} className={clsx("my-3", styles.formInput)}>
						{item}
					</div>
				))}
				<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={toggleStep}>
					Next
				</button>
			</fieldset>
			<fieldset className={clsx("w-100", { [styles.show]: step === 2 })}>
				{secondFormInput.map((item, index) => (
					<div key={index} className={clsx("my-3", styles.formInput)}>
						{item}
					</div>
				))}
				<div className={clsx("d-flex w-100 justify-content-between")}>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={toggleStep}>
						Previous
					</button>
					<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
						Send
					</button>
				</div>
			</fieldset>
		</Form>
	);
}
