import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function RequestInboxForm({ apply, requests, onRelease }) {
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(debtor, amount);
	};

	return (
		<Form formType={"Request Inbox"} onRelease={onRelease}>
			{requests.length && (
				<ul className={clsx("d-flex flex-column w-100 p-0 py-2")}>
					{requests.map((item, index) => (
						<li key={index} className={clsx("py-2")}>
							<div className={clsx("d-flex w-100 justify-content-between", typingStyles.fontType5)}>
								<span>{item.name}</span>
								<span className={clsx("", styles.payNowButton)}>{item.amount}</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</Form>
	);
}
