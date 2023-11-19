import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { useState } from "react";

/**
 * 
 * @param [login/register] Determines whether to show login/register form
 * @param resetConditional Resets conditional in other components (ensures user is able to close and re-open login/register form)
 * 
 */
export default function AuthForm({ forms: { login = true, register = false }, resetConditional }) {
    // moderation for login/register form
	const [forms, setForms] = useState({ login, register });

	const openForm = (event, formType) => {
        event?.stopPropagation();
		setForms((prevForms) => ({ ...prevForms, [formType]: true }));
	};

    const closeForm = (formType) => {
		setForms((prevForms) => ({ ...prevForms, [formType]: false }));
    }

	const openLoginForm = (event) => {
        openForm(event, "login");
	};

	const closeLoginForm = () => {
        closeForm("login");
	};

	const openRegisterForm = (event) => {
        openForm(event, "register");
	};

	const closeRegisterForm = () => {
        closeForm("register");
	};

	return (
		<>
			{forms.login && <LoginForm onRelease={closeLoginForm} onAltRelease={openRegisterForm} apply={resetConditional} />}
			{forms.register && <RegisterForm onRelease={closeRegisterForm} onAltRelease={openLoginForm} apply={resetConditional} />}
		</>
	);
}
