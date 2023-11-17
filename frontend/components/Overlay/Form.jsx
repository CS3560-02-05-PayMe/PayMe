import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import clsx from "clsx";
import { useEffect, useRef } from "react";

/**
 *
 * @param children 	   Child components/content to pass
 * @param formType     Title of form
 * @param formInputs   List of inputs expected from user
 * @param onSubmit
 * @param onRelease    Closes form
 * @param outsideClick Calls provided function from parent
 *
 */
export default function Form({ children, formType, formInputs = [], onSubmit: handleSubmit = () => {}, onRelease: apply, outsideClick = () => {} }) {
	const formRef = useRef(null);

	useEffect(() => {
		//
		const handleFormClick = (event) => {
			if (formRef.current && !formRef.current.contains(event.target)) {
				apply();
				outsideClick();
			}
		};

		document.addEventListener("click", handleFormClick);

		return () => {
			document.removeEventListener("click", handleFormClick);
		};
	}, []);

	return (
		<div className={clsx("position-fixed top-0 start-0", styles.loginFormContainer)}>
			<div className={clsx("d-flex flex-column position-relative top-50 start-50 p-4", styles.loginForm, typingStyles.fontType5)} ref={formRef}>
				<span className={clsx("w-100 text-center", styles.formHeading, typingStyles.fontTypeHeading1)}>{formType}</span>
				<form
					className={clsx("w-100 text-center", styles.formFields)}
					onSubmit={(event) => {
						handleSubmit(event);
						apply();
					}}
				>
					{formInputs.map((item, index) => (
						<div key={index} className={clsx("my-3", styles.formInput)}>
							{item}
						</div>
					))}
					{children}
				</form>
			</div>
		</div>
	);
}
