import styles from "../styles/main.module.css";
import typingStyles from "../styles/typing.module.css";

import { Card } from "antd";

export default function CurrentBalance({ dollarBalance }) {
	return (
		<Card title="Current Balance" className="w-100">
			<div className="currentBalanceRow d-flex justify-content-center">
				<span className={typingStyles.fontTypeHeading1}>${dollarBalance}</span>
			</div>
		</Card>
	);
}
