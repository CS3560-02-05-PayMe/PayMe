import { useEffect, useState } from "react";
import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";

import Form from "./Form";

import clsx from "clsx";
import { DeleteOutlined } from "@ant-design/icons";

/**
 *
 * @param apply 	Pays the request from other user
 * @param remove 	Removes the request from other user
 * @param requests 	All request data for current user
 * @param onRelease Closes form on click outside of form
 *
 */
export default function RequestInboxForm({ apply, remove, requests, onRelease }) {
	const [checkedItems, setCheckedItems] = useState(Array(requests.length).fill(false));
	const [listState, setListState] = useState("default");

	const handleItemClicked = (index) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = !newCheckedItems[index];
		setCheckedItems(newCheckedItems);
		updateListState(newCheckedItems);
	};

	const handleListClicked = (value) => {
		const newCheckedItems = new Array(requests.length).fill(value);
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

	return (
		<Form formType={"Request Inbox"} onRelease={onRelease}>
			{requests.length == 0 && (
				<div className={clsx("d-flex flex-column w-100 h-100 px-5")}>
					<div className="py-2">
						<img src="/images/emptyInbox.png" className="d-flex w-100" />
					</div>
					<span className={clsx(typingStyles.fontType5)}>Inbox Empty</span>
				</div>
			)}
			{requests.length > 0 && (
				<div className="d-flex flex-column w-100">
					<div className={clsx("d-flex align-items-start py-2 mx-2", styles.listCheckable, { [styles.listChecked]: listState === "listChecked", [styles.removeChecked]: listState === "removeChecked" })}>
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

								const updatedRequests = requests.filter((request, index) => !listIndexRemove.includes(index));

								remove({ updatedList: updatedRequests });
								setCheckedItems(Array(updatedRequests.length).fill(false));
								setListState("default");
							}}
						/>
					</div>
					{listState === "listChecked" && (
						// rgba(241,243,244,0.871);
						<div className={clsx("mx-2", styles.notifChecked)}>
							<span className={clsx(typingStyles.gray)}>
								All <b>{requests.length}</b> requests selected
							</span>
						</div>
					)}
					<ul className={clsx("d-flex flex-column w-100 p-2 pt-0")}>
						{requests.map((item, index) => (
							<li key={index} className={clsx("py-2", styles.requestInboxItem, { [styles.selectedItem]: checkedItems[index] })}>
								<div className={clsx("d-flex h-100 w-100 align-items-center justify-content-between", typingStyles.fontType5)}>
									<div
										className={clsx("d-flex me-2 align-self-start", styles.requestItemCheckable)}
										role="checkbox"
										checked={checkedItems[index]}
										onClick={() => handleItemClicked(index)}
									/>
									<div className={clsx("d-flex flex-column h-100 w-100 align-items-start")} onClick={() => handleItemClicked(index)}>
										<span className={clsx(typingStyles.fontType6)}>{item.name}</span>
										<span className={clsx(typingStyles.fontType4, typingStyles.white9)}>@{item.username}</span>
									</div>
									<div className={clsx("d-flex align-items-center")}>
										<span onClick={() => handleItemClicked(index)}>${item.amount}</span>
										<span
											className={clsx("ms-2 py-2 px-3", styles.payNowButton)}
											onClick={() => {
												apply(item);
											}}
										>
											Pay
										</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</Form>
	);
}
