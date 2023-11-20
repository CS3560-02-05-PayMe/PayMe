import styles from "../../styles/main.module.css";

import { useWindowSize } from "../providers/WindowSizeProvider";

import { Card, Table } from "antd";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

// table columns shown on different viewport devices
const smColumns = [
	{
		title: "Payment Subject",
		dataIndex: "subject",
		key: "subject",
	},
	{
		title: "Message",
		dataIndex: "message",
		key: "message",
	},
	{
		title: "Amount",
		key: "amount",
		render: (_, record) => (
			<div style={record.type === "Send" ? { color: "red" } : { color: "green" }}>
				{record.type === "Send" ? "-" : "+"}
				{record.amount}
			</div>
		),
	},
];

const lgColumns = [
	{
		title: "Payment Subject",
		dataIndex: "subject",
		key: "subject",
	},
	{
		title: "Type",
		dataIndex: "type",
		key: "type",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},

	{
		title: "Message",
		dataIndex: "message",
		key: "message",
	},
	{
		title: "Amount",
		key: "amount",
		render: (_, record) => (
			<div style={record.type === "Send" ? { color: "red" } : { color: "green" }}>
				{record.type === "Send" ? "-" : "+"}
				{record.amount}
			</div>
		),
	},
];


export default function RecentActivity({ loggedIn, loading, history = [] }) {
	const { width, height } = useWindowSize();
	// 55px per row in table
	const [pageSize, setPageSize] = useState(Math.floor(height / 55));

	const tableContainerRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			// helper function to set page size
			if (tableContainerRef.current) {
				// 55px 			 table row size
				// --
				// 56px 			 card title
				// 103px =
				// + 48px = 24px * 2 card body padding-y
				// + 55px 			 table column title row
				// 32px 			 table pagination size
				setPageSize(Math.floor((tableContainerRef.current.clientHeight - 56 - 103 - 32) / 55) || 0);
				console.log(pageSize);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Card
			title="Recent Activity"
			className={clsx("h-100 w-100 mx-2 mx-md-0", styles.containerShadow)}
			headStyle={{ background: "#A8C1D1" }}
			bodyStyle={{ height: "calc(100% - 56px)" }}
			ref={tableContainerRef}
		>
			<div className="d-flex w-100 h-100">
				{history && (
					<Table
						className={clsx("d-block align-items-center justify-content-center", styles.historyTable)}
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
