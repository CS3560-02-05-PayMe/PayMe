import styles from "../../styles/main.module.css";
import typingStyles from "../../styles/typing.module.css";

import { useWindowSize } from "../providers/WindowSizeProvider";

import { Card, Table } from "antd";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "../providers/AccountProvider";
import { fullName, isRecipient } from "../util/helpers";

export default function RecentActivity({ loggedIn, loading, history = [] }) {
	const { account } = useAccount();
	const { width, height } = useWindowSize();
	// 55px per row in table
	const [pageSize, setPageSize] = useState(Math.floor(height / 55));

	const tableContainerRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			// helper function to set page size
			if (tableContainerRef.current) {
				// 77px 			 table row size
				// --
				// 56px 			 card title
				// 103px =
				// + 48px = 24px * 2 card body padding-y
				// + 55px 			 table column title row
				// 32px 			 table pagination size
				setPageSize(Math.floor((tableContainerRef.current.clientHeight - 56 - 103 - 32) / 77) || 0);
				console.log(pageSize);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// table columns shown on different viewport devices
	const smColumns = [
		{
			title: "Payment Subject",
			key: "subject",
			render: (_, record) => (
				<div className="d-flex flex-column">
					<span>{record.subject}</span>
					<span className={clsx(typingStyles.gray)}>@{record.username}</span>
				</div>
			),
		},
		{
			title: "Message",
			dataIndex: "message",
			key: "message",
		},
		{
			title: "Amount",
			key: "transactionAmount",
			render: (_, record) => (
				<div style={isRecipient(record, account) ? { color: "green" } : { color: "red" }}>
					{isRecipient(record, account) ? "+" : "-"}
					{record.amount}
				</div>
			),
		},
	];

	const lgColumns = [
		{
			title: "Payment Subject",
			key: "subject",
			render: (_, record) => (
				<div className="d-flex flex-column">
					<span>{record.subject}</span>
					<span className={clsx(typingStyles.gray)}>@{record.username}</span>
				</div>
			),
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
		},
		{
			title: "Message",
			dataIndex: "message",
			key: "message",
		},
		{
			title: "Amount",
			key: "transactionAmount",
			render: (_, record) => (
				<div style={record.type === "Receive" ? { color: "green" } : { color: "red" }}>
					{record.type === "Receive" ? "+" : "-"}
					{record.amount}
				</div>
			),
		},
	];

	return (
		<Card
			title="Recent Activity"
			className={clsx("h-100 w-100 mx-2 mx-md-0", styles.containerShadow)}
			headStyle={{ background: "#A8C1D1" }}
			bodyStyle={{ height: "calc(100% - 56px)" }}
			ref={tableContainerRef}
		>
			<div className="d-flex w-100 h-100">
				{!loading && (
					<Table
						className={clsx("d-block", styles.historyTable)}
						dataSource={loggedIn ? history : []}
						columns={width >= 768 ? lgColumns : smColumns}
						pagination={{ position: ["bottomCenter"], pageSize }}
						loading={loading}
					/>
				)}
			</div>
		</Card>
	);
}
