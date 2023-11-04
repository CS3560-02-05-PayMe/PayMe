import typingStyles from "../styles/typing.module.css";

import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function AccountDetails({ address, name, pointsBalance }) {

    // helper function to shorten/hide account address
    const abbreviate = (input, prefixLength = 3, suffixLength = 3) => {
        if (input.length <= prefixLength + suffixLength) return input;

        const prefix = input.substring(0, prefixLength);
        const suffix = input.substring(input.length - suffixLength);

        return `${prefix}...${suffix}`;
    }

	return (
		<Card title="Account Title" className="w-100">
			<div className="accountDetailRow d-flex justify-content-center align-items-center">
                <UserOutlined className="p-2" style={{color: "blue", fontSize: "25px"}} />
                <div className={`d-flex flex-wrap w-100 ms-3 ${typingStyles.fontType6}`}>
                    <span className="accountDetailName w-100">{name}</span>
                    <span className={`accountDetailAddress ${typingStyles.fontType2}`}>Address: {abbreviate(address)}</span>
                </div>
            </div>
		</Card>
	);
}
