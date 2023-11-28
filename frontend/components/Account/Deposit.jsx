import styles from "../../styles/main.module.css";
import headingStyles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import DepositForm from "../Overlay/DepositForm";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param loggedIn 		Whether user is logged in
 * @param apply         Apply Deposit to balance
 * @param dollarBalance Current user account balance
 *
 */
export default function Deposit({ loggedIn, apply }) {
	const [DepositOpen, setDepositOpen] = useState(false);

	const openDeposit = (event) => {
		event.stopPropagation();
		setDepositOpen(true);
	};

	const closeDeposit = () => {
		setDepositOpen(false);
	};

	return (
		<>
			<div className={clsx("ms-2", styles.inboxContainer)}>
				<div className={clsx("d-flex py-2 mx-auto align-items-center justify-content-center", headingStyles.requestInboxButton, headingStyles.loginButton)} onClick={openDeposit}>
					<span className={clsx(typingStyles.fontType6)}>Deposit</span>
				</div>
			</div>
			{DepositOpen && <DepositForm apply={apply} onRelease={closeDeposit} />}
		</>
	);
}
