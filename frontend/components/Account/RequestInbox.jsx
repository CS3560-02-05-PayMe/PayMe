import styles from "../../styles/main.module.css";
import headingStyles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import RequestInboxForm from "../Overlay/RequestInboxForm";

import clsx from "clsx";
import { useEffect, useState } from "react";

export default function RequestInbox({ apply, dollarBalance, requests }) {
	const [requestInboxOpen, setRequestInboxOpen] = useState(false);

	const openRequestInbox = (event) => {
		event.stopPropagation();
		setRequestInboxOpen(true);
	};

	const closeRequestInbox = () => {
		setRequestInboxOpen(false);
	};

    // not needed(?)
	useEffect(() => {
		// retrieve requests from other users
	}, []);

	return (
		<>
			<div className={clsx("w-100", styles.inboxContainer)}>
				<div className={clsx("d-flex mt-2 mx-auto align-items-center justify-content-center", headingStyles.requestInboxButton, headingStyles.loginButton)} onClick={openRequestInbox}>
					Request Inbox{requests.length && <span className={clsx("ms-2 px-2 py-1", styles.inboxSizeWrapper)}>{requests.length}</span>}
				</div>
			</div>
			{requestInboxOpen && <RequestInboxForm apply={apply} dollarBalance={dollarBalance} requests={requests} onRelease={closeRequestInbox} />}
		</>
	);
}
