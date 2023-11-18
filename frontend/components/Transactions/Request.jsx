import styles from "../../styles/main.module.css";
import typingStyles from "../../styles/typing.module.css";

import RequestForm from "../Overlay/RequestForm";

import { SwapOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";

/**
 * 
 * @param apply Function passed from parent to child > child
 * 
 */
export default function Request({ apply }) {
	const [requestFormOpen, setRequestFormOpen] = useState(false);

	const openRequestForm = (event) => {
		event.stopPropagation();
		setRequestFormOpen(true);
	};

	const closeRequestForm = () => {
		setRequestFormOpen(false);
	};

	return (
		<>
			<div className={clsx("requestContainer py-2 py-md-4 px-3 px-md-0", styles.requestContainer)} onClick={openRequestForm}>
				<div className="d-flex h-50 w-100 justify-content-center align-self-center">
					<SwapOutlined className={clsx("d-flex justify-content-center align-self-center", typingStyles.fontType7)} style={{ color: "white" }} />
				</div>
				<div className={clsx("d-flex h-50 w-100 justify-content-center")}>
					<span className={clsx("h-100 align-self-center", typingStyles.fontType7)}>Request</span>
				</div>
			</div>
			{requestFormOpen && <RequestForm apply={apply} onRelease={closeRequestForm} />}
		</>
	);
}
