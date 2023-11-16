import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import Form from "./Form";

import clsx from "clsx";

export default function RequestInboxForm({ apply, requests, onRelease }) {
	return (
		<Form formType={"Request Inbox"} onRelease={onRelease}>
			{requests.length == 0 && (
				<div className={clsx("d-flex flex-column w-100 h-100 px-5")}>
					<div className="py-2">
						<img src="/images/emptyInbox.png" className="d-flex w-100" />
					</div>
					<span className={clsx(typingStyles.fontType5)}>Inbox Empty</span>
				</div>
			)}
			{requests.length > 0 && (
				<ul className={clsx("d-flex flex-column w-100 p-2")}>
					{requests.map((item, index) => (
						<li key={index} className={clsx("py-2", styles.requestInboxItem)}>
							<div className={clsx("d-flex w-100 align-items-center justify-content-between", typingStyles.fontType5)}>
								<span className={clsx("d-flex")}>{item.name}</span>
								<div className={clsx("d-flex align-items-center")}>
									${item.amount}
									<span
										className={clsx("py-2 px-3", styles.payNowButton)}
										onClick={() => {
											apply(item);
										}}
									>
										Pay
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</Form>
	);
}
