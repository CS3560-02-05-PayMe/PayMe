import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import { emptyFields, formatCardNumber, formatExpirationDate, formatYearMonth, numberify, shorten } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param cards 	List of saved cards
 * @param apply 	Updates primary card
 * @param onRelease Closes card form
 *
 */
export default function CardForm({ apply, onRelease }) {
	const {
		account: { firstName, lastName },
		cardList,
	} = useAccount();

	const [step, setStep] = useState(1);

	const [selectedIndex, setSelectedIndex] = useState(-1);

	const [cardNumber, setCardNumber] = useState("");
	const [cvvNumber, setCvvNumber] = useState("");
	const [cardExpDate, setCardExpDate] = useState("");

	const formInputs = [
		<input
			type="text"
			placeholder="Credit Card Number"
			maxLength={19}
			onChange={(event) => {
				const formattedCardNumber = formatCardNumber(event.target.value);
				event.target.value = formattedCardNumber;
				setCardNumber(formattedCardNumber);
			}}
		/>,
		<input
			type="text"
			placeholder="CVV"
			maxLength={3}
			onChange={(event) => {
				setCvvNumber(numberify(event.target.value));
			}}
		/>,
		<input
			type="text"
			placeholder="MM/YY"
			maxLength={5}
			onChange={(event) => {
				const formattedNumber = formatExpirationDate(event.target.value);
				event.target.value = formattedNumber;
				setCardExpDate(formatYearMonth(formattedNumber));
			}}
		/>,
	];

	// helper function to determine which card is "checked"
	const handleRadioChange = (index) => {
		setSelectedIndex(index);
	};

	const toggleStep = (event) => {
		event.preventDefault();
		setStep((step === 1) + 1);
	};

	// save changes and update database
	const handleSubmit = async (event) => {
		event.preventDefault();
		const isEmptyForm = emptyFields(cardNumber, cvvNumber, cardExpDate);
		let updatedCard =
			// if same card is selected and all fields are empty, save current card
			// ALL fields must be filled in order to update card
			//
			// later will be changed to "Add new card" form
			!isEmptyForm
				? { firstName, lastName, cardNumber, cvvNumber, expDate: cardExpDate }
				: cardList.at(selectedIndex);

		// only update card if new card is entered or different card is selected
		if (selectedIndex !== -1 || !isEmptyForm) apply(updatedCard);
	};

	return (
		<Form formType={"Change Card"} formAltType={"Updated Card"} onSubmit={handleSubmit} onRelease={onRelease} formAltSrc={"updateCard"}>
			<fieldset className={clsx({ [styles.hide]: step > 1 })}>
				<div className="d-flex flex-column w-100 px-3 py-2 justify-content-start">
					{cardList.map((item, index) => (
						<label key={index} className="d-flex w-100 pb-2">
							<input type="radio" name="cardRadio" defaultChecked={item.isPriority} onClick={() => handleRadioChange(index)} />
							<span className={clsx("ms-2", typingStyles.fontType7)}>Ends in {shorten(item.cardNumber)}</span>
						</label>
					))}
				</div>
			</fieldset>
			<fieldset className={clsx({ [styles.show]: step == 2 })}>
				{formInputs.map((item, index) => (
					<div key={index} className={clsx("my-3", styles.formInput)}>
						{item}
					</div>
				))}
			</fieldset>
			<div className={clsx("d-flex w-100 justify-content-between")}>
				<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={toggleStep}>
					{step === 1 ? "Add new" : "Back"}
				</button>
				<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
					Save
				</button>
			</div>
		</Form>
	);
}
