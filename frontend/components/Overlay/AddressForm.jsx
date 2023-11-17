import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 * 
 * @param addresses List of saved addresses
 * @param apply 	Updates primary address
 * @param onRelease Closes Address Form
 * 
 */
export default function AddressForm({ addresses, apply, onRelease }) {
	const [address, setAddress] = useState({});
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const formInputs = [
		<input
			type="text"
			placeholder="Address"
			onChange={(event) => {
				setAddress({ street: event.target.value });
			}}
		/>,
	];

	// helper function to determine which address is "checked"
	const handleRadioChange = (index) => {
		setSelectedIndex(index);
	};

	// save changes and update database
	const handleSubmit = async (event) => {
		event.preventDefault();
		let updatedAddress = selectedIndex === -1 ? address : addresses.at(selectedIndex);
		apply(updatedAddress);
	};

	return (
		<Form formType={"Change Address"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
			<fieldset>
				<div className="d-flex flex-column w-100 px-3 pb-3 justify-content-start">
					{addresses.map((item, index) => (
						<label key={index} className="d-flex w-100">
							<input type="radio" name="addressRadio" defaultChecked={item.primary} onClick={() => handleRadioChange(index)} />
							<span className={clsx("ms-2", typingStyles.fontType7)}>{item.street}</span>
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
