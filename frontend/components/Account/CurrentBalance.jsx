import styles from "../../styles/main.module.css";
import typingStyles from "../../styles/typing.module.css";

import { Card } from "antd";
import clsx from "clsx";
import RequestInbox from "./RequestInbox";

/**
 * 
 * @param loggedIn 				Whether user is logged in 
 * @param handleRequest 		Pays the request from other user
 * @param handleRequestRemove 	Removes the request from other user
 * @param loading 				Whether data is still being loaded
 * @param dollarBalance 		Current user account balance
 * @param requests 				All request data for current user
 * 
 */
export default function CurrentBalance({ loggedIn, handleRequest, handleRequestRemove, loading, dollarBalance, requests }) {
	return (
		<Card title="Current Balance" className={clsx("w-100 mx-2 mx-md-0 mt-2 mt-md-0 mb-3 mb-lg-0", styles.containerShadow)} loading={loading} headStyle={{background:"#A8C1D1"}}>
			<div className="currentBalanceRow d-flex flex-column">
				<span className={clsx("currentBalance text-center", typingStyles.fontTypeHeading1)}>${dollarBalance}</span>
				<RequestInbox loggedIn={loggedIn} apply={handleRequest} remove={handleRequestRemove} dollarBalance={dollarBalance} requests={requests} />
			</div>
		</Card>
	);
}
