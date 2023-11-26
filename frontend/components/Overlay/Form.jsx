import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import FormSubmitted from "./PostOverlay/FormSubmitted";

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
export default function Form({ children, formType, formAltType = undefined, formInputs = [], onSubmit: handleSubmit = () => {}, onRelease: apply, outsideClick = () => {}, formAltSrc }) {
	const formRef = useRef(null);

	const [formTitle, setFormTitle] = useState("");
	const [showFields, setShowFields] = useState(true);

	useEffect(() => {
		//
		const handleFormClick = (event) => {
			if (formRef.current && !formRef.current.contains(event.target)) {
				apply();
				outsideClick();
			}
		};

		document.addEventListener("click", handleFormClick);

		setFormTitle(formType);

		return () => {
			document.removeEventListener("click", handleFormClick);
		};
	}, []);

	return (
		<div className={clsx("position-fixed top-0 start-0", styles.formContainer)}>
			<div className={clsx("d-flex flex-column position-relative top-50 start-50 p-4", styles.formWrapper, typingStyles.fontType5)} ref={formRef}>
				{showFields && (
					<>
						<span className={clsx("w-100 text-center", styles.formHeading, typingStyles.fontTypeHeading1)}>{formTitle}</span>
						<form
							className={clsx("w-100 text-center overflow-hidden", styles.formFields, { [styles.fadeOut]: !showFields })}
							onSubmit={(event) => {
								handleSubmit(event);
								setFormTitle(formAltType);
								if (!!formAltType) setShowFields(false);
							}}
						>
							{formInputs.map((item, index) => (
								<div key={index} className={clsx("my-3", styles.formInput)}>
									{item}
								</div>
							))}
							{children}
						</form>
					</>
				)}
				{!showFields && <FormSubmitted message={formAltType} imageSrc={`/images/${formAltSrc}.png`} onRelease={apply} />}
			</div>
		</div>
	);
}
