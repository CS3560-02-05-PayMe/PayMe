import styles from "../../styles/heading.module.css";
import typingStyles from "../../styles/typing.module.css";
import { useAccount } from "../providers/AccountProvider";

import { doubleify, fetchPM, formatUsername, fullName, postPM, toFloat } from "../util/helpers";
import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @param apply 	Handles pay submission
 * @param onRelease Closes pay form
 *
 */
export default function PayForm({ apply, onRelease }) {
	const { account, friendList, updateFriendList } = useAccount();

	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState("None provided.");

	const [step, setStep] = useState(1);

	const [friendSelected, setFriendSelected] = useState(-1);
	const [newFriend, setNewFriend] = useState(false);

	const firstFormInput = [
		<input
			type="text"
			placeholder="Recipient"
			required
			value={recipient}
			onChange={(event) => {
				const formattedRecipient = formatUsername(event.target.value);
				event.target.value = formattedRecipient;
				setFriendSelected(friendList.findIndex((friend) => friend.username === event.target.value.replace("@", "")));
				setRecipient(formattedRecipient);
			}}
		/>,
	];

	const secondFormInput = [
		<input
			type="text"
			placeholder="Amount"
			required
			onChange={(event) => {
				const formattedNumber = doubleify(event.target.value);
				event.target.value = formattedNumber;
				setAmount(toFloat(formattedNumber));
			}}
		/>,
		<input
			type="text"
			placeholder="Message"
			required
			onChange={(event) => {
				setMessage(event.target.value);
			}}
		/>,
	];

	const toggleStep = (event) => {
		event.preventDefault();
		setStep((step === 1) + 1);

		if (friendSelected === -1 && recipient !== "") setNewFriend(true);
	};

	// update user balance and transaction history
	const handleSubmit = async (event) => {
		event.preventDefault();

		apply({ recipient, amount, message });
	};

	const handleNewFriend = async (event) => {
		event.stopPropagation();
		setNewFriend(false);

		const friendPromise = fetchPM("/getAccount", recipient.replace("@", ""));

		friendPromise.then(async (friendAccount) => {
			const friendPromise = postPM("/addFriend", {}, account.accountID, friendAccount.accountID);
			const friendAccountPromise = friendPromise.then(friendObject => fetchPM("/getAccountByUuid", friendObject.friend2ID));

			return Promise.all([friendPromise, friendAccountPromise]).then(async ([friend, friendAccount]) => {
				const { firstName, lastName, username } = friendAccount;
				updateFriendList([{ firstName, lastName, username }, ...friendList]);
			});
		});
	};

	return (
		<Form formType={"Pay"} formAltType={"Payment Sent"} onSubmit={handleSubmit} onRelease={onRelease} noTitle={!newFriend}>
			<fieldset className={clsx("w-100", { [styles.hide]: step > 1 })}>
				{firstFormInput.map((item, index) => (
					<div key={index} className={clsx("my-3", styles.formInput)}>
						{item}
					</div>
				))}
				<div className={clsx("d-flex flex-column w-100 my-2")}>
					<div className={clsx("d-flex h-100", styles.friendTab)}>
						<div className={clsx("d-flex", styles.friendTabName)}>
							<span className={clsx("mx-2", styles.payFriends)} />
							<span className={clsx(typingStyles.fontType7)}>Friends</span>
						</div>
					</div>
					<div className={clsx("d-flex flex-column w-100", styles.friendList)}>
						{friendList.map((item, index) => (
							<div
								key={index}
								className={clsx("d-flex w-100 px-2", styles.friend, { [styles.selected]: friendSelected === index })}
								onClick={(event) => {
									event.preventDefault();
									setNewFriend(false);
									setFriendSelected(index);
									setRecipient(`@${item.username}`);
								}}
							>
								<div className={clsx("d-flex flex-column w-100 my-2 align-items-start")}>
									<span className={clsx(typingStyles.fontType8)}>{fullName(item)}</span>
									<span className={clsx(typingStyles.fontType4, typingStyles.white9)}>@{item.username}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={toggleStep}>
					Next
				</button>
			</fieldset>
			<fieldset className={clsx("w-100", { [styles.show]: step === 2 && !newFriend })}>
				{secondFormInput.map((item, index) => (
					<div key={index} className={clsx("my-3", styles.formInput)}>
						{item}
					</div>
				))}
				<div className={clsx("d-flex w-100 justify-content-between")}>
					<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={toggleStep}>
						Previous
					</button>
					<button type="submit" className={clsx(styles.formSubmit, styles.loginButton)}>
						Send
					</button>
				</div>
			</fieldset>
			{step === 2 && newFriend && (
				<div className="d-flex position-relative flex-column w-100 overflow-hidden">
					<div className="d-flex flex-column">
						<span className={clsx("mx-2", styles.newFriend)} />
						<span className={clsx(typingStyles.fontType5)}>Add new friend?</span>
						<span className={clsx(typingStyles.fontType5)}>{recipient}</span>
					</div>
					<div className={clsx("d-flex w-100 justify-content-between")}>
						<button
							className={clsx(styles.formSubmit, styles.loginButton)}
							onClick={(event) => {
								event.stopPropagation();
								setFriendSelected(-1);
								setNewFriend(false);
							}}
						>
							No
						</button>
						<button className={clsx(styles.formSubmit, styles.loginButton)} onClick={handleNewFriend}>
							Yes
						</button>
					</div>
				</div>
			)}
		</Form>
	);
}
