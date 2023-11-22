import styles from "../../styles/main.module.css";
import typingStyles from "../../styles/typing.module.css";

import PayForm from "../Overlay/PayForm";

import { DollarOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";

export default function Pay({ handlePay }) {
	const [payFormOpen, setPayFormOpen] = useState(false);

	const openPayForm = (event) => {
		event.stopPropagation();
		setPayFormOpen(true);
	};

	const closePayForm = () => {
		setPayFormOpen(false);
	};

	return (
		<>
			<div className={clsx("payContainer py-2 py-md-4 px-3 px-md-0", styles.payContainer)} onClick={openPayForm}>
				<div className="d-flex h-50 w-100 justify-content-center align-self-center">
					<DollarOutlined className={clsx("d-flex justify-content-center align-self-center", typingStyles.fontType7)} style={{ color: "white" }} />
				</div>
				<div className={clsx("d-flex h-50 w-100 justify-content-center")}>
					<span className={clsx("h-100 align-self-center", typingStyles.fontType7)}>Pay</span>
				</div>
			</div>
			{payFormOpen && <PayForm apply={handlePay} onRelease={closePayForm} />}
		</>
	);
}
