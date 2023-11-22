import anime from "animejs";
import styles from "../../../styles/heading.module.css";
import typingStyles from "../../../styles/typing.module.css";

import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function FormSubmitted({ message, imageSrc, onRelease }) {
	const checkRef = useRef(null);

	useEffect(() => {
		checkRef.current = anime.timeline({ autoplay: true, direction: "normal" });
		checkRef.current
			.add({
				targets: ".checkmark",
				scale: [{ value: [0, 1], duration: 365, easing: "easeOutQuad" }],
			})
			.add({
				targets: ".check",
				strokeDashoffset: {
					value: [anime.setDashoffset, 0],
					duration: 365,
					// delay: 100,
					easing: "easeOutQuart",
				},
			});
	}, []);

	const handleRelease = () => {
		if (checkRef.current) checkRef.current.restart();

		onRelease();
	};

	return (
		<div className={clsx("d-flex flex-column w-100 h-100", styles.formSubmitted)}>
			<div className="d-flex w-100 h-100 justify-content-center">{/* <img src={imageSrc} className={clsx("w-100", styles.fadeIn)} style={{ maxWidth: "250px" }} /> */}</div>
			<div className="d-flex flex-column w-100 mt-2 justify-content-center align-items-center">
				<svg id="checkmark" class={clsx("checkmark d-flex text-center m-auto", styles.formCheckmark)} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32">
					<circle class="circle" cx="16" cy="16" r="16" fill="#00b32d" />
					<path class="check" d="M9 16l5 5 9-9" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
				</svg>
				<div className="my-4">
					<span className={clsx(typingStyles.fontType9)}>{message}</span>
				</div>
				<div className={clsx(styles.loginButton, styles.requestInboxButton)} onClick={handleRelease}>
					<span className={clsx(typingStyles.fontType7)}>Close</span>
				</div>
			</div>
		</div>
	);
}
