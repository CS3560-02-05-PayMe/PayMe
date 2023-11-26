import styles from "../../styles/main.module.css";
import headingStyles from "../../styles/heading.module.css";

import RequestInboxForm from "../Overlay/RequestInboxForm";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAccount } from "../providers/AccountProvider";

/**
 *
 * @param loggedIn 		Whether user is logged in
 * @param apply 		Pays the request from other user
 * @param remove 		Removes the request from other user
 * @param dollarBalance Current user account balance
 *
 */
export default function RequestInbox({ loggedIn, apply, remove }) {
	const { requestInList } = useAccount();

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
			<div className={clsx("me-2", styles.inboxContainer)}>
				<div className={clsx("d-flex mx-auto align-items-center justify-content-center", headingStyles.requestInboxButton, headingStyles.loginButton)} onClick={openRequestInbox}>
					Requests{loggedIn && requestInList.length > 0 && <span className={clsx("ms-2 px-2 py-0", styles.inboxSizeWrapper)}>{requestInList.length}</span>}
				</div>
			</div>
			{requestInboxOpen && <RequestInboxForm apply={apply} remove={remove} onRelease={closeRequestInbox} />}
		</>
	);
}
