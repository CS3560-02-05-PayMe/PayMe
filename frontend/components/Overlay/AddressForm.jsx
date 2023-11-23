import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";
import { emptyFields, numberify } from "../util/helpers";

/**
 *
 * @param apply 	Updates primary address
 * @param onRelease Closes Address Form
 *
 */
export default function AddressForm({ apply, onRelease }) {
	const { addressList } = useAccount();

	const [step, setStep] = useState(1);

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

	const toggleStep = (event) => {
		event.preventDefault();
		setStep((step === 1) + 1);
	};

	// save changes and update database
	const handleSubmit = async (event) => {
		event.preventDefault();
		const isEmptyForm = emptyFields(address, city, state, zipCode, country);
		let updatedAddress =
			// if same address is selected and all fields are empty, save current address
			// ALL fields must be filled in order to update address
			//
			// later will be changed to "Add new address" form
			!isEmptyForm
				? { primaryAddress: address, cityName: city, stateName: state, zipCode, country }
				: addressList.at(selectedIndex);

		// only update address if new address is entered or different address is selected
		if (selectedIndex !== -1 || !isEmptyForm) apply(updatedAddress);
	};

	return (
		<Form formType={"Change Address"} formAltType={"Updated Address"} onSubmit={handleSubmit} onRelease={onRelease} formAltSrc={"updateAddress"}>
			<fieldset className={clsx({ [styles.hide]: step > 1 })}>
				<div className="d-flex flex-column w-100 px-3 py-2 justify-content-start">
					{addressList.map((item, index) => (
						<label key={index} className="d-flex w-100 pb-2">
							<input type="radio" name="addressRadio" defaultChecked={item.isPriority} onClick={() => handleRadioChange(index)} />
							<span className={clsx("ms-2", typingStyles.fontType7)}>{item.primaryAddress}</span>
						</label>
					))}
				</div>
			</fieldset>
			<fieldset className={clsx({ [styles.show]: step === 2 })}>
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
