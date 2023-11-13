import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function Form({ children, formType, formInputs = [], onSubmit: handleSubmit = null, onRelease: apply }) {
	const formRef = useRef(null);

	useEffect(() => {
		const handleFormClick = (event) => {
			if (formRef.current && !formRef.current.contains(event.target)) {
				apply();
			}
		};

		document.addEventListener("click", handleFormClick);

		return () => {
			document.removeEventListener("click", handleFormClick);
		};
	}, []);

	return (
		<div className={clsx("position-absolute top-0 start-0", styles.loginFormContainer)}>
			<div className={clsx("d-flex flex-column position-relative top-50 start-50 p-4", styles.loginForm, typingStyles.fontType5)} ref={formRef}>
				<span className={clsx("w-100 text-center", typingStyles.fontTypeHeading1)}>{formType}</span>
				<form className="w-100 text-center" onSubmit={handleSubmit}>
					{formInputs.map((item, index) => {
						return <div key={index} className={clsx("my-3", styles.formInput)}>{item}</div>;
					})}
					{children}
				</form>
			</div>
		</div>
	);
}
