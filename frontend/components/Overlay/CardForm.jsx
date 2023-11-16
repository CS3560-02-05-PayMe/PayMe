import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import { formatCardNumber } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function CardForm({ cards, apply, onRelease }) {
	const [card, setCard] = useState({});
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const formInputs = [
		<input
			type="text"
			placeholder="Card Number"
			onChange={(event) => {
				const formattedCardNumber = formatCardNumber(event.target.value);
				event.target.value = formattedCardNumber;
				setCard({ cardNumber: formattedCardNumber });
			}}
		/>,
	];

	const handleRadioChange = (index) => {
		setSelectedIndex(index);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let updatedCard = selectedIndex === -1 ? card : cards.at(selectedIndex);
		apply(updatedCard);
	};

	return (
		<Form formType={"Change Card"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<fieldset>
				<div className="d-flex flex-column w-100 px-3 pb-3 justify-content-start">
					{cards.map((item, index) => (
						<label key={index} className="d-flex w-100">
							<input type="radio" name="cardRadio" defaultChecked={item.primary} onClick={() => handleRadioChange(index)} />
							<span className={clsx("ms-2", typingStyles.fontType7)}>Ends in {item.cardNumber}</span>
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
