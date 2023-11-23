import { useEffect, useState } from "react";
import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import Form from "./Form";

import clsx from "clsx";
import { DeleteOutlined } from "@ant-design/icons";
import { useAccount } from "../providers/AccountProvider";

/**
 *
 * @param apply 	Calls provided function from parent (pays user request)
 * @param remove 	Removes the request from other user
 * @param onRelease Closes request inbox form
 *
 */
export default function RequestInboxForm({ apply, remove, onRelease }) {
	const { requestInList, requestOutList } = useAccount();

	const [selected, setSelected] = useState(0);
	const [requestList, setRequestList] = useState(requestInList);

	// moderation for checked/unchecked boxes
	const [checkedItems, setCheckedItems] = useState(Array(requestList.length).fill(false));
	const [listState, setListState] = useState("default");

	const handleItemClicked = (index) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = !newCheckedItems[index];
		setCheckedItems(newCheckedItems);
		updateListState(newCheckedItems);
	};

	const handleListClicked = (value) => {
		const newCheckedItems = new Array(requestList.length).fill(value);
		setCheckedItems(newCheckedItems);
		updateListState(newCheckedItems);
	};

	const updateListState = (newCheckedItems) => {
		if (newCheckedItems.every((item) => item)) {
			setListState("listChecked");
		} else if (newCheckedItems.some((item) => item)) {
			setListState("removeChecked");
		} else {
			setListState("default");
		}
	};

	const requestTypes = [
		{ type: "Inbox", icon: styles.requestTypeInbox },
		{ type: "Pending", icon: styles.requestTypeSent },
	];

	const handleTypeSelected = (event, index) => {
		event.preventDefault();
		setSelected(index);
	};

	useEffect(() => {
		setRequestList(selected === 0 ? requestInList : requestOutList);
		setCheckedItems(Array(requestList.length).fill(false));
		setListState("default");
	}, [selected, requestList]);

	return (
		<Form
			formType={"Requests"}
			onSubmit={(event) => {
				event.preventDefault();
			}}
			onRelease={onRelease}
		>
			<div className="d-flex flex-column w-100">
				<div
					className={clsx("d-flex align-items-start p-2 mx-2", styles.listCheckable, {
						[styles.listChecked]: listState === "listChecked",
						[styles.removeChecked]: listState === "removeChecked",
						["d-none"]: requestList.length === 0,
					})}
				>
					<div
						className={clsx(styles.requestListCheckable)}
						onClick={() => {
							handleListClicked(listState === "default");
						}}
					/>
					<DeleteOutlined
						className={clsx("ms-2", styles.ignoreButton, { ["d-inline-block"]: listState !== "default" })}
						style={{ fontSize: "22.5px" }}
						onClick={() => {
							const listIndexRemove = checkedItems.reduce((indices, value, index) => {
								if (value) indices.push(index);
								return indices;
							}, []);

							const updatedRequests = requestList.filter((request, index) => !listIndexRemove.includes(index));

							remove({ selected, updatedList: updatedRequests });
							setCheckedItems(Array(updatedRequests.length).fill(false));
							setListState("default");
						}}
					/>
				</div>
				{listState === "listChecked" && (
					// rgba(241,243,244,0.871);
					<div className={clsx("mx-2", styles.notifChecked)}>
						<span className={clsx(typingStyles.gray)}>
							All <b>{requestList.length}</b> requests selected
						</span>
					</div>
				)}
				<div className={clsx("d-flex position-relative w-100 px-2 align-self-center overflow-hidden")}>
					<div className={clsx("d-flex w-100", styles.inboxType)}>
						{requestTypes.map((item, index) => (
							<div key={index} className={clsx("d-flex position-relative w-100 align-items-center")}>
								<div
									className={clsx("d-flex h-100 align-items-center", styles.inboxTypeName, { [styles.selected]: selected === index })}
									onClick={(event) => {
										handleTypeSelected(event, index);
									}}
								>
									<span className={clsx("mx-2", item.icon)} />
									<span className={clsx(typingStyles.fontType5)}>{item.type}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<ul className={clsx("d-flex flex-column w-100 p-2 pt-0")}>
					{requestList.map((item, index) => (
						<li key={index} className={clsx("p-2", styles.requestInboxItem, { [styles.selectedItem]: checkedItems[index] })}>
							<div className={clsx("d-flex h-100 w-100 align-items-center justify-content-between", typingStyles.fontType5)}>
								<div
									className={clsx("d-flex me-2 align-self-start", styles.requestItemCheckable)}
									role="checkbox"
									checked={checkedItems[index]}
									onClick={() => handleItemClicked(index)}
								/>
								<div className={clsx("d-flex flex-column h-100 align-items-start", styles.requestDetail)} onClick={() => handleItemClicked(index)}>
									<span className={clsx("text-start", styles.requestDetail, typingStyles.fontType6)}>{item.subject}</span>
									<span className={clsx(typingStyles.fontType4, typingStyles.white9)}>@{item.username}</span>
								</div>
								<div className={clsx("d-flex align-items-center")}>
									<span onClick={() => handleItemClicked(index)}>${item.amount}</span>
									{!selected && (
										<span
											className={clsx("ms-2 py-2 px-3", styles.payNowButton)}
											onClick={() => {
												const { amount, message, transactionId } = item;
												console.log(item);
												apply({ recipient: item.username, amount, message, transactionId }).then(() => {
													// remove request
												});
											}}
										>
											Pay
										</span>
									)}
								</div>
							</div>
						</li>
					))}
				</ul>
				{requestList.length == 0 && (
					<div className={clsx("d-flex flex-column w-100 h-100 px-5")}>
						<div className="py-2">
							<img src="/images/emptyInbox.png" className="d-flex w-100" />
						</div>
						<span className={clsx(typingStyles.fontType5)}>Inbox Empty</span>
					</div>
				)}
			</div>
		</Form>
	);
}
