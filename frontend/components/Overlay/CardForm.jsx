import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import { formatCardNumber, formatExpirationDate, formatYearMonth, numberify, shorten } from "../util/helpers";
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

	// save changes and update database
	const handleSubmit = async (event) => {
		event.preventDefault();
		let updatedCard = selectedIndex === -1 ? { firstName, lastName, cardNumber, cvvNumber, expDate: cardExpDate } : cardList.at(selectedIndex);
		apply(updatedCard);
	};

	return (
		<Form formType={"Change Card"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<fieldset>
				<div className="d-flex flex-column w-100 px-3 pb-3 justify-content-start">
					{cardList.map((item, index) => (
						<label key={index} className="d-flex w-100">
							<input type="radio" name="cardRadio" defaultChecked={item.isPriority} onClick={() => handleRadioChange(index)} />
							<span className={clsx("ms-2", typingStyles.fontType7)}>Ends in {shorten(item.cardNumber)}</span>
						</label>
					))}
				</div>
			</fieldset>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Save
			</button>
		</Form>
	);
}
