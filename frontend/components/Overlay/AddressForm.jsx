import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";
import { emptyFields, numberify } from "../util/helpers";
import FormSubmitted from "./PostOverlay/FormSubmitted";

/**
 *
 * @param apply 	Updates primary address
 * @param onRelease Closes Address Form
 *
 */
export default function AddressForm({ apply, onRelease }) {
	const { addressList } = useAccount();

	const [selectedIndex, setSelectedIndex] = useState(-1);

	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [country, setCountry] = useState("");

	const formInputs = [
		<input
			type="text"
			placeholder="Address"
			onChange={(event) => {
				setAddress(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="City"
			onChange={(event) => {
				setCity(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="State"
			onChange={(event) => {
				setState(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="Zip Code"
			onChange={(event) => {
				setZipCode(numberify(event.target.value));
			}}
		/>,
		<input
			type="text"
			placeholder="Country"
			onChange={(event) => {
				setCountry(event.target.value);
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
		let updatedAddress =
			// if same address is selected and all fields are empty, save current address
			// ALL fields must be filled in order to update address
			//
			// later will be changed to "Add new address" form
			selectedIndex === -1 && !emptyFields(address, city, state, zipCode, country)
				? { primaryAddress: address, cityName: city, stateName: state, zipCode, country }
				: addressList.at(selectedIndex);

		// only update address if new address is entered or different address is selected
		if (selectedIndex !== -1 || !emptyFields(address, city, state, zipCode, country)) apply(updatedAddress);
	};

	return (
		<Form formType={"Change Address"} formAltType={"Updated Address"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease} formAltSrc={"updateAddress"}>
			<fieldset>
				<div className="d-flex flex-column w-100 px-3 pb-3 justify-content-start">
					{addressList.map((item, index) => (
						<label key={index} className="d-flex w-100">
							<input type="radio" name="addressRadio" defaultChecked={item.isPriority} onClick={() => handleRadioChange(index)} />
							<span className={clsx("ms-2", typingStyles.fontType7)}>{item.primaryAddress}</span>
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
