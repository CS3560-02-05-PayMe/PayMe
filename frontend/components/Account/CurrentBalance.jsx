import styles from "../../styles/main.module.css";
import typingStyles from "../../styles/typing.module.css";

import { Card } from "antd";
import clsx from "clsx";
import RequestInbox from "./RequestInbox";

export default function CurrentBalance({ handleRequest, loading, dollarBalance, requests }) {
	return (
		<Card title="Current Balance" className={clsx("w-100 mx-2 mx-md-0 mt-2 mt-md-0 mb-3 mb-lg-0", styles.containerShadow)} loading={loading} headStyle={{background:"#A8C1D1"}}>
			<div className="currentBalanceRow d-flex flex-column">
				<span className={clsx("currentBalance text-center", typingStyles.fontTypeHeading1)}>${dollarBalance}</span>
				<RequestInbox apply={handleRequest} dollarBalance={dollarBalance} requests={requests} />
			</div>
		</Card>
	);
}
