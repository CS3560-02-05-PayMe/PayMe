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

	const [step, setStep] = useState(1);

	const firstFormInput = [
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

	// send request to mentioned account's inbox
	const handleSubmit = async (event) => {
		event.preventDefault();

		apply({ payer: debtor, amount, message });
	};

	return (
		<Form formType={"Request"} formAltType={"Request Sent"} onSubmit={handleSubmit} onRelease={onRelease} formAltSrc={"requestSent"}>
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
						Request
					</button>
				</div>
			</fieldset>
		</Form>
	);
}
