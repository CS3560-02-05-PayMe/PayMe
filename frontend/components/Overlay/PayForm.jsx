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
	const totalSteps = 2;

	const handleNextStep = (event) => {
		event.preventDefault();
		if (step < totalSteps) {
			setStep(step + 1);
		}
	};

	const handlePreviousStep = (event) => {
		event.preventDefault();
		if (step > 1) {
			setStep(step - 1);
		}
	};

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
	]

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

	// update user balance and transaction history
	const handleSubmit = async (event) => {
		event.preventDefault();

		apply({ recipient, amount, message });
	};

	return (
		<Form formType={"Pay"} formAltType={"Payment Sent"} onSubmit={handleSubmit} onRelease={onRelease} outsideClick={apply}>
			<fieldset className={clsx("w-100", { [styles.hide]: step > 1 })}>
				<div className={clsx("d-flex w-100 justify-content-center")}>
					<span className={clsx(typingStyles.fontType7)}>Recipient Details</span>
				</div>
				{firstFormInput.map((item, index) => {
					return (
						<div key={index} className={clsx("my-3", styles.formInput)}>
							{item}
						</div>
					);
				})}
				<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handleNextStep}>
					Next
				</button>
			</fieldset>
			<fieldset className={clsx("w-100", { [styles.show]: step === 2 })}>
				<div className={clsx("d-flex w-100 justify-content-center")}>
					<span className={clsx(typingStyles.fontType7)}>Payment Details</span>
				</div>
				{secondFormInput.map((item, index) => {
					return (
						<div key={index} className={clsx("my-3", styles.formInput)}>
							{item}
						</div>
					);
				})}
				<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)} onClick={handleNextStep}>
					Send
				</button>
				{/*<div className={clsx("d-flex w-100 justify-content-between", styles.registerButtonWrapper)}>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handlePreviousStep}>
						Previous
					</button>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handleNextStep}>
						Next
					</button>
				</div>*/}
			</fieldset>
		</Form>
		// <Form formType={"Pay"} formAltType={"Payment Sent"} formInputs={firstFormInput} onSubmit={handleSubmit} onRelease={onRelease}>
		// 	<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
		// 		Send
		// 	</button>
		// </Form>
	);
}
