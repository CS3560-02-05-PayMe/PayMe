import styles from "../../styles/main.module.css";
import headingStyles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import AddressForm from "../Overlay/AddressForm";
import CardForm from "../Overlay/CardForm";

import { Card, Skeleton } from "antd";
import { CreditCardOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";

/**
 * 
 * @param loggedIn 		Whether user is logged in 
 * @param loading 		Whether data is still being loaded
 * @param addresses 	List of user addresses
 * @param account 		User account
 * @param cards 		List of user credit cards
 * @param changeAddress Helper function to change primary address
 * @param changeCard 	Helper function to change primary card
 * 
 */
export default function AccountDetails({ loggedIn, loading, addresses, account: { name, username }, cards, pointsBalance, changeAddress, changeCard }) {
	// helper function to shorten/hide account address
	const abbreviate = (input, prefixLength = 3, suffixLength = 3) => {
		if (input.length <= prefixLength + suffixLength) return input;

		const prefix = input.substring(0, prefixLength);
		const suffix = input.substring(input.length - suffixLength);

		return `${prefix}...${suffix}`;
	};

	const shorten = (input) => {
		if (input.length <= 4) return input;
		return input.slice(input.length - 4);
	};

	const findPrimary = (array) => {
		return array.find((ele) => ele.primary);
	};

	const accountDetails = [
		{
			icon: <UserOutlined className="accountUserIcon p-2" style={{ color: "#06345c", fontSize: "30px" }} />,
			detail: loggedIn ? name : "Please log in to view account",
		},
		{
			icon: <HomeOutlined className="accountAddressIcon p-2" style={{ color: "#06345c", fontSize: "30px" }} />,
			detail: loggedIn ? findPrimary(addresses).street : "Unavailable",
			apply: changeAddress,
		},
		{
			icon: <CreditCardOutlined className="accountCreditCardIcon p-2" style={{ color: "#06345c", fontSize: "30px" }} />,
			detail: loggedIn ? `Ends in ${shorten(findPrimary(cards).cardNumber)}` : "Unavailable",
			apply: changeCard,
		},
	];

	const [forms, setForms] = useState({ addressFormOpen: false, cardFormOpen: false });

	const openForm = (form, event) => {
		event?.stopPropagation();
		setForms((prevForms) => ({ ...prevForms, [form]: true }));
	};

	const closeForm = (form) => {
		setForms((prevForms) => ({ ...prevForms, [form]: false }));
	};

	const openAddressForm = (event) => {
		openForm("addressFormOpen", event);
	};

	const closeAddressForm = () => {
		closeForm("addressFormOpen");
	};

	const openCardForm = (event) => {
		openForm("cardFormOpen", event);
	};

	const closeCardForm = () => {
		closeForm("cardFormOpen");
	};

	return (
		<Card title="Account Details" className={clsx("w-100 mx-2 mx-md-0", styles.containerShadow)} headStyle={{ background: "#A8C1D1" }}>
			<Skeleton title="Account Details" loading={loading} avatar active>
				{accountDetails.map((item, index) => {
					return (
						<div key={index} className={clsx("accountDetailRow d-flex justify-content-start align-items-center", typingStyles.fontType6)}>
							<div className={clsx("d-flex ms-3")}>{item.icon}</div>
							<div className={clsx("d-flex h-100 w-100 flex-column align-items-start")}>
								<span className="accountDetail">{item.detail}</span>
								{index === 0 && <span className={clsx(typingStyles.fontType4, typingStyles.white9)}>@{username}</span>}
							</div>
							{index > 0 && (
								<div className={clsx("d-flex w-100 justify-content-end")}>
									<span className={clsx("py-1 px-3", headingStyles.requestInboxButton, headingStyles.loginButton)} onClick={index === 1 ? openAddressForm : openCardForm}>
										Change
									</span>
								</div>
							)}
						</div>
					);
				})}
				{forms["addressFormOpen"] && <AddressForm addresses={addresses} apply={changeAddress} onRelease={closeAddressForm} />}
				{forms["cardFormOpen"] && <CardForm cards={cards} apply={changeCard} onRelease={closeCardForm} />}
			</Skeleton>
		</Card>
	);
}
