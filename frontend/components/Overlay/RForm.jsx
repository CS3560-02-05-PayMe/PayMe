import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function RegisterForm({ onRelease, onAltRelease }) {
	const [step, setStep] = useState(1);
	const totalSteps = 2;

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");

	const [address, setAddress] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cvvNumber, setCvvNumber] = useState("");
	const [cardExpDate, setCardExpDate] = useState("");

	const handleNextStep = () => {
		if (step < totalSteps) {
			setStep(step + 1);
		}
	};

	const handlePreviousStep = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	// create new user account
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log({ name, username, password, phone, email, address, cardNumber, cvvNumber, cardExpDate });
		// fetch(`http://localhost:8080/addAccount`, {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({ emailAddress: email, firstName: name, lastName: name, username, password, phoneNumber: phone, balance: 100 }),
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log(data);
		// 	})
		// 	.catch(console.error);

		fetch("http://localhost:8080/getAccount/377a5cb5-f1a1-4aef-bf65-f0fea4995aba", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((account) => {
				console.log(account);
			})
			.catch(console.error);
	};

	const numberify = (value) => {
		return value.replace(/\D/g, "");
	};

	const formatPhoneNumber = (value) => {
		value = numberify(value);

		let npa = value.slice(0, 3); // number planning area (area code)
		let nxx = value.slice(3, 6); // exchange/central office code
		let sln = value.slice(6, 10); // subscriber line number (last 4 digits)

		return npa + (nxx.length > 0 ? "-" : "") + nxx + (sln.length > 0 ? "-" : "") + sln;
	};

	const formatCardNumber = (value) => {
		value = numberify(value);

		return value.replace(/(\d{4})/g, "$1 ").trim();
	};

	const formatExpirationDate = (value) => {
		value = numberify(value);

		return value.replace(/(\d{2})(\d{0,2})/g, (match, p1, p2) => `${p1}${p2 ? "/" + p2 : ""}`);
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
				setPhone(formattedNumber);
			}}
		/>,
		<input
			type="email"
			placeholder="Email Address"
			required
			onChange={(event) => {
				setEmail(event.target.value);
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
			placeholder="Credit Card Number"
			required
			maxLength={19}
			onChange={(event) => {
				const formattedNumber = formatCardNumber(event.target.value);
				event.target.value = formattedNumber;
				setCardNumber(formattedNumber);
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

	const formInputs = step < 2 ? firstFormInput : secondFormInput;
	// formInputs={formInputs}
	return (
		<Form formType={"Register"} onSubmit={handleSubmit} onRelease={onRelease}>
			<fieldset className={clsx("w-100")}>
				<div className={clsx("d-flex w-100 justify-content-center")}>
					<span className={clsx(typingStyles.fontType7)}>{step === 1 ? "Personal Details" : "Payment Details"}</span>
				</div>
				{formInputs.map((item, index) => {
					return (
						<div key={index} className={clsx("my-3", styles.formInput)}>
							{item}
						</div>
					);
				})}
				{step < 2 && (
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handleNextStep}>
						Next
					</button>
				)}
				{step > 1 && (
					<div className={clsx("d-flex w-100 justify-content-between", styles.registerButtonWrapper)}>
						<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handlePreviousStep}>
							Previous
						</button>
						<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
							Register
						</button>
					</div>
				)}
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
