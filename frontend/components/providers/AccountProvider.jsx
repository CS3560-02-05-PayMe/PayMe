import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const useAccount = () => {
	return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(false);

	const [account, setAccount] = useState(null);
	const [addressList, setAddressList] = useState([]);
	const [cardList, setCardList] = useState([]);
	const [historyList, setHistoryList] = useState([]);
	const [requestInList, setRequestInList] = useState([]);
	const [requestOutList, setRequestOutList] = useState([]);

	const updateLoggedIn = (status) => {
		setLoggedIn(status);
	};

	const updateAccount = (data) => {
		setAccount(data);
		setLoggedIn(data !== null);
	};

	const updateAddressList = (list) => {
		setAddressList(list);
	};

	const updateCardList = (list) => {
		setCardList(list);
	};

	const updateHistoryList = (list) => {
		setHistoryList(list);
	};

	const updateRequestInList = (list) => {
		setRequestInList(list);
	};

	const updateRequestOutList = (list) => {
		setRequestOutList(list);
	};

	return (
		<AccountContext.Provider
			value={{
				loggedIn,
				updateLoggedIn,
				account,
				updateAccount,
				addressList,
				updateAddressList,
				cardList,
				updateCardList,
				historyList,
				updateHistoryList,
				requestInList,
				updateRequestInList,
				requestOutList,
				updateRequestOutList,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
};
