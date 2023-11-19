import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";
import { numberify } from "../util/helpers";

/**
 *
 * @param apply 	Updates primary address
 * @param onRelease Closes Address Form
 *
 */
export default function AddressForm({ apply, onRelease }) {
	const { addressList } = useAccount();

	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [country, setCountry] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(-1);

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
		let updatedAddress = selectedIndex === -1 ? { primaryAddress: address, cityName: city, stateName: state, zipCode, country } : addressList.at(selectedIndex);
		apply(updatedAddress);
	};

	return (
		<Form formType={"Change Address"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease}>
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
