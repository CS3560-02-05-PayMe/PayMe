import styles from "../../styles/main.module.css";
import typingStyles from "../../styles/typing.module.css";

import { Card, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";

export default function AccountDetails({ loading, address, name, pointsBalance }) {
	// helper function to shorten/hide account address
	const abbreviate = (input, prefixLength = 3, suffixLength = 3) => {
		if (input.length <= prefixLength + suffixLength) return input;

		const prefix = input.substring(0, prefixLength);
		const suffix = input.substring(input.length - suffixLength);

		return `${prefix}...${suffix}`;
	};

	return (
		<Card title="Account Details" className={clsx("w-100 mx-2 mx-md-0", styles.containerShadow)} headStyle={{background:"#A8C1D1"}}>
			<Skeleton title="Account Details" loading={loading} avatar active>
				<div className="accountDetailRow d-flex justify-content-center align-items-center">
					<UserOutlined className="accountUserIcon p-2" style={{ color: "blue", fontSize: "25px" }} />
					<div className={clsx("d-flex flex-wrap w-100 ms-3", typingStyles.fontType6)}>
						<span className="accountDetailName w-100">{name}</span>
						<span className={clsx("accountDetailAddress", typingStyles.fontType2)}>Address: {abbreviate(address)}</span>
					</div>
				</div>
			</Skeleton>
		</Card>
	);
}
