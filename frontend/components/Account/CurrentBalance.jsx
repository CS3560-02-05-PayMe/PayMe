import styles from "../../styles/main.module.css";
import headingStyles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import AuthForm from "../Overlay/AuthForm";
import RequestInbox from "./RequestInbox";
import Deposit from "./Deposit"

import { Card } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { useAccount } from "../providers/AccountProvider";

/**
 *
 * @param loggedIn 				Whether user is logged in
 * @param handleRequest 		Pays the request from other user
 * @param handleRequestRemove 	Removes the request from other user
 * @param loading 				Whether data is still being loaded
 * @param handleDeposit         Adds money from deposit to balance
 *
 */
export default function CurrentBalance({ loggedIn, handleRequest, handleRequestRemove, loading, handleDeposit }) {
	const { account } = useAccount();

	return (
		<Card title="Current Balance" className={clsx("w-100 mx-2 mx-md-0 mt-2 mt-md-0 mb-3 mb-lg-0", styles.containerShadow)} loading={loading} headStyle={{ background: "#A8C1D1" }}>
			<div className="currentBalanceRow d-flex flex-column">
				{loggedIn && (
					<>
						<span className={clsx("currentBalance text-center", typingStyles.fontTypeHeading1)}>${account?.balance}</span>
						<RequestInbox loggedIn={loggedIn} apply={handleRequest} remove={handleRequestRemove} />
                        <Deposit loggedIn={loggedIn} apply={handleDeposit} />
					</>
				)}
				{!loggedIn && (
					<div className={clsx("d-flex justify-content-center", headingStyles.loginContainer, styles.balanceLogin)}>
						{/* replaces string message with button */}
						{/* <a
							className={clsx("d-inline-block", headingStyles.loginButton, typingStyles.defaultColor)}
							onClick={(event) => {
								event.stopPropagation();
								setLoginFormOpen(true);
							}}
						>
							<span className={clsx(typingStyles.fontType7)}>Login</span>
						</a> */}
						<span className={clsx(typingStyles.fontType7)}>Please log in to see balance</span>
					</div>
				)}
			</div>
		</Card>
	);
}
