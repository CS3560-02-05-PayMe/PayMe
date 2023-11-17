import styles from "../../styles/heading.module.css";

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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// log user in
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(username, password);
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
