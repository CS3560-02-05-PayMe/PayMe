import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import { numberify, formatCardNumber, formatExpirationDate, formatPhoneNumber, postPM } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param apply 	   Calls provided function from parent (ensure conditional state is correct)
 * @param onRelease    Closes register form
 * @param onAltRelease Opens login form
 *
 */
export default function RegisterForm({ apply, onRelease, onAltRelease }) {
	const { updateAccount, updateAddressList, updateCardList } = useAccount();

	const [step, setStep] = useState(1);
	const totalSteps = 3;

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [emailAddress, setEmailAddress] = useState("");

	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [country, setCountry] = useState("");

	const [cardNumber, setCardNumber] = useState("");
	const [cvvNumber, setCvvNumber] = useState("");
	const [cardExpDate, setCardExpDate] = useState("");

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

	// create new user account
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log({ name, username, password, phoneNumber, emailAddress, address, cardNumber, cvvNumber, cardExpDate, city, state, zipCode, country });
		apply();

		const tokenizedName = name.split(/\s+/g);
		const accountBody = {
			firstName: tokenizedName[0],
			lastName: tokenizedName[1],
			username,
			password,
			emailAddress,
			phoneNumber,
			balance: 1000,
		};

		await postPM("/addAccount", accountBody).then((account) => {
			updateAccount(account);

			const addressBody = {
				primaryAddress: address,
				cityName: city,
				stateName: state,
				zipCode,
				country,
				isPriority: true,
			};

			postPM("/addAddress", addressBody, account.accountID)
				.then((addressList) => {
					updateAddressList(addressList);
					console.log(addressList);
				})
				.catch(console.error);

			const cardBody = {
				firstName: tokenizedName[0],
				lastName: tokenizedName[1],
				cardNumber,
				cvvNumber,
				expDate: cardExpDate,
				isPriority: true,
			};

			postPM("/addCreditCard", cardBody, account.accountID)
				.then((cardList) => {
					updateCardList(cardList);
					console.log(cardList);
				})
				.catch(console.error);
		}).catch(error => {
			if (error.status === 409) {
				// show banner stating account already exists
			}
		});
	};

	const firstFormInput = [
		<input
			type="text"
			placeholder="Name"
			required
			onChange={(event) => {
				setName(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="Username"
			required
			onChange={(event) => {
				setUsername(event.target.value);
			}}
		/>,
		<input
			type="password"
			placeholder="Password"
			required
			onChange={(event) => {
				setPassword(event.target.value);
			}}
		/>,
		<input
			type="tel"
			placeholder="Phone Number"
			required
			maxLength={12}
			onChange={(event) => {
				const formattedNumber = formatPhoneNumber(event.target.value);
				event.target.value = formattedNumber;
				setPhoneNumber(numberify(formattedNumber));
			}}
		/>,
		<input
			type="email"
			placeholder="Email Address"
			required
			onChange={(event) => {
				setEmailAddress(event.target.value);
			}}
		/>,
	];

	const secondFormInput = [
		<input
			type="text"
			placeholder="Address"
			required
			onChange={(event) => {
				setAddress(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="City"
			required
			onChange={(event) => {
				setCity(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="State"
			required
			onChange={(event) => {
				setState(event.target.value);
			}}
		/>,
		<input
			type="text"
			placeholder="Zip Code"
			required
			onChange={(event) => {
				setZipCode(numberify(event.target.value));
			}}
		/>,
		<input
			type="text"
			placeholder="Country"
			required
			onChange={(event) => {
				setCountry(event.target.value);
			}}
		/>,
	];

	const thirdFormInput = [
		<input
			type="text"
			placeholder="Credit Card Number"
			required
			maxLength={19}
			onChange={(event) => {
				const formattedNumber = formatCardNumber(event.target.value);
				event.target.value = formattedNumber;
				setCardNumber(numberify(formattedNumber));
			}}
		/>,
		<input
			type="text"
			placeholder="CVV"
			required
			maxLength={3}
			onChange={(event) => {
				setCvvNumber(numberify(event.target.value));
			}}
		/>,
		<input
			type="text"
			placeholder="MM/YY"
			required
			maxLength={5}
			onChange={(event) => {
				const formattedNumber = formatExpirationDate(event.target.value);
				event.target.value = formattedNumber;
				setCardExpDate(formattedNumber);
			}}
		/>,
	];

	// TODO: clean up logic
	// formInputs={formInputs}
	return (
		<Form formType={"Register"} onSubmit={handleSubmit} onRelease={onRelease} outsideClick={apply}>
			<fieldset className={clsx("w-100", { ["d-none"]: step > 1 })}>
				<div className={clsx("d-flex w-100 justify-content-center")}>
					<span className={clsx(typingStyles.fontType7)}>Personal Details</span>
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
			<fieldset className={clsx("w-100", { ["d-inline-block"]: step === 2 })}>
				<div className={clsx("d-flex w-100 justify-content-center")}>
					<span className={clsx(typingStyles.fontType7)}>Address Details</span>
				</div>
				{secondFormInput.map((item, index) => {
					return (
						<div key={index} className={clsx("my-3", styles.formInput)}>
							{item}
						</div>
					);
				})}
				<div className={clsx("d-flex w-100 justify-content-between", styles.registerButtonWrapper)}>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handlePreviousStep}>
						Previous
					</button>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handleNextStep}>
						Next
					</button>
				</div>
			</fieldset>
			<fieldset className={clsx("w-100", { ["d-inline-block"]: step > 2 })}>
				<div className={clsx("d-flex w-100 justify-content-center")}>
					<span className={clsx(typingStyles.fontType7)}>Payment Details</span>
				</div>
				{thirdFormInput.map((item, index) => {
					return (
						<div key={index} className={clsx("my-3", styles.formInput)}>
							{item}
						</div>
					);
				})}
				<div className={clsx("d-flex w-100 justify-content-between", styles.registerButtonWrapper)}>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handlePreviousStep}>
						Previous
					</button>
					<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
						Register
					</button>
				</div>
			</fieldset>
			<div className={clsx("my-2", styles.formRegister)}>
				<span>
					Already have an account?{" "}
					<a
						href="#"
						onClick={(event) => {
							onRelease(event);
							onAltRelease(event);
						}}
					>
						Login
					</a>
				</span>
			</div>
		</Form>
	);
}
