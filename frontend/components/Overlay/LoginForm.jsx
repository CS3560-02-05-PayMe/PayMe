import styles from "../../styles/heading.module.css";
import { useAccount } from "../providers/AccountProvider";
import { fetchPM } from "../util/helpers";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param apply 	   Calls provided function from parent (ensure conditional state is correct)
 * @param onRelease    Closes login form
 * @param onAltRelease Opens register form
 *
 */
export default function LoginForm({ apply, onRelease, onAltRelease }) {
	const { account, updateAccount, updateAddressList, updateCardList } = useAccount();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// log user in
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(username, password);
		apply();

		const accountPromise = fetchPM("/getAccount", username, password);

		accountPromise
			.then((account) => {
				const addressListPromise = fetchPM("/getAddressList", account.accountID);
				const cardListPromise = addressListPromise.then(() => fetchPM("/getCreditCardList", account.accountID));

				return Promise.all([accountPromise, addressListPromise, cardListPromise]).then(([account, addressList, cardList]) => {
					console.log(account, addressList, cardList);
					updateAccount(account);
					updateAddressList(addressList);
					updateCardList(cardList);
				});
			})
			.catch(console.error);
	};

	const formInputs = [
		// {/* <UserOutlined className={clsx("", styles.formInputIcon)} style={{ color: "black" }} /> */}
		<input
			type="text"
			placeholder="Username"
			required
			onChange={(event) => {
				setUsername(event.target.value);
			}}
		/>,
		// {/* <LockOutlined className={clsx("", styles.formInputIcon)} style={{ color: "black" }} /> */}
		<input
			type="password"
			placeholder="Password"
			required
			onChange={(event) => {
				setPassword(event.target.value);
			}}
		/>,
	];

	return (
		<Form formType={"Login"} formInputs={formInputs} onSubmit={handleSubmit} onRelease={onRelease} outsideClick={apply}>
			<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
				Login
			</button>
			<div className={clsx("my-2", styles.formRegister)}>
				<span>
					Don't have an account?{" "}
					<a
						href="#"
						onClick={(event) => {
							onRelease(event);
							onAltRelease(event);
						}}
					>
						Register
					</a>
				</span>
			</div>
		</Form>
	);
}
