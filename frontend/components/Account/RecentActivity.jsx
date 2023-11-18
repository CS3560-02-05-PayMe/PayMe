import styles from "../../styles/main.module.css";

import { useWindowSize } from "../providers/WindowSizeProvider";

import { Card, Table } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";

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

// viewheight breakpoints for table page size
const pageBreakpoints = {
	768: 6,
	1024: 10,
	1440: 16,
};

export default function RecentActivity({ loading, history = [] }) {
	const { width, height } = useWindowSize();
	const [pageBreakpoint, setPageBreakpoint] = useState(0);
	
	useEffect(() => {
		// helper function to set page size
		setPageBreakpoint(
			Object.keys(pageBreakpoints)
				.map(Number)
				.sort((a, b) => a - b)
				.find((breakpoint) => height <= breakpoint)
		);
	}, [width]);

	return (
		<Card
			title="Recent Activity"
			className={clsx("h-100 w-100 mx-2 mx-md-0", styles.containerShadow)}
			headStyle={{ background: "#A8C1D1" }}
			bodyStyle={{ height: "calc(100% - 56px)" }}
		>
			{history && (
				<Table
					className="d-flex d-md-block h-100 align-items-center justify-content-center"
					dataSource={history}
					columns={width >= 768 ? lgColumns : smColumns}
					pagination={{ position: ["bottomCenter"], pageSize: pageBreakpoints[pageBreakpoint] }}
					loading={loading}
				/>
			)}
		</Card>
	);
}
